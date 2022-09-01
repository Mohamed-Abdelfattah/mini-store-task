import { gql, QueryResult } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import GalleryViewer from '../components/PDP/GalleryViewer';
import SwatchAttributes from '../components/PDP/SwatchAttributes';
import TextAttributes from '../components/PDP/TextAttributes';
import GlobalContext, { CartItem } from '../components/Utils/Context';
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

// type Attribute = {
//   displayValue: String;
//   value: String;
//   id: String;
// };

// type AttributeSet = {
//   id?: String | null;
//   name?: String | null;
//   type?: String | null;
//   items?: [Attribute] | [];
// };

// type statePDP = AttributeSet & { isReadyToBeAdded?: boolean };
type statePDP = {
  selections?: { [k: string]: any };
  product?: CartItem;
  isReadyToBeAdded?: boolean;
};
type propsPDP = {};
export default class PDP extends Component<propsPDP, statePDP> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  state = {
    selections: {},
    isReadyToBeAdded: true,
    product: {
      qty: 1,
      uniqueId: null,
      name: null,
      brand: null,
      attributes: [],
      prices: [],
      gallery: [],
      id: null,
    },
  };

  evaluateReadyToBeAddedAndGenerateUniqueId = () => {
    // const nullAttributeIndex = Object.values(this.state.selections).findIndex(
    //   (el) => el === null
    // );
    let nullValueFound = false;
    let newUniqueId = this.state.product.id || '';
    for (let attributeValue of Object.values(this.state.selections)) {
      if (attributeValue) {
        newUniqueId += `-${attributeValue}`;
      } else {
        nullValueFound = true;
      }
    }
    console.log(
      '---newUniqueId: ',
      newUniqueId,
      'nullValueFound:',
      nullValueFound
    );
    this.setState({
      isReadyToBeAdded: !nullValueFound,
      product: { ...this.state.product, uniqueId: newUniqueId, qty: 1 },
    });
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
        ...prevState,
        selections: { ...prevState.selections, [property]: id },
        product: {
          ...prevState.product,
          // uniqueId: `${prevState.product?.uniqueId}-${id}`,
        },
      }),
      this.evaluateReadyToBeAddedAndGenerateUniqueId
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
                product: {
                  ...data.product,
                  uniqueId: data.product.id,
                  qty: 1,
                },
              };

              for (let attributeSet of data.product.attributes) {
                stateObject.selections[attributeSet.name] = null;
              }
              this.setState(stateObject);
              console.log('@PDP - populating attributes', stateObject);
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
            console.log('@PDP product state:', this.state);
            const priceTag = data.product.prices.find(
              (item: any) =>
                item.currency.symbol === this.context.currency.symbol
            );
            return (
              <div className={classes.container}>
                <GalleryViewer images={data.product.gallery} />
                <div className={classes.info}>
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
                  <label htmlFor="price" className={classes.label}>
                    PRICE:
                  </label>
                  <p id="price" className={classes.price}>
                    {priceTag.currency.symbol}
                    {priceTag.amount}
                  </p>
                  {this.state.isReadyToBeAdded ? (
                    <button
                      className={classes.btn}
                      onClick={() => {
                        this.context.addToCart(this.state.product);
                        // this.setState({
                        //   product: { uniqueId: this.state.product.id },
                        // });
                        // console.log(
                        //   '--- should execute addProduct method from the context ---'
                        // );
                        // console.log(this.state);
                        // console.dir(this.props);
                      }}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <button className={classes.btn} disabled>
                      ADD TO CART
                    </button>
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
