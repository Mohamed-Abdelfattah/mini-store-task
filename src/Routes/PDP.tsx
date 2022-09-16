import { gql, QueryResult } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import GalleryViewer from '../components/PDP/GalleryViewer';
import SwatchAttributes from '../components/PDP/SwatchAttributes';
import TextAttributes from '../components/PDP/TextAttributes';
import GlobalContext, { CartItem } from '../components/Utils/Context';
import NotFound from './NotFound';
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

type statePDP = {
  product?: CartItem & { selections?: { [k: string]: any } };
  isReadyToBeAdded?: boolean;
};
// type propsPDP = ;
export default class PDP extends Component<
  RouteComponentProps<{ productId: string }>,
  statePDP
> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  state = {
    isReadyToBeAdded: true,
    product: {
      qty: 1,
      selectionsId: null,
      name: null,
      brand: null,
      attributes: [],
      prices: [],
      gallery: [],
      id: null,
      selections: {},
      uniqueId: null,
    },
  };

  /**method to evaluate state .isReadyToBeAdded (used to render add button visible) and to generate a new selectionsId and
   * new uniqueId before adding the product to cart */
  evaluateReadyToBeAddedAndGenerateSelectionsId = () => {
    let nullValueFound = false;

    let newSelectionsId = this.state.product.id || '';
    for (let attributeValue of Object.values(this.state.product.selections)) {
      if (attributeValue) {
        newSelectionsId += `-${attributeValue}`;
      } else {
        nullValueFound = true;
      }
    }
    const newUniqueId = Math.trunc(Math.random() * 10 ** 10).toString();

    this.setState({
      isReadyToBeAdded: !nullValueFound,
      product: {
        ...this.state.product,
        selectionsId: newSelectionsId,
        qty: 1,
        uniqueId: newUniqueId,
      },
    });
  };

  changeSelection = (property: string, id: string) => {
    // setState accepts a 2nd argument which is a callback to be executed programmatically after state gets updated
    this.setState(
      (prevState) => ({
        ...prevState,
        product: {
          ...prevState.product,
          selections: { ...prevState.product?.selections, [property]: id },
        },
      }),
      this.evaluateReadyToBeAddedAndGenerateSelectionsId
    );
  };

  render() {
    return (
      <div className={classes.general}>
        <Query
          query={QUERY_PRODUCT}
          variables={{ productId: this.props.match.params.productId }}
          onCompleted={(data: any) => {
            const newId = Math.trunc(Math.random() * 10 ** 10).toString();
            const stateObject: statePDP = {
              isReadyToBeAdded: true,
              product: {
                ...data.product,
                selectionsId: data.product?.id,
                qty: 1,
                selections: {},
                uniqueId: newId,
              },
            };
            if (data.product?.attributes.length > 0) {
              stateObject.isReadyToBeAdded = false;
              for (let attributeSet of data.product.attributes) {
                stateObject.product!.selections![attributeSet.name] = null;
              }
            }
            this.setState(stateObject);
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
            if (!data.product)
              return (
                <NotFound {...this.props}>
                  <div>
                    <p>No such a product!!</p>
                  </div>
                </NotFound>
              );
            const priceTag = data.product.prices.find(
              (item: any) =>
                item.currency.symbol === this.context.currency.symbol
            );
            return (
              <div className={classes.container}>
                <GalleryViewer
                  images={data.product.gallery}
                  inStock={data.product.inStock}
                />
                <div className={classes.info}>
                  <p className={classes.brand}>{data.product.brand}</p>
                  <p className={classes.name}>{data.product.name}</p>
                  {data.product.attributes.map((attribute: any) =>
                    attribute.type === 'swatch' ? (
                      <SwatchAttributes
                        cssCategory="page"
                        key={attribute.id}
                        attributeData={attribute}
                        selection={this.state?.product.selections}
                        selectAttributeHandler={this.changeSelection.bind(
                          this,
                          attribute.name
                        )}
                      />
                    ) : (
                      <TextAttributes
                        cssCategory="page"
                        key={attribute.id}
                        attributeData={attribute}
                        selection={this.state?.product.selections}
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
                  {this.state.isReadyToBeAdded && data.product.inStock ? (
                    <button
                      className={classes.btn}
                      onClick={() => {
                        this.context.addToCart({ ...this.state.product });
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
