import React from 'react';
import CartOverlay from '../Cart/CartOverlay';
import GlobalContext from '../../store/Context';
import Header from './Header/Header';

type LayoutProps = {
  children?: React.ReactNode;
};

export default class Layout extends React.PureComponent<LayoutProps> {
  static contextType = GlobalContext;
  // For TS pre-3.7:
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    const { toRender } = this.context;

    return (
      <>
        <Header />
        {toRender.showCart && <CartOverlay />}
        {/* <main>{this.props.children}</main> */}
      </>
    );
  }
}
