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
        const response = await axios.get(url, {});
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
        </Flex>
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
              <Table.Cell>
                <Text span size={"$sm"}>
                  AX2545
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  ANIS KHALEF
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  AX_01
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  2024-02-19
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  In Progress
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  Team 1
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  Available
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  JavaScript, React
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  5
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  2024-02-18 3:30 PM
                </Text>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Text span size={"$sm"}>
                  AX1345
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  KABELO MBEWE
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  AX_17
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  2024-02-19
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  In Progress
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  Team 2
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  Busy
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  Python, Django
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  8
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  2024-02-18 5:15 PM
                </Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Flex>
    </>
  );
};
