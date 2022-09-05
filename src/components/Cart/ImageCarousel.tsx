import React, { Component } from 'react';
import classes from './ImageCarousel.module.css';

type Porps = { images: string[] };
type State = { currentIndex: number };

export default class ImageCarousel extends Component<Porps, State> {
  state = { currentIndex: 0 };

  render() {
    return (
      <div className={classes.carousel}>
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${
              this.props.images[this.state.currentIndex]
            })`,
          }}
        />
      </div>
    );
  }
}
