import React from "react";
import { Flex, Heading } from "@chakra-ui/core";
// @ts-ignore
import { ReactQueryDevtools } from "react-query-devtools";

import Todos from "views/Todos";

let SiteHeader = () => (
  <Flex as="nav" align="center" justifyContent="space-between" padding="1.5rem">
    <Heading as="h1" size="xl" flex={1}>
      Clean Todos
    </Heading>
  </Flex>
);

let App = () => (
  <>
    <SiteHeader />
    <Todos />
    <ReactQueryDevtools />
  </>
);

export default App;
