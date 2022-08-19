import React, { Component } from 'react';
import Navigation from './Navigation';
import classes from './Header.module.css';
import { ReactComponent as Logo } from '../../../Icons/a-logo.svg';

export default class Header extends Component {
  render(): React.ReactNode {
    return (
      <header className={classes.header}>
        <Navigation />
        <div>
          <Logo />
        </div>
        <div>currency and cart</div>
      </header>
    );
  }
}
