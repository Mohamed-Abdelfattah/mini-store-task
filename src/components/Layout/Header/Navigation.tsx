import React, { Component } from 'react';
import GlobalContext from '../../Utils/Context';
import classes from './Navigation.module.css';

type NavigationProps = {};
type NavigationState = {};

export default class Navigation extends Component<
  NavigationProps,
  NavigationState
> {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  // clickHandler(withCategory: 'all' | 'clothes' | 'tech') {
  //   console.log('executing');
  //   console.log(withCategory);
  //   this.context.navigateToListingPage(withCategory);
  // }

  // as it is mostly common to use links (anchor tags) inside an unordered list to represent the navbar links
  // and to make this work with TS I will be using the (strange) below code instead of a beautiful button
  // with an easy/normal handler
  clickHandler(event: React.MouseEvent) {
    event.preventDefault();
    const category =
      event.currentTarget.attributes.getNamedItem('href')?.value!;
    // console.log('executing');
    // console.log(category);
    this.context.navigateToListingPage(category);
  }

  render(): React.ReactNode {
    //
    // console.log('rendering nav');
    // console.log(this.context.navigateToListingPage);
    // console.log(this.clickHandler);

    return (
      // can be rendered as [list of categories].map(cat=>(<NavLink ...props />))
      <nav>
        <ul className={classes.navLinks}>
          <li
            className={
              this.context.toRender.category === 'all' ? classes.active : ''
            }
          >
            <a
              className={classes.link}
              onClick={this.clickHandler.bind(this)}
              href="all"
            >
              ALL
            </a>
          </li>
          <li
            className={
              this.context.toRender.category === 'clothes' ? classes.active : ''
            }
          >
            <a
              className={classes.link}
              onClick={this.clickHandler.bind(this)}
              href="clothes"
            >
              CLOTHES
            </a>
          </li>
          <li
            className={
              this.context.toRender.category === 'tech' ? classes.active : ''
            }
          >
            <a
              className={classes.link}
              onClick={this.clickHandler.bind(this)}
              href="tech"
            >
              TECH
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}