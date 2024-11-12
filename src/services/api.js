import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://{env.secrests.aws_dns}:{env.secrets.graphql_port}',
  cache: new InMemoryCache()
});

export default client;
