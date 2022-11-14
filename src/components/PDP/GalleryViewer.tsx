import React from 'react';
import OutOfStockImage from '../PLP/OutOfStockImage';
import classes from './GalleryViewer.module.css';

type propsGalleryViewer = {
  images: string[];
  inStock: boolean;
  product: string;
};
type stateGalleryViewer = { imageToBeViewed: string };

export default class GalleryViewer extends React.PureComponent<
  propsGalleryViewer,
  stateGalleryViewer
> {
  state = { imageToBeViewed: this.props.images[0] };

  selectImage: React.MouseEventHandler<HTMLImageElement> | undefined = (e) => {
    const target = e.target as HTMLImageElement;
    this.setState({ imageToBeViewed: target.src });
  };

  render() {
    const { images, product, inStock } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.imageSelector}>
          {images.map((el) => (
            <img key={el} src={el} onClick={this.selectImage} alt={product} />
          ))}
        </div>
        <div className={classes.imageViewer}>
          {inStock ? (
            <img src={this.state.imageToBeViewed} alt={product} />
          ) : (
            <OutOfStockImage src={this.state.imageToBeViewed} alt={product} />
          )}
        </div>
      </div>
    );
  }
}
