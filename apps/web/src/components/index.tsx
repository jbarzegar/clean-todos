import React, { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/core";

export let Container = (props: PropsWithChildren<{}>) => (
  <Box
    paddingX="2.5rem"
    width={{ md: "50%", sm: "100%" }}
    margin="auto"
    {...props}
  />
);
