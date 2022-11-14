import { Markup } from 'interweave';
import React from 'react';

export class ProductDescription extends React.PureComponent<
  { description: any; classes: any },
  {}
> {
  render() {
    const { description, classes } = this.props;

    return (
      <div className={classes.description}>
        <Markup content={description} noWrap />
      </div>
    );
  }
}

export default ProductDescription;
