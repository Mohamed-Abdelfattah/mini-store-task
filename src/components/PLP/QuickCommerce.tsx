import React from 'react';
import { ReactComponent as AddToCartIcon } from '../../Icons/addToCart.svg';
import classes from './QuickCommerce.module.css';

export class QuickCommerce extends React.PureComponent<
  { addProductToCart: VoidFunction },
  {}
> {
  render() {
    return (
      <div
        className={classes.icon}
        onClick={(event) => {
          const addAnimationElement =
            document.getElementById('whenAddAnimation');
          addAnimationElement?.classList.replace(
            classes.hidden,
            classes.added1
          );
          setTimeout(() => {
            addAnimationElement?.classList.replace(
              classes.added1,
              classes.hidden
            );
          }, 500);
          this.props.addProductToCart();
          event.stopPropagation();
        }}
      >
        <AddToCartIcon />
        <div className={classes.hidden} id="whenAddAnimation">
          +1
        </div>
      </div>
    );
  }
}

export default QuickCommerce;
