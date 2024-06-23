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
import { CONSTANTS } from "../../../constants/index.js";
import { IconButton } from "../../icons/IconButton.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { downloadExcel } from "react-export-table-to-excel";
import { AiFillFileExcel } from "react-icons/ai";
import { Flex } from "../../styles/flex.js";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export const OrgProjectDetails = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/evaluation/list-org-projects/:id`;
  const [projectDetails, setProjectDetails] = useState([]);

  useEffect(() => {
    const fetchprojectDetails = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.get(url, {
          headers,
        });
        console.log("data", response.data.projectDetails);
        setProjectDetails(response.data.projectDetails);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchprojectDetails();
  }, []);

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
            Project Details
          </Text>
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
            {projects.map((project) => (
              <Table.Row key={project._id}>
                <Table.Cell> </Table.Cell>
                <Table.Cell> </Table.Cell>
                <Table.Cell> </Table.Cell>
                <Table.Cell></Table.Cell>
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
