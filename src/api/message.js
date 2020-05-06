import gql from 'graphql-tag'

export const GET_MESSAGES_BY_STUDENTS = gql`
  query messagesSentByStudent($student : StudentInput!) {
    messagesSentByStudent(student: $student){
        id
        title
        body
        read
        student{
            firstName
        }
    }
  }
`;
