import React from 'react';
import GlobalContext from './Utils/Context';
import classes from './ProductCard.module.css';
import { ReactComponent as AddToCartIcon } from '../Icons/addToCart.svg';

type ProductCardProps = {
  id: string;
  name: string;
  brand: string;
  prices: {
    currency: {
      symbol: string;
    };
    amount: number;
  }[];
  image: string;
  hasAttributes: boolean;
};

export default class ProductCard extends React.Component<ProductCardProps> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    // console.log('--- at each render in product Card ---');
    const price = this.props.prices.find(
      (item) => item.currency.symbol === this.context.currency.symbol
    );

    return (
      <div className={classes.card}>
        <div className={classes.cover}>
          {/* <AddToCartIcon2 className={classes.icon} /> */}
          <img
            src={this.props.image}
            alt={this.props.name}
            className={classes.image}
          />
          <div className={classes.icon}>
            {!this.props.hasAttributes && <AddToCartIcon />}
          </div>
        </div>
        <div className={classes.content}>
          <p className={classes.title}>
            {this.props.brand} {this.props.name}
          </p>
          <p className={classes.price}>
            {price?.currency.symbol}
            {price?.amount}
          </p>
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: this.props.description }} /> */}
      </div>
    );
  }
}
