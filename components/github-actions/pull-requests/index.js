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
import { useSelector } from "react-redux";
import axios from "axios";
import { Flex } from "../../styles/flex";

export const PullRequests = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/evaluation/list-pull-requests`;
  const [pullRequests, setPullRequests] = useState([]);

  useEffect(() => {
    const fetchPullRequests = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.post(url, {
          headers,
        });
        console.log("data", response.data.pullRequests);
        setPullRequests(response.data.pullRequests);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchPullRequests();
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
            Pull Requests History
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
            {pullRequests.map((pullRequest) => (
              <Table.Row key={pullRequest._id}>
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
