import { Text } from "@nextui-org/react";
import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { Flex } from "../styles/flex";
import { TableWaitlist } from "../table-waitlist";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../../constants/index.js";
import axios from "axios";
import React, { useState, useEffect } from "react";

export const Waitlist = () => {
  var url = `${CONSTANTS.API_URL_PROD}/admin/users-accounts`;
  const [user, setUser] = useState("");
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const headers = { Authorization: accessToken };
        const { data } = await axios.get(url, {
          headers,
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching list", error);
      }
    };
    fetchRequests();
  }, []);
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
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <UsersIcon />
          <CrumbLink href="#">Waitlist</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>Waitlist subscribers</Text>

      <TableWaitlist />
    </Flex>
  );
};
