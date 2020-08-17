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
    mutation logoutStudent($studentId : ID!) {
        logoutStudent (studentId: $studentId)
    }
`

export const STUDENT_BY_TOKEN = gql`
    query studentByToken($token: String!, $tokenDevice: String!) {
        studentByToken(token: $token, tokenDevice: $tokenDevice){
            id
            fullName
            email
        }
    }
`