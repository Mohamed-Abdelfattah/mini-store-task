import React from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../UI/Backdrop';
import GlobalContext from '../../store/Context';
import CartItem from './CartItem';
import classes from './CartOverlay.module.css';

export default class CartOverlay extends React.PureComponent {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render() {
    const { toggleCartOverlay, total, cartItems, currency } = this.context;

    return (
      <Backdrop modal close={toggleCartOverlay}>
        <div className={classes.container}>
          <p className={classes.title}>
            <b>My Bag</b>, {total.qty} items
          </p>
          {total.qty ? (
            <div className={classes.items}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.uniqueId}
                  itemData={item}
                  cssCategory="overlay"
                />
              ))}
            </div>
          ) : (
            <></>
          )}
          <div className={classes.total}>
            <p>Total</p>
            <p>
              {currency.symbol} {total.cost[currency.symbol].toFixed(2)}
            </p>
          </div>
          <div className={classes.buttons}>
            <Link
              to="/cart"
              className={classes.buttonVariant}
              onClick={() => {
                toggleCartOverlay();
              }}
            >
              VIEW BAG
            </Link>
            <button
              onClick={() => {
                alert('Awesome!\nYou have successfully placed the order!');
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
