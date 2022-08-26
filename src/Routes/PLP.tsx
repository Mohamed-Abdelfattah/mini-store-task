import { gql, QueryResult } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import React from 'react';
import GlobalContext from '../components/Utils/Context';
import ProductCard from '../components/ProductCard';
import classes from './PLP.module.css';

const QUERY_CATEGORY = gql`
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

export default class ProductList extends React.Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    const { toRender } = this.context;
    console.log(toRender.category);
    // console.log(QUERY_CATEGORY(toRender.category));

    return (
      <>
        <div className={classes.container}>
          <h2>{toRender.category.toUpperCase()}</h2>
          <Query
            query={QUERY_CATEGORY}
            variables={{ input: { title: toRender.category } }}
          >
            {({ loading, data, error }: QueryResult) => {
              if (loading) return <h3>Loading...</h3>;
              if (error)
                return (
                  <>
                    <p>OOPS!! something went wrong</p>
                    {console.log(error)}
                    {error.graphQLErrors.map(({ message }, i) => (
                      <p key={i}>a gql error: {message}</p>
                    ))}
                    <p>{error.networkError?.message}</p>
                  </>
                );
              // console.log(data);
              return (
                <div className={classes.cardsLayout}>
                  {data.category.products.map((product: any) => (
                    <ProductCard
                      id={product.id}
                      key={product.id}
                      name={product.name}
                      prices={product.prices}
                      brand={product.brand}
                      image={product.gallery[0]}
                      hasAttributes={product.attributes.length > 0}
                    />
                  ))}
                </div>
              );
            }}
          </Query>
        </div>
      </>
    );
  }
}
