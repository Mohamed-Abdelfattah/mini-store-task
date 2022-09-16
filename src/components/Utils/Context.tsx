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
  qty?: number | null;
  selectionsId?: string | null;
  name?: string | null;
  id?: string | null;
  brand?: string | null;
  attributes?: [] | AttributeSet[];
  prices?: Price[] | [];
  gallery?: string[] | [];
  selections?: { [k: string]: string };
  uniqueId?: string | null;
};

export type GlobalContextState = {
  toRender: {
    showCart: boolean;
  };
  cartItems: CartItem[] | [];
  currency: { label: string; symbol: string };
  total: { qty: number; cost: { [k: string]: number } };
};

export type ContextObject = GlobalContextState & {
  toggleCartOverlay: () => void;
  changeCurrencySelection: (
    payload: typeof initialGlobalContextState.currency
  ) => void;
  addToCart: (payload: CartItem) => void;
  modifyCartItem: (
    aUniqueId: string,
    payload: { [key: string]: string }
  ) => void;
  addFromCart: (aUniqueId: string) => void;
  removeFromCart: (aUniqueId: string) => void;
};

const initialGlobalContextState: GlobalContextState = {
  toRender: {
    showCart: false,
  },
  cartItems: [],
  currency: { label: 'USD', symbol: '$' },
  total: { qty: 0, cost: { $: 0 } },
};

const initialGlobalContextObject: ContextObject = {
  ...initialGlobalContextState,
  toggleCartOverlay: () => {},
  changeCurrencySelection: (payload) => {},
  addToCart: (payload) => {},
  modifyCartItem: (aUniqueId, payload) => {},
  addFromCart: (aUniqueId) => {},
  removeFromCart: (aUniqueId) => {},
};

const GlobalContext = React.createContext<ContextObject>(
  initialGlobalContextObject
);

export class GlobalContextProvider extends React.Component<
  ProviderProps,
  GlobalContextState
> {
  state = initialGlobalContextState;

  /** method for handling any clicks on the cart icon to render cart overlay by changing render state
   * (showCart) which will trigger re-render for any consumer providing it with the new state values which
   * will render cart overlay
   */
  toggleCartOverlay = () => {
    this.setState((prevState) => {
      return {
        toRender: {
          ...prevState.toRender,
          showCart: !prevState.toRender.showCart,
        },
      };
    });
  };

  /** method to change the selected currency for the app globally */
  changeCurrencySelection = (payload: typeof this.state.currency) => {
    this.setState({ currency: payload });
  };

  /**method to return a new total state value to be used in updating context state in any method - will accept list of type
   * of transaction (add or remove) and price list to update total.cost and total.qty will be +1 or -1 - method won't update
   * total state directly to avoid additional state changes (when using adding or removing methods this.setState will be
   * called with the new cartItems and new total state) */
  getUpdatedTotal = (transactionType: 'add' | 'remove', priceList: Price[]) => {
    const operator = transactionType === 'remove' ? -1 : 1;
    let newQty = this.state.total.qty + operator;
    const newCost = { ...this.state.total.cost };
    for (let element of priceList) {
      newCost[element.currency.symbol] =
        (newCost[element.currency.symbol] || 0) + operator * element.amount;
    }
    return { qty: newQty, cost: newCost };
  };

  /** method to add a product to the cart - cart state itself consists of items where each one have a selectionsId
   * property with format: `${product.id}-${attribute-1}-${attribute-2}...` which will be generated based on the
   * selected attributes by user upon adding the product in PDP - the adding to cart process will search for the
   * payload item (using its selectionsId) in the existing cart state and if a similar product exists its corresponding
   * qty will be incremented +1 and if no such product exists a new one will be added with its corresponding
   * attributes - total state {qty,cost} will be updated as well by adding the new values*/
  addToCart = (payload: CartItem) => {
    const updatedCartItems: CartItem[] = [];
    const existingItemIndex = this.state.cartItems.findIndex(
      (el) => el.selectionsId === payload.selectionsId
    );
    for (let item of this.state.cartItems) {
      updatedCartItems.push({ ...item });
    }
    // for already existing items we just increment its qty
    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].qty!++;
      // in case of a product that isn't in cart new cartItem will be added
    } else {
      updatedCartItems.push(payload);
    }

    const newTotal = this.getUpdatedTotal('add', payload.prices!);

    this.setState({
      total: newTotal,
      cartItems: updatedCartItems,
    });
  };

  /**method to modify specific item selections - method should be executed with params(uniqueId, newSelections) uniqueId will
   * be used to find the exact item to apply the modifications and to generate a new selectionsId which will be used when adding
   * a new product from PDP or PLP try finding an existing cartItem with similar attributes and update its qty or add a new one */
  modifyCartItem = (aUniqueId: string, payload: { [key: string]: string }) => {
    const updatedCartItems: CartItem[] = [];
    const existingItemIndex = this.state.cartItems.findIndex(
      (el) => el.uniqueId === aUniqueId
    );
    let newSelectionsId = this.state.cartItems[existingItemIndex].id;
    for (let item of this.state.cartItems) {
      updatedCartItems.push({ ...item });
    }
    // generate new selectionsId
    for (let value of Object.values(payload)) {
      newSelectionsId += `-${value}`;
    }
    updatedCartItems[existingItemIndex].selections = payload;
    updatedCartItems[existingItemIndex].selectionsId = newSelectionsId;
    this.setState({ cartItems: updatedCartItems });
  };

  /**method to add an item from cart - on cartOverlay or cart page (when pressing + button) additional item with the same
   * attributes should be added to the specific cartItem (by incrementing .qty +1) and also total will be updated */
  addFromCart = (aUniqueId: string) => {
    const existingItemIndex = this.state.cartItems.findIndex(
      (el) => el.uniqueId === aUniqueId
    );
    const newCartItems = [...this.state.cartItems];
    const updatedItem = { ...newCartItems[existingItemIndex] };
    updatedItem.qty!++;
    newCartItems[existingItemIndex] = updatedItem;
    const newTotal = this.getUpdatedTotal('add', updatedItem.prices!);

    this.setState({ cartItems: newCartItems, total: newTotal });
  };

  /**method to remove an item from cart - on cartOverlay or cart page (when pressing - button) only one item with the same
   * attributes should be removed from the specific cartItem (by decrementing .qty -1) and also total will be updated */
  removeFromCart = (aUniqueId: string) => {
    const updatedCartItems: CartItem[] = [];
    const existingItemIndex = this.state.cartItems.findIndex(
      (el) => el.uniqueId === aUniqueId
    );
    for (let item of this.state.cartItems) {
      updatedCartItems.push({ ...item });
    }
    // remove the whole item from the cartItems list if needed or else decrement qty
    // state should be updated immutably but by making deep copies
    const newTotal = this.getUpdatedTotal(
      'remove',
      updatedCartItems[existingItemIndex].prices!
    );
    if (updatedCartItems[existingItemIndex].qty === 1) {
      updatedCartItems.splice(existingItemIndex, 1);
    } else {
      updatedCartItems[existingItemIndex].qty!--;
    }
    // apply changes to cartItems context state
    this.setState({ cartItems: updatedCartItems, total: newTotal });
  };

  render(): React.ReactNode {
    const {
      toggleCartOverlay,
      changeCurrencySelection,
      addToCart,
      modifyCartItem,
      addFromCart,
      removeFromCart,
    } = this;

    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          toggleCartOverlay,
          changeCurrencySelection,
          addToCart,
          modifyCartItem,
          addFromCart,
          removeFromCart,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContext;
