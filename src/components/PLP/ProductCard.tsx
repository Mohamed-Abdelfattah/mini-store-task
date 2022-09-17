import React from 'react';
import GlobalContext from '../Utils/Context';
import classes from './ProductCard.module.css';
import { ReactComponent as AddToCartIcon } from '../../Icons/addToCart.svg';

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
  images: string[];
  hasAttributes: boolean;
  inStock: boolean;
  navigateToProductDetailsPage: (productId: string) => void;
};

export default class ProductCard extends React.Component<ProductCardProps> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    const price = this.props.prices.find(
      (item) => item.currency.symbol === this.context.currency.symbol
    );

    return (
      <div className={classes.container}>
        <div
          onClick={() => {
            this.props.navigateToProductDetailsPage(this.props.id);
          }}
          className={classes.card}
        >
          <div className={classes.cover}>
            {this.props.inStock ? (
              <img
                src={this.props.images[0]}
                alt={this.props.name}
                className={classes.image}
              />
            ) : (
              <div
                style={{
                  backgroundImage: `radial-gradient(#ffffffb5, #c4c4c43b), url(${this.props.images[0]})`,
                }}
                className={classes.stock}
              >
                out of stock
              </div>
            )}
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
        </div>
        <div className={classes.icon}>
          {!this.props.hasAttributes && this.props.inStock && (
            <>
              <AddToCartIcon
                onClick={() => {
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
                  this.context.addToCart({
                    // __typename: 'Product',
                    qty: 1,
                    selectionsId: this.props.id,
                    name: this.props.name,
                    brand: this.props.brand,
                    attributes: [],
                    prices: this.props.prices,
                    gallery: this.props.images,
                    id: this.props.id,
                    selections: {},
                    uniqueId: Math.trunc(Math.random() * 10 ** 10).toString(),
                  });
                }}
              />
              <div className={classes.hidden} id="whenAddAnimation">
                +1
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
