import React, { Component } from 'react';
import CartOverlay from '../Cart/CartOverlay';
import GlobalContext from '../Utils/Context';
import Header from './Header/Header';

type LayoutProps = {
  children?: React.ReactNode;
};

export default class Layout extends Component<LayoutProps> {
  static contextType = GlobalContext;
  // For TS pre-3.7:
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    return (
      <>
        <Header />
        {this.context.toRender.showCart && <CartOverlay />}
        {/* <main>{this.props.children}</main> */}
      </>
    );
  }
}
