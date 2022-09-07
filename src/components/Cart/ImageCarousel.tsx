import React, { Component } from 'react';
import classes from './ImageCarousel.module.css';
import { ReactComponent as LeftArrow } from '../../Icons/leftArrow.svg';
import { ReactComponent as RightArrow } from '../../Icons/rightArrow.svg';

type Props = { images: string[]; cssCategory?: string };
type State = { currentIndex: number };

export default class ImageCarousel extends Component<Props, State> {
  state = { currentIndex: 0 };

  goToPrevious = () => {
    const isFirstIndex = this.state.currentIndex === 0;
    const newIndex = isFirstIndex
      ? this.props.images.length - 1
      : this.state.currentIndex - 1;
    this.setState({ currentIndex: newIndex });
  };

  goToNext = () => {
    const isLastIndex =
      this.state.currentIndex === this.props.images.length - 1;
    const newIndex = isLastIndex ? 0 : this.state.currentIndex + 1;
    this.setState({ currentIndex: newIndex });
  };

  render() {
    const { images, cssCategory } = this.props;
    return (
      <div className={classes[cssCategory + '-carousel']}>
        <div
          className={classes[cssCategory + '-leftArrow']}
          onClick={this.goToPrevious}
        >
          <LeftArrow />
        </div>
        <div
          className={classes[cssCategory + '-rightArrow']}
          onClick={this.goToNext}
        >
          <RightArrow />
        </div>
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
