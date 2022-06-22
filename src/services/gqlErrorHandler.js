import { gql } from '@apollo/client';

export default class GQLErrorHandler {
  static onError({ graphQLErrors, networkError, operation, forward }) {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.warn(err);
      }
    }

    if (networkError) {
      console.warn(`[Network error]: ${networkError}`);
    }
  }
}
