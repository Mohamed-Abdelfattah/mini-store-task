import React, { Component } from 'react';
import { ReactComponent as CartIcon } from '../../../Icons/Empty Cart.svg';
import GlobalContext from '../../Utils/Context';
import classes from './CartButton.module.css';

export default class CartButton extends Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render() {
    return (
      <>
        <div className={classes.icon}>
          <CartIcon onClick={this.context.toggleCartOverlay} />
          {this.context.total.qty > 0 && (
            <div
              onClick={this.context.toggleCartOverlay}
              className={classes.badge}
            >
              {this.context.total.qty}
            </div>
          )}
        </div>
      </>
    );
  }
}
