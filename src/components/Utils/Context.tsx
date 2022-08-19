import React from 'react';

type ProviderProps = { children: React.ReactNode };

export type GlobalContextState = {
  toRender: {
    page: 'listing' | 'description' | 'cart';
    category: string;
    productId: string | null;
    showCart: boolean;
  };
  cartItems: string[];
};

export type ContextObject = {
  toRender: {
    page: 'listing' | 'description' | 'cart';
    category: string;
    productId: string | null;
    showCart: boolean;
  };
  cartItems: string[];
  showCartOverlay: () => void;
  navigateToProductDetailsPage: (id: string) => void;
  navigateToCartPage: () => void;
  navigateToListingPage: (cat: string) => void;
};

const initialGlobalContextState: GlobalContextState = {
  toRender: {
    page: 'listing',
    category: 'all',
    productId: null,
    showCart: false,
  },
  cartItems: [],
};

const initialGlobalContextObject: ContextObject = {
  ...initialGlobalContextState,
  showCartOverlay: () => {},
  navigateToProductDetailsPage: (id: string) => {},
  navigateToCartPage: () => {},
  navigateToListingPage: (cat: string) => {},
};

const GlobalContext = React.createContext<ContextObject>(
  initialGlobalContextObject
);

export class GlobalContextProvider extends React.Component<
  ProviderProps,
  GlobalContextState
> {
  // constructor(props: ProviderProps) {
  //   super(props);
  //   this.state = initialGlobalContextState;
  // }

  state = initialGlobalContextState;

  /** method to handle navigation buttons so when a button gets clicked it will change render state (page &
   * category) which will trigger re-render for any consumer providing it with the new state values which
   * will trigger new api call with these values to re-populate consumer's local data/state
   */
  navigateToListingPage = (cat: string) => {
    this.setState({
      toRender: {
        page: 'listing',
        category: cat,
        productId: null,
        showCart: false,
      },
    });
  };
  /** method to handle clicks on any product on the listing page which will change render state (page & id)
   * which will trigger re-render for any consumer providing it with the new state values which will trigger
   * new api call with these values to re-populate consumer's local data/state
   */
  navigateToProductDetailsPage = (id: string) => {
    this.setState({
      toRender: {
        page: 'description',
        category: 'all',
        productId: id,
        showCart: false,
      },
    });
  };

  /** method for handling any clicks on the cart icon to render cart overlay by changing render state
   * (showCart) which will trigger re-render for any consumer providing it with the new state values which
   * will render cart overlay
   */
  showCartOverlay = () => {
    this.setState((prevState) => {
      return {
        toRender: {
          ...prevState.toRender,
          showCart: !prevState.toRender.showCart,
        },
      };
    });
  };

  /** method to render cart page when clicking the view bag button by changing render state (page,showCart)
   * which will trigger re-render for any consumer providing it with the new state values which will close
   * cart overlay and render cart page with items from the context
   */
  navigateToCartPage = () => {
    this.setState((prevState) => {
      return {
        toRender: { ...prevState.toRender, page: 'cart', showCart: false },
      };
    });
  };

  render(): React.ReactNode {
    const {
      showCartOverlay,
      navigateToProductDetailsPage,
      navigateToCartPage,
      navigateToListingPage,
      // state,
    } = this;

    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          showCartOverlay,
          navigateToProductDetailsPage,
          navigateToCartPage,
          navigateToListingPage,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContext;