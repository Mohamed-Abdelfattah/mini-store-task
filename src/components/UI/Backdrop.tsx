import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classes from './Backdrop.module.css';

const portalElement = document.getElementById('overlays')!;

type Props = { children?: React.ReactNode; modal?: any; close: () => void };

export default class Backdrop extends Component<Props, {}> {
  render() {
    return ReactDOM.createPortal(
      <>
        <div className={classes.base} onClick={this.props.close}></div>
        {this.props.modal && <div className={classes.backdrop} />}
        {this.props.children}
      </>,
      portalElement
    );
  }
}
