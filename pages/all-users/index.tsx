import { Button, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import {
  Breadcrumbs,
  Crumb,
  CrumbLink,
} from "../../components/breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../../components/icons/breadcrumb/house-icon";
import { UsersIcon } from "../../components/icons/breadcrumb/users-icon";
import { Flex } from "../../components/styles/flex";
import { TableWrapper } from "../../components/table-users";
import React from "react";
export const users = () => {
  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <HouseIcon />
          <Link href="/">
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <UsersIcon />
          <CrumbLink href="#">Users</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>All users</Text>
      <TableWrapper />
    </Flex>
  );
};

export default users;
