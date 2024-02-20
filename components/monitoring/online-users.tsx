import {
  Table,
  Text,
  Button,
  Col,
  Row,
  Modal,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../constants/index.js";
import { IconButton } from "../icons/IconButton.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { DeleteIcon } from "../icons/table/delete-icon";
import { BsDatabaseAdd } from "react-icons/bs";
import { downloadExcel } from "react-export-table-to-excel";
import { AiFillFileExcel } from "react-icons/ai";
import { Flex } from "../styles/flex";
import { useRouter } from "next/router.js";
import toast, { Toaster } from "react-hot-toast";
export const OnlineUsers = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { accessToken } = useSelector((state) => state.auth);
  const [deleteUserVisible, setDeleteUserVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handler = () => setVisible(true);
  const closeDeleteUserModal = () => {
    setDeleteUserVisible(false);
    setSelectedUser(null);
  };

  var url = `${CONSTANTS.API_URL_PROD}/admin/users-accounts`;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = { Authorization: accessToken };
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
        header: [" "],
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
            Online Users
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
            <Table.Column> ID</Table.Column>
            <Table.Column>USERNAME</Table.Column>
            <Table.Column>TASK ASSIGNED</Table.Column>
            <Table.Column>DEADLINE</Table.Column>
            <Table.Column>TASK STATUS</Table.Column>
            <Table.Column>TEAM MEMBERSHIP</Table.Column>
            <Table.Column>AVAILABILITY STATUS</Table.Column>
            <Table.Column>SKILL ENDORSEMENTS</Table.Column>
            <Table.Column>PROJECT CONTRIBUTIONS</Table.Column>
            <Table.Column>LAST ACTIVITY</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>AX2545</Table.Cell>
              <Table.Cell>ANIS KHALEF</Table.Cell>
              <Table.Cell>AX_01</Table.Cell>
              <Table.Cell>2024-02-19</Table.Cell>
              <Table.Cell>In Progress</Table.Cell>
              <Table.Cell>Team 1</Table.Cell>
              <Table.Cell>Available</Table.Cell>
              <Table.Cell>JavaScript, React</Table.Cell>
              <Table.Cell>5</Table.Cell>
              <Table.Cell>2024-02-18 3:30 PM</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>AX1345</Table.Cell>
              <Table.Cell>KABELO MBEWE</Table.Cell>
              <Table.Cell>AX_17</Table.Cell>
              <Table.Cell>2024-02-19</Table.Cell>
              <Table.Cell>In Progress</Table.Cell>
              <Table.Cell>Team 2</Table.Cell>
              <Table.Cell>Busy</Table.Cell>
              <Table.Cell>Python, Django</Table.Cell>
              <Table.Cell>8</Table.Cell>
              <Table.Cell>2024-02-18 5:15 PM</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Flex>
    </>
  );
};
