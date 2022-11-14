import React from 'react';
import GlobalContext from '../../store/Context';
import classes from './ProductCard.module.css';
import OutOfStockImage from './OutOfStockImage';
import QuickCommerce from './QuickCommerce';
import { generateRandomId } from '../../utils/sharedFunctions';

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

export default class ProductCard extends React.PureComponent<ProductCardProps> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    const {
      id,
      prices,
      navigateToProductDetailsPage,
      name,
      inStock,
      brand,
      hasAttributes,
      images,
    } = this.props;

    const { currency, addToCart } = this.context;

    const price = prices.find(
      (item) => item.currency.symbol === currency.symbol
    );

    return (
      <div className={classes.container}>
        <div
          onClick={() => {
            navigateToProductDetailsPage(id);
          }}
          className={classes.card}
        >
          <div className={classes.cover}>
            {inStock ? (
              <img src={images[0]} alt={name} className={classes.image} />
            ) : (
              <OutOfStockImage src={images[0]} alt={name} />
            )}

            {!hasAttributes && inStock && (
              <QuickCommerce
                addProductToCart={() => {
                  addToCart({
                    // __typename: 'Product',
                    qty: 1,
                    selectionsId: id,
                    name: name,
                    brand: brand,
                    attributes: [],
                    prices: prices,
                    gallery: images,
                    id: id,
                    selections: {},
                    uniqueId: generateRandomId(),
                  });
                }}
              />
            )}
          </div>
          <div className={classes.content}>
            <p className={classes.title}>
              {brand} {name}
            </p>
            <p className={classes.price}>
              {price?.currency.symbol}
              {price?.amount}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
