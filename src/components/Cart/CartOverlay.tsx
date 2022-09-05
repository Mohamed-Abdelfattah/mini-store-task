import React, { Component } from 'react';
import Backdrop from '../UI/Backdrop';
import GlobalContext from '../Utils/Context';
import CartItem from './CartItem';
import classes from './CartOverlay.module.css';

export default class CartOverlay extends Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render() {
    return (
      <Backdrop modal close={this.context.toggleCartOverlay}>
        <div className={classes.container}>
          <p className={classes.title}>
            <b>My Bag</b>, {this.context.total.qty} items
          </p>
          <div className={classes.items}>
            {this.context.cartItems.map((item) => (
              <CartItem
                key={item.uniqueId}
                itemData={item}
                cssCategory="overlay"
              />
            ))}
          </div>
          <div className={classes.total}>
            <p>Total</p>
            <p>
              {this.context.currency.symbol}{' '}
              {this.context.total.cost[this.context.currency.symbol].toFixed(2)}
            </p>
          </div>
          <div className={classes.buttons}>
            <button
              className={classes.buttonVariant}
              onClick={this.context.navigateToCartPage}
            >
              VIEW BAG
            </button>
            <button
              onClick={() => {
                alert('Awesome! your order was placed successfully');
              }}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </Backdrop>
    );
  }
}
