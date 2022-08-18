import React, { Component } from 'react';
import GlobalContext from '../../Utils/Context';

type NavigationProps = {};
type NavigationState = {};

export default class Navigation extends Component<
  NavigationProps,
  NavigationState
> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;
  // navigateToListingPage: (cat: 'all' | 'clothes' | 'tech') => void;

  // constructor(props: NavigationProps) {
  //   super(props);
  //   this.navigateToListingPage = this.context.navigateToListingPage;
  // }

  clickHandler(withCategory: 'all' | 'clothes' | 'tech') {
    // console.log('executing');
    // console.log(this.context.navigateToListingPage);
    this.context.navigateToListingPage(withCategory);
  }

  render(): React.ReactNode {
    //
    // console.log('rendering nav');
    // console.log(this.context.navigateToListingPage);
    // console.log(this.clickHandler);

    return (
      <nav>
        <button onClick={this.clickHandler.bind(this, 'all')}>ALL</button>
        <button onClick={this.clickHandler.bind(this, 'clothes')}>
          CLOTHES
        </button>
        <button onClick={this.clickHandler.bind(this, 'tech')}>TECH</button>
      </nav>
    );
  }
}
