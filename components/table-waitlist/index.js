import {
  Table,
  Text,
  Button,
  Col,
  Grid,
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
import { IoMdPersonAdd } from "react-icons/io";
import { downloadExcel } from "react-export-table-to-excel";
import { AiFillFileExcel } from "react-icons/ai";
import { Flex } from "../styles/flex";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export const TableWaitlist = () => {
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

  var url = `${CONSTANTS.API_URL_PROD}/admin/waitlist`;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const headers = { Authorization: accessToken };
      try {
        const response = await axios.get(url, {
          headers,
        });
        console.log("data", response.data.waitlist);
        setUsers(response.data.waitlist);
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
        header: ["Full Name", "Email", "Career"],
        body: users.map((item) => [item.fullName, item.email, item.career]),
      },
    });
  }

  const handleAddUser = async () => {
    try {
      const headers = { Authorization: accessToken };
      console.log("headers", headers);

      const response = await axios.post(
        `${CONSTANTS.API_URL_PROD}/admin/create-user/${selectedUser._id}`,
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
      <Grid className="innerContainer">
        <Flex dirction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
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
            <Table.Column>Full Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Career</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.fullName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.career}</Table.Cell>

                <Table.Cell>
                  <Row justify="center" align="center">
                    <Col>
                      <Tooltip content="Create user" color="success">
                        <IconButton>
                          <IoMdPersonAdd size={20} onClick={handler} />

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
                                Confirm User Creation ?<br></br>
                                <br></br>
                              </Text>
                            </Modal.Header>
                            <Modal.Body>
                              <Button color="primary" onPress={handleAddUser}>
                                Yes
                              </Button>
                              <Button
                                flat
                                color="error"
                                onPress={closeDeleteUserModal}
                              >
                                Cancel
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
      </Grid>
    </>
  );
};
