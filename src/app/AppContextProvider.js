import React, { createContext, useReducer, useEffect } from "react";
import { AsyncStorage } from 'react-native';
import { createApolloFetch } from 'apollo-fetch';
import packageJson from '../../package.json';
import { BACKEND_URL } from 'react-native-dotenv'

import { useDeviceInfo } from "msa-mobile/src/pages/Login/deviceInfo"

const TOKEN_LOCAL_STORE = `${packageJson.name}-token`;

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
	const { tokenDevice } = useDeviceInfo();

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        student: null,
                    };
                case 'SET_STUDENT':
                    return {
                        ...prevState,
                        student: action.student,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
                case 'SET_MESSAGES':
                    return {
                        ...prevState,
                        messages: action.messages,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            student: null,
            messages: null,
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // TODO change to use Apollo and import { STUDENT_BY_TOKEN } from '../api/student'
                const fetch = createApolloFetch({
                    uri: `${BACKEND_URL}/graphql`,
                });

                userToken = await AsyncStorage.getItem(TOKEN_LOCAL_STORE);

                const resp = await fetch({
                    query: `query studentByToken($token: String!, $tokenDevice: String!) {
                        studentByToken(token: $token, tokenDevice: $tokenDevice){
                          id
                          fullName
                          email
                        }
                      }`,
                    variables: { token: userToken, tokenDevice: tokenDevice },
                })

                if (resp.errors) throw Error(resp.errors[0].message)

                const { studentByToken } = resp.data
                dispatch({ type: 'SET_STUDENT', student: studentByToken });
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });

            } catch (e) {
                // Restoring token failed
                dispatch({ type: 'RESTORE_TOKEN', token: null });
            }
        };

        bootstrapAsync();
    }, []);


    const authContext = React.useMemo(
        () => ({
            signOut: () => {
                async function removeStorage() {
                    await AsyncStorage.removeItem(TOKEN_LOCAL_STORE)
                }
                removeStorage();

                dispatch({ type: 'SIGN_OUT' })
            },

            signIn: async data => {
                const student = data.student
                student.token = data.token
                async function saveStorage(value) {
                    await AsyncStorage.setItem(TOKEN_LOCAL_STORE, value)
                }
                saveStorage(student.token);

                dispatch({ type: 'SET_STUDENT', student: student });
                dispatch({ type: 'SIGN_IN', token: student.token });
            },

            setMessages: messages => {
                dispatch({ type: 'SET_MESSAGES', messages });
            }
        }),
        []
    );

    return (
        <AppContext.Provider value={{ state, authContext, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
