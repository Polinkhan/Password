import { ChakraProvider } from "@chakra-ui/react";
import RootRouter from "./App/routes/Router";
import { HashRouter } from "react-router-dom";
import AuthContextProvider from "./App/context/auth-context";

function App() {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <HashRouter>
          <RootRouter />
        </HashRouter>
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default App;
