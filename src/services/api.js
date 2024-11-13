import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: `http://${process.env.REACT_APP_AWS_DNS}:${process.env.REACT_APP_GRAPHQL_SERVER_PORT}`,
  cache: new InMemoryCache()
});

export default client;
