import React, { ChangeEventHandler, Component } from 'react';
import GlobalContext from '../../Utils/Context';
import { ReactComponent as ArrowDown } from '../../../Icons/arrow_down.svg';
import { ReactComponent as ArrowUp } from '../../../Icons/arrow_up.svg';
import classes from './CurrencySelector.module.css';

const eventHandler = (e: ChangeEventHandler) => {};

console.log('-- this should be printed once -- at currency');

export default class CurrencySelector extends Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  state = { menuIsOpen: false };

  dropDownChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    // console.dir(e.target.value);
    // console.log(e.target.value);
  };

  render() {
    console.log('rendering with state:', this.context.currency);
    return (
      <>
        <div className={classes.arrowButton}>
          <label>{this.context.currency.symbol}</label>
          {this.state.menuIsOpen ? <ArrowUp /> : <ArrowDown />}
        </div>
        <ul className={classes.menu}>
          <li>
            {this.context.currency.symbol} {this.context.currency.label}
          </li>
          <li>
            {this.context.currency.symbol} {this.context.currency.label}
          </li>
          <li>
            {this.context.currency.symbol} {this.context.currency.label}
          </li>
        </ul>
      </>
    );
  }
}
