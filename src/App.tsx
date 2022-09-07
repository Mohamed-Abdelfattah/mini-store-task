import React from 'react';
import './App.css';
import CartOverlay from './components/Cart/CartOverlay';
import Layout from './components/Layout/Layout';
import GlobalContext from './components/Utils/Context';
import CartPage from './Routes/CartPage';
import PDP from './Routes/PDP';
import ProductList from './Routes/PLP';

console.log(
  '-----@ App first render --> env:',
  process.env.REACT_APP_API_ENDPOINT || 'no env'
);

class App extends React.Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    console.log(
      '---@ every render --> env:',
      process.env.REACT_APP_API_ENDPOINT
    );
    return (
      <div className="App">
        <Layout>
          {this.context.toRender.showCart && <CartOverlay />}
          {this.context.toRender.page === 'description' ? (
            <PDP />
          ) : this.context.toRender.page === 'cart' ? (
            <CartPage />
          ) : (
            <ProductList />
          )}
        </Layout>
      </div>
    );
  }
}

export default App;
