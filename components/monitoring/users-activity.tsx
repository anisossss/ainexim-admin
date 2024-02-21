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
import { downloadExcel } from "react-export-table-to-excel";
import { AiFillFileExcel } from "react-icons/ai";
import { Flex } from "../styles/flex";
import toast, { Toaster } from "react-hot-toast";
export const UsersActivity = () => {
  const [visible, setVisible] = useState(false);
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
            Users Activity
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
            <Table.Column>ID</Table.Column>
            <Table.Column>USER</Table.Column>
            <Table.Column>MISSION PROGRESS</Table.Column>
            <Table.Column>PERFORMANCE RATING</Table.Column>
            <Table.Column>FEEDBACK SCORE</Table.Column>
            <Table.Column>SKILLS PROFICIENCY</Table.Column>
            <Table.Column>LAST LOGIN</Table.Column>
            <Table.Column>SUSPICIOUS ACTIVITY SCORE</Table.Column>
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
                  50%
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  Good
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  8.5/10
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  JavaScript, React
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  2024-02-19 11:45 AM
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  3
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
                  80%
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  Satisfactory
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  7/10
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  Python, Django
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  2024-02-19 10:30 AM
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text span size={"$sm"}>
                  2
                </Text>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Flex>
    </>
  );
};
