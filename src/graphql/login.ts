import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Register(
    $username: String!
    $password: String!
    $retypedPassword: String!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    register(
      input: {
        username: $username
        password: $password
        retypedPassword: $retypedPassword
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      id
      username
      email
      firstName
      lastName
    }
  }
`;
