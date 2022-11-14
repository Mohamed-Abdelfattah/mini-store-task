import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { QueryResult } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import GalleryViewer from '../components/PDP/GalleryViewer';
import ProductDetails from '../components/PDP/ProductDetails/ProductDetails';
import { CartItem } from '../store/Context';
import NotFound from './NotFound';
import classes from './PDP.module.css';
import { QUERY_PRODUCT } from '../utils/GraphQL/queries';

type statePDP = {
  product?: CartItem & { selections?: { [k: string]: any } };
  isReadyToBeAdded?: boolean;
};
export default class PDP extends React.PureComponent<
  RouteComponentProps<{ productId: string }>,
  statePDP
> {
  render() {
    const { match } = this.props;

    return (
      <div className={classes.general}>
        <Query
          query={QUERY_PRODUCT}
          variables={{ productId: match.params.productId }}
          // onCompleted={(data: any) => {
          //   const newId = generateRandomId();
          //   const stateObject: statePDP = {
          //     isReadyToBeAdded: true,
          //     product: {
          //       ...data.product,
          //       selectionsId: data.product?.id,
          //       qty: 1,
          //       selections: {},
          //       uniqueId: newId,
          //     },
          //   };
          //   if (data.product?.attributes.length > 0) {
          //     stateObject.isReadyToBeAdded = false;
          //     for (let attributeSet of data.product.attributes) {
          //       stateObject.product!.selections![attributeSet.name] = null;
          //     }
          //   }
          //   this.setState(stateObject);
          // }}
        >
          {({ loading, data, error }: QueryResult) => {
            if (loading) return <h3>Loading...</h3>;
            if (error)
              return (
                <>
                  <p>OOPS!! something went wrong</p>
                  {/* {console.log(error)} */}
                  {error.graphQLErrors.map(({ message }, i) => (
                    <p key={i}>a gql error: {message}</p>
                  ))}
                  <p>{error.networkError?.message}</p>
                </>
              );
            if (!data.product)
              return (
                <NotFound {...this.props}>
                  <div>
                    <p>No such a product!!</p>
                  </div>
                </NotFound>
              );

            return (
              <div className={classes.container}>
                <GalleryViewer
                  images={data.product.gallery}
                  inStock={data.product.inStock}
                  product={data.product.name}
                />
                <ProductDetails productData={data.product} />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
