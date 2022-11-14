import React from 'react';
import { ReactComponent as CartIcon } from '../../../Icons/Empty Cart.svg';
import GlobalContext from '../../../store/Context';
import classes from './CartButton.module.css';

export default class CartButton extends React.PureComponent {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render() {
    const { toggleCartOverlay, total } = this.context;

    return (
      <>
        <div className={classes.icon}>
          <CartIcon onClick={toggleCartOverlay} />
          {total.qty > 0 && (
            <div onClick={toggleCartOverlay} className={classes.badge}>
              {total.qty}
            </div>
          )}
        </div>
      </>
    );
  }
}
