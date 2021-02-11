import { gql } from "apollo-boost";

// See more example queries on https://thegraph.com/explorer/subgraph/paulrberg/create-eth-app
const GET_TOKEN = gql`
  query getToken($id: ID!) {
    token(id: $id) {
      id
      name
      symbol
      decimals
      manifesto
      totalSupply
      creator
      witnessDids
      accountTokens {
        id
        balance
      }
    }
  }
`;

export default GET_TOKEN;
