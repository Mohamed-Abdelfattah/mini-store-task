import React, { useState } from 'react';
// import { QueryResult } from '@apollo/client';
import { gql, QueryResult } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import './App.css';
import Layout from './components/Layout/Layout';
import GlobalContext from './components/Utils/Context';

console.log('this should be printed once');

const QUERY_CATEGORY = gql`
  query ExampleQuery($input: CategoryInput) {
    category(input: $input) {
      products {
        name
        description
        id
      }
      name
    }
  }
`;

type ProductItemProps = {
  id: string;
  name: string;
  description: string;
};

class ProductItem extends React.Component<ProductItemProps> {
  render(): React.ReactNode {
    return (
      <>
        <h2>{this.props.name}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.description }} />
        <hr />
      </>
    );
  }
}

class ProductList extends React.Component {
  static contextType = GlobalContext;
  context!: React.ContextType<typeof GlobalContext>;

  render(): React.ReactNode {
    const { toRender } = this.context;
    console.log(toRender.category);
    // console.log(QUERY_CATEGORY(toRender.category));

    return (
      <div>
        <Query
          query={QUERY_CATEGORY}
          variables={{ input: { title: toRender.category } }}
        >
          {({ loading, data, error }: QueryResult) => {
            if (loading) return <h3>Loading...</h3>;
            if (error)
              return (
                <>
                  <p>OOPS!! something went wrong</p>
                  {console.log(error)}
                  {error.graphQLErrors.map(({ message }, i) => (
                    <p key={i}>a gql error: {message}</p>
                  ))}
                  <p>{error.networkError?.message}</p>
                </>
              );
            // console.log(data);
            return (
              <div>
                {data.category.products.map((product: any) => (
                  <ProductItem
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    description={product.description}
                  />
                ))}
                ;
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

// ProductList.contextType = GlobalContext;

class App extends React.Component {
  static contextType?: React.Context<any> | undefined = GlobalContext;

  render(): React.ReactNode {
    // console.log(this.context);

    return (
      <div className="App">
        <Layout>
          <h1>content</h1>
          <ProductList />
        </Layout>
      </div>
    );
  }
}

export default App;
