import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Backdrop.module.css';

const portalElement = document.getElementById('overlays')!;

type Props = { children?: React.ReactNode; modal?: any; close: () => void };

export default class Backdrop extends React.PureComponent<Props, {}> {
  render() {
    const { close, modal, children } = this.props;

    return ReactDOM.createPortal(
      <>
        <div className={classes.base} onClick={close}></div>
        {modal && <div className={classes.backdrop} />}
        {children}
      </>,
      portalElement
    );
  }
}
