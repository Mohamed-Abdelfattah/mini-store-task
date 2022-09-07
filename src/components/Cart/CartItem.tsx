import React, { Component } from 'react';
import SwatchAttributes from '../PDP/SwatchAttributes';
import TextAttributes from '../PDP/TextAttributes';
import GlobalContext, { CartItem as CartItemType } from '../Utils/Context';
import classes from './CartItem.module.css';
import { ReactComponent as PlusIcon } from '../../Icons/plus-square.svg';
import { ReactComponent as MinusIcon } from '../../Icons/minus-square.svg';
import ImageCarousel from './ImageCarousel';

type Props = { itemData: CartItemType; cssCategory?: string };
type State = {};

export default class CartItem extends Component<Props, State> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  /**method to modify a cartItem's selections to by calling context.modifyCart method which should make sure to modify this
   * specific item using its uniqueId to change selections and generate a new selectionsId that represents the new selections
   * which will be used to stack similar products if user added to cart using PDP
   */
  changeSelection = (property: string, id: string) => {
    // when user changes the selected attribute for this specific item in the cart this should trigger context.modifyCart
    // method which will modify this specific item (adding new .selections)
    let newSelections = { ...this.props.itemData.selections, [property]: id };
    // call context.modifyCart method (selectionsId,newSelections)
    this.context.modifyCartItem(this.props.itemData.uniqueId!, newSelections);
  };

  render() {
    const { itemData, cssCategory } = this.props;
    const priceTag = itemData.prices?.find(
      (item: any) => item.currency.symbol === this.context.currency.symbol
    );
    return (
      <>
        <div className={classes[cssCategory + '-container']}>
          <div className={classes[cssCategory + '-info']}>
            <p className={classes[cssCategory + '-brand']}>{itemData.brand}</p>
            <p className={classes[cssCategory + '-name']}>{itemData.name}</p>
            <p id="price" className={classes[cssCategory + '-price']}>
              {priceTag?.currency.symbol}
              {priceTag?.amount}
            </p>
            {itemData.attributes?.map((attribute: any) =>
              attribute.type === 'swatch' ? (
                <SwatchAttributes
                  cssCategory={cssCategory}
                  key={attribute.id}
                  attributeData={attribute}
                  selection={itemData.selections}
                  selectAttributeHandler={this.changeSelection.bind(
                    this,
                    attribute.name
                  )}
                />
              ) : (
                <TextAttributes
                  cssCategory={cssCategory}
                  key={attribute.id}
                  attributeData={attribute}
                  selection={itemData.selections}
                  selectAttributeHandler={this.changeSelection.bind(
                    this,
                    attribute.name
                  )}
                />
              )
            )}
          </div>
          <div className={classes[cssCategory + '-wrapper']}>
            <div className={classes[cssCategory + '-qty']}>
              <PlusIcon
                onClick={() => {
                  this.context.addFromCart(this.props.itemData.uniqueId!);
                }}
              />
              <div>{itemData.qty}</div>
              <MinusIcon
                onClick={() => {
                  this.context.removeFromCart(this.props.itemData.uniqueId!);
                }}
              />
            </div>
            <div className={classes[cssCategory + '-imageViewer']}>
              <ImageCarousel
                images={itemData.gallery!}
                cssCategory={cssCategory}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
