import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import CartPage from './Routes/CartPage';
import PDP from './Routes/PDP';
import PLP from './Routes/PLP';
import NotFound from './Routes/NotFound';

class App extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;

export const MemoizedApp = React.memo(App);
