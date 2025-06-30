// put your GraphQL requests here (in one file or different ones)

import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
            code
            name
            emoji
            continent {
                name
            }
        }
    }
`;

export const GET_COUNTRY = gql`
    query GetCountry($code: String!) {
        country(code: $code) {
            code
            name
            emoji
            continent {
                name
            }
        }
    }
`;

export const GET_CONTINENTS = gql`
    query GetContinents {
        continents {
            id
            code
            name
        }
    }
`;

export const ADD_COUNTRY = gql`
    mutation AddCountry($data: NewCountryInput!) {
        addCountry(data: $data) {
            code
            name
            emoji
            continent {
                name
            }
        }
    }
`;
