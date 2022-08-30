import React, { Component } from 'react';
import { ReactComponent as CartIcon } from '../../../Icons/Empty Cart.svg';
import GlobalContext, { CartItem } from '../../Utils/Context';
import classes from './CartButton.module.css';

const reducer = (sum: number, current: CartItem): number => sum + current.qty;

export default class CartButton extends Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  // getTotal = (): { qty: number; cost: number } => {
  //   let total = { qty: 0, cost: 0 };
  //   for (let item of this.context.cartItems) {
  //     total.qty += item.qty;
  //     total.cost += item.prices.find(
  //       (el) => el.currency.symbol === this.context.currency.symbol
  //     )?.amount!;
  //   }
  //   return total;
  // };

  render() {
    console.log('cart', this.context.cartItems);
    return (
      <>
        <div className={classes.icon}>
          <CartIcon />
          {/* {this.context.cartItems.length > 0 && ( */}
          {true && (
            <div className={classes.badge}>
              {/* {this.context.cartItems.reduce((sum, current:CartItem)=> sum + current.qty, 0)} */}
              {this.context.total.qty}
            </div>
          )}
        </div>
      </>
    );
  }
}
