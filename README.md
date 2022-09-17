This is my implementation of an assessment task.
The task required an implementation as per a provided design to fetch data from the GraphQL endpoint and to provide an interface to view and interact with this data.

On the product listing page users can navigate between different categories to view the products which can be added directly to the cart if they are available (in-stock) and require no selection for additional options (attributes), also by clicking on any product the user will be directed to the product description page.  
On the product description page, users can add the product to the cart if it's available (in stock) and all the options (attributes) are selected.
Users can also change the currency and view the cart to modify, add, or remove any item.

## Usage

#### Link for the live version: [Mini Store](mini-store-task-tan.vercel.app)

Install dependencies via npm: `npm install`  
The app can be served on Localhost which can be done via npm script: `npm start`

## Notes

The [live version](mini-store-task-tan.vercel.app) is connected to a GraphQL API endpoint to fetch the data, so please note that if the app will be served locally an API endpoint must be provided either by adding it to `.env.local` file or by serving it locally at [http://localhost:4000](http://localhost:4000)

The cart data or any user selections aren't stored on a server nor cached locally and so please note that reloading the page will lead to the loss of all the progress (cart data and any selection).

It was required for the app to be built with React using only class-based components and limiting the usage of additional external libraries and thus:

- An implementation using only React's Context API (for state management) currently lives in "without-router" branch and it's [live version](https://mini-store-task-btstrwhat-mohamed-abdelfattah.vercel.app) can be found in the **Environments** section as **Preview**.
- The main implementation using React-Router (for routing as SPA) and React's Context API (for state management) currently lives in "main" branch and it's [live version](https://mini-store-task-tan.vercel.app) can be found in the **About** section or in **Environments** section as **Production**.
