import {gql} from "apollo-boost";

export const LOG_IN = gql`
    mutation requestSecret($email: String!){
        requestSecret(email: $email)
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAcount(
        $username: String!
        $email: String!
        $firstName: String
        $lastName: String
    ){
        createAcount(
            username: $username
            email: $email
            firstName: $firstName
            lastName: $lastName
        )
    }
`;