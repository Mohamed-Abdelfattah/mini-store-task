import React from 'react';

export class ProductPrice extends React.PureComponent<
  { prices: any; currency: any; classes: any },
  {}
> {
  render() {
    const { prices, currency, classes } = this.props;
    const priceTag = prices.find(
      (item: any) => item.currency.symbol === currency.symbol
    );

    return (
      <>
        <label htmlFor="price" className={classes.label}>
          PRICE:
        </label>
        <p id="price" className={classes.price}>
          {priceTag.currency.symbol}
          {priceTag.amount}
        </p>
      </>
    );
  }
}

export default ProductPrice;
