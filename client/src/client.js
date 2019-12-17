import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */
 const typeDefs = gql`
   extend type Pet {
      vaccinated: Boolean!
   }
 `;

 const resolvers = {
   Pet: {
      vaccinated: () => true
   }
 };

 const delay = setContext(
   request =>
     new Promise((success, fail) => {
       setTimeout(() => {
         success()
       }, 800)
     })
 )

 const cache = new InMemoryCache();
 const http = new HttpLink({ uri: 'http://localhost:4000/'});

 const link = ApolloLink.from([
   delay,
   http
 ])

 const client = new ApolloClient({
    link,
    cache,
    typeDefs,
    resolvers
 });

//  const query = gql`
//     {
//         locations {
//             results {
//                 name
//             }
//         }
//     }
//  `;

//  client.query({ query }).then(result => console.log(result));

 export default client;