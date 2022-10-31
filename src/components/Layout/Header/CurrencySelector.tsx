import React from 'react';
import GlobalContext from '../../Utils/Context';
import { ReactComponent as ArrowDown } from '../../../Icons/arrow_down.svg';
import { ReactComponent as ArrowUp } from '../../../Icons/arrow_up.svg';
import classes from './CurrencySelector.module.css';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import Backdrop from '../../UI/Backdrop';

const QUERY_CURRENCIES_LIST = gql`
  query GetCurrenciesList {
    currencies {
      label
      symbol
    }
  }
`;

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4000',
  cache: new InMemoryCache(),
});

let currenciesList: any = [
  { label: 'loading', symbol: ':' },
  { label: 'loading', symbol: '::' },
  { label: 'loading', symbol: ':::' },
];
let errorWhileLoadingCurrenciesList = false;

apolloClient
  .query({ query: QUERY_CURRENCIES_LIST })
  .then((res) => {
    currenciesList = res.data.currencies;
  })
  .catch((err) => {
    console.log(err.message);
    errorWhileLoadingCurrenciesList = true;
  });

export default class CurrencySelector extends React.PureComponent<
  {},
  { menuIsOpen: boolean }
> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  state = { menuIsOpen: false };

  toggleMenu = () => {
    this.setState((state) => ({ menuIsOpen: !state.menuIsOpen }));
    // close cart if open already
    this.context.toRender.showCart && this.context.toggleCartOverlay();
  };

  changeCurrencyHandler: React.MouseEventHandler<HTMLLIElement> = (e) => {
    this.context.changeCurrencySelection({
      label: e.currentTarget.dataset.valueLabel!,
      symbol: e.currentTarget.dataset.valueSymbol!,
    });
    this.setState({ menuIsOpen: false });
  };

  render() {
    return (
      <>
        <div
          className={classes.arrowButton}
          onClick={() => {
            this.toggleMenu();
          }}
        >
          <label>{this.context.currency.symbol}</label>
          {this.state.menuIsOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
        {this.state.menuIsOpen && (
          <>
            <ul className={classes.menu}>
              {errorWhileLoadingCurrenciesList ? (
                <li>OOPS! something went wrong</li>
              ) : (
                currenciesList.map((item: any) => (
                  <li
                    key={item.symbol}
                    data-value-label={item.label}
                    data-value-symbol={item.symbol}
                    onClick={this.changeCurrencyHandler}
                  >
                    {item.symbol} {item.label}
                  </li>
                ))
              )}
            </ul>
            <Backdrop
              close={() => {
                this.toggleMenu();
              }}
            />
          </>
        )}
      </>
    );
  }
}
