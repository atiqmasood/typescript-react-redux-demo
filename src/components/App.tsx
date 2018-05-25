import * as React from "react";

import { connect } from "react-redux";

import { Container, Dimmer, Header, Loader, Message } from "semantic-ui-react";

import Categories from "./Categories";

import { getProductIds, getProducts } from "../redux/actions";

import MainLayout from "./Layout";
import Products from "./Products";

export interface IState {
  products?: any;
  productsIds?: any;
}

class App extends React.Component<any, IState> {
  public state: IState;
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      productsIds: []
    };
  }
  public componentDidMount() {
    this.props.getProductIds();
  }

  public getProducts = (productsIds: Array<1>) => {
    this.props.getProducts(productsIds);
  };
  public render() {
    const { products, productIds, loading, loadingText, message } = this.props;

    return (
      <React.Fragment>
        <Dimmer active={loading} inverted={true}>
          <Loader inverted={true}>{loadingText}</Loader>
        </Dimmer>

        <MainLayout>
          <Container>
            <Header as="h2">About You</Header>
            {message.message && (
              <Message color={message.color} size="mini">
                {message.message}
              </Message>
            )}

            <Categories
              getProducts={this.getProducts}
              productIds={productIds}
            />

            <Products products={products} />
          </Container>
        </MainLayout>
      </React.Fragment>
    );
  }
}

const mstp = (store: any) => {
  const { products, productsIds, loading, loadingText, message } = store.app;
  return {
    loading,
    loadingText,
    message,
    productIds: productsIds.map((id: number) => ({
      key: id,
      text: id,
      value: id
    })),
    products
  };
};

const mdtp = (dispatch: any) => ({
  getProductIds: () => dispatch(getProductIds()),
  getProducts: (productsIds: any) => dispatch(getProducts(productsIds))
});
export default connect(mstp, mdtp)(App);
