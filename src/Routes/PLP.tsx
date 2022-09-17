import { gql, QueryResult } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import React from 'react';
import ProductCard from '../components/PLP/ProductCard';
import classes from './PLP.module.css';
import { RouteComponentProps } from 'react-router-dom';
import NotFound from './NotFound';

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

export default class PLP extends React.Component<RouteComponentProps, {}> {
  navigateToProductDetailsPage = (id: string) => {
    this.props.history.push(this.props.match.url + '/' + id);
  };

  render(): React.ReactNode {
    const searchParams = new URLSearchParams(this.props.location.search);
    console.log('rendering plp');
    return (
      <>
        <div className={classes.container}>
          <Query
            query={QUERY_CATEGORY}
            variables={{ input: { title: searchParams.get('category') } }}
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
              if (!data.category) {
                return (
                  <NotFound {...this.props}>
                    <div>
                      <p>No such a category!!</p>
                    </div>
                  </NotFound>
                );
              }
              return (
                <>
                  <h2>{data.category.name.toUpperCase()}</h2>
                  <div className={classes.cardsLayout}>
                    {data.category.products.map((product: any) => (
                      <ProductCard
                        id={product.id}
                        key={product.id}
                        name={product.name}
                        prices={product.prices}
                        brand={product.brand}
                        images={product.gallery}
                        hasAttributes={product.attributes.length > 0}
                        inStock={product.inStock}
                        navigateToProductDetailsPage={
                          this.navigateToProductDetailsPage
                        }
                      />
                    ))}
                  </div>
                </>
              );
            }}
          </Query>
        </div>
      </>
    );
  }
}
