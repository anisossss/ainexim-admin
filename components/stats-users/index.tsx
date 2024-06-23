import React from "react";
import { Text, Link } from "@nextui-org/react";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { TotalUsers } from "./total-users";
import { TotalOrders } from "./total-orders";
import { OnlineUsers } from "./online-users";

export const StatsUsers = () => (
  <Box css={{ overflow: "hidden", width: "100%" }}>
    <Flex
      direction={"column"}
      justify={"center"}
      css={{
        width: "100%",
        py: "$5",
        px: "$10",
        mb: "$5",
        mt: "$8",
        "@sm": { px: "$20" },
      }}
    >
      <Flex
        css={{
          mt: "$8",
          "@xsMax": { px: "$10" },
        }}
        direction={"column"}
      >
        <Box>
          <Text
            h3
            css={{
              textAlign: "center",
              "@sm": {
                textAlign: "inherit",
              },
            }}
          >
            Users Statistics
          </Text>
          <br></br>

          <Flex
            css={{
              gap: "$10",
              flexWrap: "wrap",
              justifyContent: "center",
              "@sm": {
                flexWrap: "nowrap",
              },
            }}
            direction={"row"}
          >
            <OnlineUsers />
            <TotalUsers />
            <TotalOrders />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  </Box>
);
