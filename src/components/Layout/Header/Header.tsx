import React, { Component } from 'react';
import Navigation from './Navigation';

export default class Header extends Component {
  render(): React.ReactNode {
    return (
      <header>
        <Navigation />
        <div>Header</div>
      </header>
    );
  }
}
