import React from 'react';
import './App.css';
import CartOverlay from './components/Cart/CartOverlay';
import Layout from './components/Layout/Layout';
import Backdrop from './components/UI/Backdrop';
import GlobalContext from './components/Utils/Context';
import PDP from './Routes/PDP';
import ProductList from './Routes/PLP';

console.log('--this should be printed once @App--');

class App extends React.Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    // console.log(this.context);

    return (
      <div className="App">
        <Layout>
          {this.context.toRender.showCart && <CartOverlay />}
          {this.context.toRender.page === 'description' ? (
            <PDP />
          ) : (
            // this.context.toRender.page === 'cart'?<Cart/>:
            <ProductList />
          )}
        </Layout>
      </div>
    );
  }
}

export default App;
