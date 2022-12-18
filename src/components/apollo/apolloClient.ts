import {ApolloClient, InMemoryCache} from '@apollo/client';
export {
  ApolloProvider,
  useQuery,
  useLazyQuery,
  gql,
  useMutation,
} from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://webservices.jumpingcrab.com/graphql',
  cache: new InMemoryCache(),
});
