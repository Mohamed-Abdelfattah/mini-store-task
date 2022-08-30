import React, { Component } from 'react';
import classes from './GalleryViewer.module.css';

type propsGalleryViewer = { images: string[] };
type stateGalleryViewer = { imageToBeViewed: string };

export default class GalleryViewer extends Component<
  propsGalleryViewer,
  stateGalleryViewer
> {
  state = { imageToBeViewed: this.props.images[0] };

  selectImage: React.MouseEventHandler<HTMLImageElement> | undefined = (e) => {
    const targ = e.target as HTMLImageElement;
    console.log(targ.src);
    this.setState({ imageToBeViewed: targ.src });
  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.imageSelector}>
          {this.props.images.map((el) => (
            <img key={el} src={el} onClick={this.selectImage} />
          ))}
        </div>
        <div className={classes.imageViewer}>
          <img
            src={this.state.imageToBeViewed}
            // className={classes.imageViewer}
          />
        </div>
      </div>
    );
  }
}
