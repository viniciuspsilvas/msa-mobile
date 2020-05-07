import gql from 'graphql-tag'

export const LOGIN_STUDENT = gql`
    mutation( $loginInput:  LoginInput!){
        loginStudent (loginInput: $loginInput){
            token
            student{
                id
                email
                fullName
                firstName
                lastName
                active
            }
        }
    }
`

export const LOGOUT_STUDENT = gql`
    mutation logoutStudent($id : ID!) {
        logoutStudent (id: $id)
    }
`