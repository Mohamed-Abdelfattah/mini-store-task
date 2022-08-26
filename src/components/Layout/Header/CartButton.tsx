import React, { Component } from 'react';
import { ReactComponent as CartIcon } from '../../../Icons/Empty Cart.svg';
import GlobalContext from '../../Utils/Context';
import classes from './CartButton.module.css';

export default class CartButton extends Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render() {
    console.log(
      'cart',
      this.context.cart,
      Boolean(this.context.cart.total.qty)
    );
    return (
      <>
        <div className={classes.icon}>
          <CartIcon />
          {/* {this.context.cartItems.length > 0 && ( */}
          {true && <div className={classes.badge}>3</div>}
        </div>
      </>
    );
  }
}
