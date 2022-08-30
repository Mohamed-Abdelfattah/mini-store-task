import { gql, QueryResult } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import GalleryViewer from '../components/PDP/GalleryViewer';
import SwatchAttributes from '../components/PDP/SwatchAttributes';
import TextAttributes from '../components/PDP/TextAttributes';
import GlobalContext from '../components/Utils/Context';
import classes from './PDP.module.css';

const QUERY_PRODUCT = gql`
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

type Attribute = {
  displayValue: String;
  value: String;
  id: String;
};

type AttributeSet = {
  id?: String | null;
  name?: String | null;
  type?: String | null;
  items?: [Attribute] | [];
};

// type statePDP = AttributeSet & { isReadyToBeAdded?: boolean };
type statePDP = {
  selections?: { [k: string]: any };
  isReadyToBeAdded?: boolean;
};
type propsPDP = {};
export default class PDP extends Component<propsPDP, statePDP> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  state = { selections: {}, isReadyToBeAdded: true };

  evaluateReadyToBeAdded = () => {
    const nullAttributeIndex = Object.values(this.state.selections).findIndex(
      (el) => el === null
    );
    console.log('---1st index of null:', nullAttributeIndex);
    if (nullAttributeIndex === -1) {
      this.setState({ isReadyToBeAdded: true });
    }
  };

  // componentDidUpdate() {
  //   console.log('---componentDidUpdate will evaluate state---');
  //   // this.evaluateReadyToBeAdded();
  // }

  changeSelection = (property: string, id: string) => {
    // console.log('---executing changeSelection---', property, id);
    // setState accepts a 2nd argument which is a callback to be executed programmatically after state gets updated
    this.setState(
      (prevState) => ({
        selections: { ...prevState.selections, [property]: id },
      }),
      this.evaluateReadyToBeAdded
    );
  };

  render() {
    return (
      <div className={classes.general}>
        <Query
          query={QUERY_PRODUCT}
          variables={{ productId: this.context.toRender.productId }}
          onCompleted={(data: any) => {
            console.log('---on completion of query @ PDP---');
            if (data.product.attributes.length > 0) {
              console.log('have attributes');
              console.log(data.product.attributes);
              const stateObject: { [k: string]: any } = {
                isReadyToBeAdded: false,
                selections: {},
              };

              for (let attributeSet of data.product.attributes) {
                stateObject.selections[attributeSet.name] = null;
              }
              this.setState(stateObject);
              console.log(stateObject);
            }
          }}
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
            console.log('state:', this.state);
            const priceTag = data.product.prices.find(
              (item: any) =>
                item.currency.symbol === this.context.currency.symbol
            );
            return (
              <div className={classes.container}>
                <GalleryViewer images={data.product.gallery} />
                <div>
                  <p className={classes.brand}>{data.product.brand}</p>
                  <p className={classes.name}>{data.product.name}</p>
                  {data.product.attributes.map((attribute: any) =>
                    attribute.type === 'swatch' ? (
                      <SwatchAttributes
                        key={attribute.id}
                        attributeData={attribute}
                        selection={this.state?.selections}
                        selectAttributeHandler={this.changeSelection.bind(
                          this,
                          attribute.name
                        )}
                      />
                    ) : (
                      <TextAttributes
                        key={attribute.id}
                        attributeData={attribute}
                        selection={this.state?.selections}
                        selectAttributeHandler={this.changeSelection.bind(
                          this,
                          attribute.name
                        )}
                      />
                    )
                  )}
                  <label htmlFor="price">PRICE:</label>
                  <p id="price" className={classes.price}>
                    {priceTag.currency.symbol}
                    {priceTag.amount}
                  </p>
                  {this.state.isReadyToBeAdded ? (
                    <button>ADD TO CART</button>
                  ) : (
                    <button disabled>ADD TO CART</button>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.product.description,
                    }}
                  />
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
