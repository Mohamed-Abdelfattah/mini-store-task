import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import CartOverlay from './components/Cart/CartOverlay';
import Layout from './components/Layout/Layout';
import GlobalContext from './components/Utils/Context';
import CartPage from './Routes/CartPage';
import PDP from './Routes/PDP';
import PLP from './Routes/PLP';
import NotFound from './Routes/NotFound';

class App extends React.Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    return (
      <div className="App">
        <Layout>
          {this.context.toRender.showCart && <CartOverlay />}
          <Switch>
            <Route path="/" exact>
              <Redirect to="/products?category=all" />
            </Route>
            <Route path="/products" component={PLP} exact />
            <Route path="/products/:productId" exact component={PDP} />
            <Route path="/cart" exact component={CartPage} />
            <Route
              path="*"
              render={(routerProps) => (
                <NotFound {...routerProps}>
                  <p>Are you sure about this URL!!</p>
                </NotFound>
              )}
            />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
