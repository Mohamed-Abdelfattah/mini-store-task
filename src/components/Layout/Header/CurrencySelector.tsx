import React, { ChangeEventHandler, Component } from 'react';
import GlobalContext from '../../Utils/Context';
import { ReactComponent as ArrowDown } from '../../../Icons/arrow_down.svg';
import { ReactComponent as ArrowUp } from '../../../Icons/arrow_up.svg';
import classes from './CurrencySelector.module.css';
import { ApolloClient, gql, InMemoryCache, QueryResult } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

const QUERY_CURRENCIES_LIST = gql`
  query GetCurrenciesList {
    currencies {
      label
      symbol
    }
  }
`;

const apolloClient = new ApolloClient({
  uri: 'https://graphql-shop-data.herokuapp.com',
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
    // console.log(res.data);
    currenciesList = res.data.currencies;
  })
  .catch((err) => {
    console.log(err.message);
    errorWhileLoadingCurrenciesList = true;
  });

console.log('-- this should be printed once -- at currency');

export default class CurrencySelector extends Component<
  {},
  { menuIsOpen: boolean }
> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  state = { menuIsOpen: false };

  toggleMenu = () => {
    this.setState((state) => ({ menuIsOpen: !state.menuIsOpen }));
  };

  changeCurrencyHandler: React.MouseEventHandler<HTMLLIElement> = (e) => {
    // console.log(e.currentTarget.dataset.valueLabel);
    // console.log(e.currentTarget.dataset.valueSymbol);
    this.context.changeCurrencySelection({
      label: e.currentTarget.dataset.valueLabel!,
      symbol: e.currentTarget.dataset.valueSymbol!,
    });
    // console.log(this.context.currency.symbol);
    this.setState({ menuIsOpen: false });
  };

  render() {
    // console.log('rendering with state:', this.context.currency);
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
        )}
      </>
    );
  }
}

{
  /* <Query query={QUERY_CURRENCIES_LIST}>
          {({ loading, data, error }: QueryResult) => {
            if (loading) return <ul>Loading...</ul>;
            if (error) return <ul>
              <p>OOPS!! something went wrong</p>
                  {console.log(error)}
                  {error.graphQLErrors.map(({ message }, i) => (
                    <p key={i}>a gql error: {message}</p>
                  ))}
                  <p>{error.networkError?.message}</p>
                <ul/>
            console.log(data)
            return 
              <ul className={classes.menu}>
                {data.category.products.map((product: any) => (
                  <li
                  data-value={this.context.currency.label}
                  onClick={this.changeCurrencyHandler}
                >
                  {this.context.currency.symbol} {this.context.currency.label}
                </li>
                ))}
                </ul>
          }}
</Query>

       */
}

{
  /* <ul className={classes.menu}>
             <li
               data-value={this.context.currency.label}
               onClick={this.changeCurrencyHandler}
             >
               {this.context.currency.symbol} {this.context.currency.label}
             </li>
             <li>{this.context.currency.symbol} U</li>
             <li>
               {this.context.currency.symbol} {this.context.currency.label}
             </li>
           </ul>  */
}
