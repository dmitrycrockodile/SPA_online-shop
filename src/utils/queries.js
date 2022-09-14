import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: `http://localhost:4000/`,
  cache: new InMemoryCache({
    addTypename: false
  }),
});

export const GET_CATEGORIES = async () => {
  const data = await client.query({
    query: gql`
      {
        categories {
          name
        }
      }
    `,
  });
  return data.data.categories.map((category) => category.name);
};

export const GET_PRODUCTS = async () => {
  const data = await client.query({
    query: gql`
      {
        category(input: { title: "all" } ) {
          name
          products {
            category
            id
            inStock
            description
            brand
            name
            gallery
            prices {
              amount
              currency {
                symbol
              }
            }
            attributes {
              name
              id
              items {
                displayValue
                value
                id
              }
            }
          }
        }
      }
    `,
  });
  return data.data.category.products;
}

export const GET_PRODUCT = async (id) => {
  const data = await client.query({
    query: gql`
      {
        product(id: "${id}") {
          id
          inStock
          description
          brand
          name
          gallery
          prices {
            amount
            currency {
              symbol
            }
          }
          attributes {
            name
            id
            items {
              displayValue
              value
              id
            }
          }
        }
      }
    `
  });
  return data.data.product;
} 

export const GET_CURRENCIES = async () => {
  const data = await client.query({
    query: gql`
      {
        currencies {
          label
          symbol
        }
      }
    `
  });
  return data.data.currencies;
}