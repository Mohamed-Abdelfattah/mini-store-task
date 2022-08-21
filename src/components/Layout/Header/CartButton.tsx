import React, { Component } from 'react';
import { ReactComponent as Cart } from '../../../Icons/Empty Cart.svg';

export default class CartButton extends Component {
  render() {
    return (
      <div>
        <Cart />
      </div>
    );
  }
}
