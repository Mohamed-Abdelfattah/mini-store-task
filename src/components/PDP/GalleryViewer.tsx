import React, { Component } from 'react';
import classes from './GalleryViewer.module.css';

type propsGalleryViewer = { images: string[]; inStock: boolean };
type stateGalleryViewer = { imageToBeViewed: string };

export default class GalleryViewer extends Component<
  propsGalleryViewer,
  stateGalleryViewer
> {
  state = { imageToBeViewed: this.props.images[0] };

  selectImage: React.MouseEventHandler<HTMLImageElement> | undefined = (e) => {
    const target = e.target as HTMLImageElement;
    this.setState({ imageToBeViewed: target.src });
  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.imageSelector}>
          {this.props.images.map((el) => (
            <img key={el} src={el} onClick={this.selectImage} />
          ))}
        </div>
        <div
          className={classes.imageViewer}
          style={
            this.props.inStock
              ? {}
              : {
                  backgroundImage: `radial-gradient(#ffffffb5, #c4c4c43b), url(${this.state.imageToBeViewed})`,
                  width: '500px',
                  height: '500px',
                }
          }
        >
          {this.props.inStock ? (
            <img src={this.state.imageToBeViewed} />
          ) : (
            <p>out of stock</p>
          )}
        </div>
      </div>
    );
  }
}
