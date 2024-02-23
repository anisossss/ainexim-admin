import { Card, Text } from "@nextui-org/react";
import { Flex } from "../styles/flex";
import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { Link } from "@nextui-org/react";
import { TableWrapper } from "../table-users";
export const LatestUsers = () => {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      css={{
        width: "100%",
        py: "$10",
        px: "$10",
        mt: "$8",
        "@sm": { px: "$20" },
      }}
    >
      <Flex justify={"between"} wrap={"wrap"}>
        <Text
          h3
          css={{
            textAlign: "center",
            "@lg": {
              textAlign: "inherit",
            },
          }}
        >
          Latest users
        </Text>
        <NextLink href="/all-users">
          <Link
            block
            color="primary"
            css={{
              textAlign: "center",
              "@lg": {
                textAlign: "inherit",
              },
            }}
          >
            View All
          </Link>
        </NextLink>
      </Flex>
      <TableWrapper />
    </Flex>
  );
};
