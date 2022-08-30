import React from 'react';

type ProviderProps = { children: React.ReactNode };

type Price = {
  currency: { symbol: string };
  amount: number;
};

type Attribute = {
  displayValue: string;
  value: string;
  id: string;
};

type AttributeSet = {
  id: string;
  name: string;
  type: string;
  items: [Attribute];
};

export type CartItem = {
  qty: number;
  uniqueId: string;
  name: string;
  brand: string;
  attributes: [] | AttributeSet[];
  prices: Price[];
  gallery: string[];
};

export type GlobalContextState = {
  toRender: {
    page: 'listing' | 'description' | 'cart';
    category: string;
    productId: string | null;
    showCart: boolean;
  };
  cartItems: CartItem[] | [];
  currency: { label: string; symbol: string };
  total: { qty: number; cost: number };
};

export type ContextObject = GlobalContextState & {
  showCartOverlay: () => void;
  navigateToProductDetailsPage: (id: string) => void;
  navigateToCartPage: () => void;
  navigateToListingPage: (cat: string) => void;
  changeCurrencySelection: (
    payload: typeof initialGlobalContextState.currency
  ) => void;
};

const initialGlobalContextState: GlobalContextState = {
  toRender: {
    page: 'listing',
    category: 'all',
    productId: null,
    showCart: false,
  },
  cartItems: [],
  currency: { label: 'USD', symbol: '$' },
  total: { qty: 0, cost: 0 },
};

const initialGlobalContextObject: ContextObject = {
  ...initialGlobalContextState,
  showCartOverlay: () => {},
  navigateToProductDetailsPage: (id: string) => {},
  navigateToCartPage: () => {},
  navigateToListingPage: (cat: string) => {},
  changeCurrencySelection: (payload) => {},
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
        category: this.state.toRender.category,
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

  /** method to change the selected currency for the app globally */
  changeCurrencySelection = (payload: typeof this.state.currency) => {
    this.setState({ currency: payload });
  };

  /** method to update the total state {qty,cost} - this method will be invoked upon adding or removing items from cart*/
  updateTotal = () => {
    let newTotal = { ...this.state.total };
    for (let item of this.state.cartItems) {
      newTotal.qty += item.qty;
      newTotal.cost += item.prices.find(
        (el) => el.currency.symbol === this.state.currency.symbol
      )?.amount!;
    }
    this.setState({ total: newTotal });
  };

  /** method to add a product to the cart - cart state itself consists of items where each one have a uniqueId
   * property with format: `${product.id}-${attribute-1}-${attribute-2}...` which will be generated based on the
   * selected attributes by user upon adding the product in PDP - the adding to cart process will search for the
   * payload item (using its uniqueId) in the existing cart state and if a similar product exists its corresponding
   * qty will be incremented +1 and if no such product exists a new one will be added with its corresponding
   * attributes - total state {qty,cost} will be updated as well by invoking updateTotal() method and these state
   * updates should trigger a rerender for any consuming component */
  addToCart = (payload: CartItem) => {
    const existingItemIndex = this.state.cartItems.findIndex(
      (el) => el.uniqueId === payload.uniqueId
    );
    const updatedCartItems = [...this.state.cartItems];
    // for already existing items we just increment its qty
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].qty++;
      // in case of a product that isn't in cart new cartItem will be added
    } else {
      updatedCartItems.push(payload);
    }
    this.setState({ cartItems: updatedCartItems }, this.updateTotal);
  };

  render(): React.ReactNode {
    const {
      showCartOverlay,
      navigateToProductDetailsPage,
      navigateToCartPage,
      navigateToListingPage,
      changeCurrencySelection,
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
          changeCurrencySelection,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContext;
