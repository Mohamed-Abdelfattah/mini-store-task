import { gql } from '@apollo/client';

export const QUERY_CATEGORY = gql`
  query getProductsOfCategory($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        brand
        inStock
        prices {
          currency {
            symbol
          }
          amount
        }
        gallery
        attributes {
          items {
            id
          }
        }
      }
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query Product($productId: String!) {
    product(id: $productId) {
      id
      name
      brand
      inStock
      gallery
      description
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
    }
  }
`;

export const QUERY_CURRENCIES_LIST = gql`
  query GetCurrenciesList {
    currencies {
      label
      symbol
    }
  }
`;
