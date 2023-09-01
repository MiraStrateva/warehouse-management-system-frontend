import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query ProducstList ($limit: Int!, $currentPage: Int!, $total: Boolean!) {
        productsList(input: {limit: $limit, currentPage: $currentPage, total: $total}) {
            first
            last
            limit
            total
            data {
                id,
                name,
                description,
                size,
                hazardous
            }
        }
    }
`;

export const ADD_PRODUCT = gql`
    mutation CreateProduct($name: String!, $description: String!, $size: Int!, $hazardous: Boolean!) {
        createProduct(input: {name: $name, description: $description, size: $size, hazardous: $hazardous}) {
            id,
            name,
            description,
            size,
            hazardous
        }
    }
`;

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
        id
    } 
}
`;