import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css';

export default class Navigation extends React.PureComponent {
  // categories can be fetched from the backend but and then the navigation links could be populated with map function but
  // as I'm connecting the live version to a GraphQL server on heroku which sleeps in case of inactivity which makes the very
  // 1st call to the API a slow one and navigation links won't have any data (btw can be solved with server side rendering)
  // for multiple seconds, I'll just hard code them to like have something on screen telling that you'll get 'all' or 'clothes'
  // or 'tech' but hang on it's just loading

  render(): React.ReactNode {
    return (
      // can be rendered as [list of categories].map(cat=>(<li><NavLink ...props >..</NavLink></li>))
      <nav>
        <ul className={classes.navLinks}>
          <li>
            <NavLink
              // exact
              // for deciding which alink is active react-router compares the path but not query/search parameters but here
              // we need to differentiate using query params and for that we need to use (isActive) to define the diffing function
              // which means that (exact) isn't needed - this is a reminder to always head for documentation 1st before google
              isActive={(match, location) => {
                return (
                  new URLSearchParams(location.search).get('category') === 'all'
                );
              }}
              to="/products?category=all"
              className={classes.link}
              activeClassName={classes.active}
            >
              ALL
            </NavLink>
          </li>
          <li>
            <NavLink
              // exact
              // for deciding which alink is active react-router compares the path but not query/search parameters but here
              // we need to differentiate using query params and for that we need to use (isActive) to define the diffing function
              // which means that (exact) isn't needed - this is a reminder to always head for documentation 1st before google
              isActive={(match, location) => {
                return (
                  new URLSearchParams(location.search).get('category') ===
                  'clothes'
                );
              }}
              to="/products?category=clothes"
              className={classes.link}
              activeClassName={classes.active}
            >
              CLOTHES
            </NavLink>
          </li>
          <li>
            <NavLink
              // exact
              // for deciding which alink is active react-router compares the path but not query/search parameters but here
              // we need to differentiate using query params and for that we need to use (isActive) to define the diffing function
              // which means that (exact) isn't needed - this is a reminder to always head for documentation 1st before google
              isActive={(match, location) => {
                return (
                  new URLSearchParams(location.search).get('category') ===
                  'tech'
                );
              }}
              to="/products?category=tech"
              className={classes.link}
              activeClassName={classes.active}
            >
              TECH
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
