import React, { Component } from 'react';
import classes from './ImageCarousel.module.css';

type Porps = { images: string[]; cssCategory?: string };
type State = { currentIndex: number };

export default class ImageCarousel extends Component<Porps, State> {
  state = { currentIndex: 0 };

  render() {
    const { images, cssCategory } = this.props;
    return (
      <div className={classes[cssCategory + '-carousel']}>
        <div
          className={classes[cssCategory + '-image']}
          style={{
            backgroundImage: `url(${images[this.state.currentIndex]})`,
          }}
        />
      </div>
    );
  }
}
