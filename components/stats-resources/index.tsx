import React from "react";
import { Text, Link } from "@nextui-org/react";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table-users";
import NextLink from "next/link";
import { TotalQuizzes } from "./total-quizzes";
import { TotalTests } from "./total-tests";
import { TotalTasks } from "./total-tasks";

export const StatsResources = () => (
  <Box css={{ overflow: "hidden", height: "60%", width: "100%" }}>
    <Flex
      direction={"column"}
      justify={"center"}
      css={{
        width: "100%",
        px: "$10",
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
            Resources Statics
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
            <TotalQuizzes />
            <TotalTests />
            <TotalTasks />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  </Box>
);
