import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Decimal!) {
    addProduct(name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $name: String!, $price: Decimal!) {
    updateProduct(id: $id, name: $name, price: $price) {
      id
      name
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;
