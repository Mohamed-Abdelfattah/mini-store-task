import React, { PureComponent } from 'react';
import classes from './OutOfStockImage.module.css';

export class OutOfStockImage extends PureComponent<{
  src: string;
  alt: string;
}> {
  render() {
    return (
      <>
        <img
          src={this.props.src}
          alt={this.props.alt}
          className={classes.image}
        />
        <div className={classes['out-of-stock']}>
          <p className={classes['out-of-stock__text']}>out of stock</p>
        </div>
      </>
    );
  }
}

export default OutOfStockImage;
