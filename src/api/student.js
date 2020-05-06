import gql from 'graphql-tag'

export const GET_ALL = gql`
  query students($filter: StudentInput) {
    students(filter: $filter) {
      id
      firstName
      lastName
      fullName
      email
      active
      createdAt
      updatedAt
    }
  }
`;

export const GET_STUDENT = gql`
  query student($filter: StudentInput) {
    student(filter: $filter) {
      id
      firstName
      lastName
      fullName
      email
      active
      createdAt
      updatedAt
      enrollments{
        id
        course{
            name
        }
      }
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation createStudent($student: StudentInput!) {
    createStudent(student: $student){
      id
      firstName
      lastName
      email
      active
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation updateStudent($student: StudentInput!) {
    updateStudent(student: $student)
  }
`;

export const DELETE_STUDENT = gql`
  mutation deleteStudent($ids: [Int!]!) {
    deleteStudent(ids: $ids)
  }
`;