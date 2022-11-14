import React from 'react';
import GlobalContext, { CartItem } from '../../../store/Context';
import { generateRandomId } from '../../../utils/sharedFunctions';
import SwatchAttributes from '../SwatchAttributes';
import TextAttributes from '../TextAttributes';
import ProductActions from './ProductActions';
import ProductDescription from './ProductDescription';
import classes from './ProductDetails.module.css';
import ProductName from './ProductName';
import ProductPrice from './ProductPrice';

type State = {
  product?: CartItem & { selections?: { [k: string]: any } };
  isReadyToBeAdded?: boolean;
};

type Props = { productData: any };

export default class ProductDetails extends React.PureComponent<Props, State> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  state =
    /**method to evaluate state .isReadyToBeAdded (used to render add button visible) upon changing selections of any attribute  */
    ((productData: any): State => {
      const newId = generateRandomId();
      const stateObject: State = {
        isReadyToBeAdded: true,
        product: {
          ...productData,
          selectionsId: productData?.id,
          qty: 1,
          selections: {},
          uniqueId: newId,
        },
      };
      if (productData?.attributes.length > 0) {
        stateObject.isReadyToBeAdded = false;
        for (let attributeSet of productData.attributes) {
          stateObject.product!.selections![attributeSet.name] = null;
        }
      }
      return stateObject;
    }).call(this, this.props.productData);

  evaluateReadyToBeAdded = () => {
    let nullValueFound = false;

    let newSelectionsId = this.state.product?.id || '';
    for (let attributeValue of Object.values(this.state.product?.selections!)) {
      if (attributeValue) {
        newSelectionsId += `-${attributeValue}`;
      } else {
        nullValueFound = true;
      }
    }

    this.setState({
      isReadyToBeAdded: !nullValueFound,
      product: {
        ...this.state.product,
        selectionsId: newSelectionsId,
        qty: 1,
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
      this.evaluateReadyToBeAdded
    );
  };

  render() {
    const { productData } = this.props;
    const { currency, addToCart } = this.context;

    return (
      <div className={classes.info}>
        <ProductName
          name={productData.name}
          brand={productData.brand}
          classes={classes}
        />

        {/* <ProductAttributes/> */}
        {productData.attributes.map((attribute: any) =>
          attribute.type === 'swatch' ? (
            <SwatchAttributes
              cssCategory="page"
              key={attribute.id}
              attributeData={attribute}
              selection={this.state?.product?.selections}
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
              selection={this.state.product?.selections}
              selectAttributeHandler={this.changeSelection.bind(
                this,
                attribute.name
              )}
            />
          )
        )}

        <ProductPrice
          prices={productData.prices}
          currency={currency}
          classes={classes}
        />

        <ProductActions
          isReadyToBeAdded={this.state.isReadyToBeAdded!}
          inStock={productData.inStock}
          classes={classes}
          addHandler={() => {
            // uniqueId will be generated upon adding the product
            addToCart({
              ...this.state.product,
              uniqueId: generateRandomId(),
            });
          }}
        />

        <ProductDescription
          description={productData.description}
          classes={classes}
        />
      </div>
    );
  }
}
