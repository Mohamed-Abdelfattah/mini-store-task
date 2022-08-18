import React, { Component } from 'react';
import Header from './Header/Header';

type LayoutProps = {
  children?: React.ReactNode;
};

export default class Layout extends Component<LayoutProps> {
  render(): React.ReactNode {
    return (
      <>
        <Header />
        <main>{this.props.children}</main>
      </>
    );
  }
}
