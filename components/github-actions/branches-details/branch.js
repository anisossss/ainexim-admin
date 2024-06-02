import { Table, Text, Button, Col, Row } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../../constants/index.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { Flex } from "../../styles/flex.js";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { AiFillFileExcel } from "react-icons/ai";

export const BranchesDetails = () => {
  const { token } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/evaluation/users-accounts`;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = { Authorization: token };
        const response = await axios.get(url, {
          headers,
        });
        console.log("data", response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchUsers();
  }, []);
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "All users",
      sheet: "All users",
      tablePayload: {
        header: ["Email", "Verified", "Orders", "Current Plan"],
        body: users.map((item) => [
          item.email,
          item.verified,
          item.orders,
          item.currentPlan,
        ]),
      },
    });
  }

  return (
    <>
      <Flex
        direction={"column"}
        css={{
          width: "100%",
          padding: "$12",
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
            Branches Details
          </Text>
          <Button
            auto
            onClick={handleDownloadExcel}
            iconRight={<AiFillFileExcel />}
          >
            Export to CSV
          </Button>
        </Flex>{" "}
        <br></br>
        <br></br>
        <Table
          aria-label="Example table with custom cells"
          css={{
            height: "auto",
            px: 0,
          }}
        >
          <Table.Header>
            <Table.Column>Email</Table.Column>
            <Table.Column>Verified</Table.Column>
            <Table.Column>Orders</Table.Column>
            <Table.Column>Current Plan</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.emailVerified ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>{user.orders.length}</Table.Cell>
                <Table.Cell>
                  {user.currentPlan ? user.currentPan : "-"}
                </Table.Cell>
                <Table.Cell>
                  <Row justify="center" align="center">
                    <Col></Col>
                  </Row>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    </>
  );
};
