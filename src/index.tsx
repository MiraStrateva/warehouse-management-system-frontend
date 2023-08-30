import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //gql,
} from "@apollo/client";
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:3010/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query {
//         productsList(input: { limit: 10, currentPage: 1, total: true }) {
//           data {
//             id
//             name
//             description
//             size
//             hazardous
//           }
//         }
//       }4
//     `,
//   })
//   .then((result) => console.log(result));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<ApolloProvider client={client}><App /></ApolloProvider>);
