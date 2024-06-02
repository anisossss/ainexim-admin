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
import { AddUser } from "./add-user.js";
import { Flex } from "../styles/flex";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export const TableWrapper = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
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

  const handleDeleteUser = async () => {
    try {
      const headers = { Authorization: token };
      console.log("headers", headers);

      const response = await axios.post(
        `${CONSTANTS.API_URL_PROD}/admin/delete-user/${selectedUser._id}`,
        {},
        { headers }
      );
      toast.success("User deleted successfully");
      router.reload();
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  return (
    <>
      <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
        <AddUser />
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
                  <Col>
                    <Tooltip content="Delete user" color="error">
                      <IconButton>
                        <DeleteIcon
                          size={20}
                          fill="#FF0080"
                          onClick={handler}
                        />

                        <Modal
                          closeButton
                          preventClose
                          open={visible}
                          onClose={closeDeleteUserModal}
                          scroll
                          width="500px"
                          aria-labelledby="modal-title"
                          aria-describedby="modal-description"
                        >
                          <Toaster
                            position="top-center"
                            toastOptions={{
                              duration: 5000,
                            }}
                          />
                          <Modal.Header>
                            <Text span id="modal-title" size={18}>
                              Are you sure to delete this user ?<br></br>
                              <br></br>
                            </Text>
                          </Modal.Header>
                          <Modal.Body>
                            <Button
                              flat
                              color="error"
                              onPress={closeDeleteUserModal}
                            >
                              Cancel
                            </Button>
                            <Button color="primary" onPress={handleDeleteUser}>
                              Yes
                            </Button>
                          </Modal.Body>
                        </Modal>
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
