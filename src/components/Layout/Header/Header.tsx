import React, { Component } from 'react';
import Navigation from './Navigation';
import classes from './Header.module.css';
import { ReactComponent as Logo } from '../../../Icons/a-logo.svg';
import CurrencySelector from './CurrencySelector';
import CartButton from './CartButton';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render(): React.ReactNode {
    return (
      <header className={classes.header}>
        <Navigation />
        <Link to="/">
          <Logo />
        </Link>
        <div className={classes.actions}>
          <CurrencySelector />
          <CartButton />
        </div>
      </header>
    );
  }
}
