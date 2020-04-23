import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import CartIcon from "./cart-icon.component";

//type def on outside
//mutation on inside, ref resolvers.js
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

const CartIconContainer = () => (
  <Query query={GET_CART_ITEM_COUNT}>
    {({ data }) => (
      <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {(toggleCartHidden) => (
          <CartIcon
            toggleCartHidden={toggleCartHidden}
            itemCount={data.itemCount}
          />
        )}
      </Mutation>
    )}
  </Query>
);

export default CartIconContainer;
