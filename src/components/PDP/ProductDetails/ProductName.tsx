import React from 'react';

export class ProductName extends React.PureComponent<
  { name: string; brand: string; classes: any },
  {}
> {
  render() {
    const { brand, name, classes } = this.props;

    return (
      <>
        <p className={classes.brand}>{brand}</p>
        <p className={classes.name}>{name}</p>
      </>
    );
  }
}

export default ProductName;
