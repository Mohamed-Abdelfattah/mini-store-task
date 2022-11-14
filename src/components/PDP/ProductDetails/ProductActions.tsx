import React from 'react';

export class ProductActions extends React.PureComponent<
  {
    isReadyToBeAdded: boolean;
    inStock: boolean;
    classes: any;
    addHandler: VoidFunction;
  },
  {}
> {
  render() {
    const { isReadyToBeAdded, inStock, classes, addHandler } = this.props;

    return (
      <>
        {isReadyToBeAdded && inStock ? (
          <button className={classes.btn} onClick={addHandler}>
            ADD TO CART
          </button>
        ) : (
          <button className={classes.btn} disabled>
            ADD TO CART
          </button>
        )}
      </>
    );
  }
}

export default ProductActions;
