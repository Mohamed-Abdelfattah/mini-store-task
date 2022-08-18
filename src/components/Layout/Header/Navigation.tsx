import React, { Component } from 'react';

export default class Navigation extends Component {
  render(): React.ReactNode {
    return (
      <nav>
        <button>ALL</button>
        <button> CLOTHES</button>
        <button>TECH</button>
      </nav>
    );
  }
}
