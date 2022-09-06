import React, { Component } from 'react';
import CartItem from '../components/Cart/CartItem';
import GlobalContext from '../components/Utils/Context';
import classes from './CartPage.module.css';

export default class CartPage extends Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render() {
    return (
      <div className={classes.container}>
        <p className={classes.title}>cart</p>
        <hr />
        {this.context.cartItems.map((item) => (
          <>
            <CartItem itemData={item} key={item.uniqueId} cssCategory="page" />
            <hr />
          </>
        ))}
        <div className={classes.finally}>
          <div className={classes.summary}>
            <div>
              <p>Tax 21%:&nbsp;</p>
              <p>Quantity:&nbsp;</p>
              <p>Total:&nbsp;</p>
            </div>
            <div>
              <p>
                {this.context.currency.symbol}
                {(
                  this.context.total.cost[this.context.currency.symbol] * 0.21
                ).toFixed(2)}
              </p>
              <p>{this.context.total.qty}</p>
              <p>
                {this.context.currency.symbol}
                {this.context.total.cost[this.context.currency.symbol].toFixed(
                  2
                )}
              </p>
            </div>
          </div>
          <div className={classes.button}>
            <button
              onClick={() => {
                alert('Awesome!\nYou have successfully placed the order!');
              }}
            >
              ORDER
            </button>
          </div>
        </div>
      </div>
    );
  }
}
