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
  const examplePullRequests = [
    {
      id: 1,
      title: "Update README.md with project documentation",
      author: "aniskhalef",
      status: "Open",
      createdAt: "February 15, 2024",
      comments: 3,
    },
    {
      id: 2,
      title: "Fix bug in login authentication",
      author: "kabelombewe",
      status: "Closed",
      createdAt: "February 10, 2024",
      comments: 2,
    },
    {
      id: 3,
      title: "Add feature for user profile customization",
      author: "aniskhalef",
      status: "Open",
      createdAt: "February 8, 2024",
      comments: 1,
    },
    {
      id: 4,
      title: "Refactor codebase to improve performance",
      author: "cibelle",
      status: "Merged",
      createdAt: "February 5, 2024",
      comments: 5,
    },
    {
      id: 5,
      title: "Implement new design for homepage",
      author: "axel",
      status: "Open",
      createdAt: "February 3, 2024",
      comments: 0,
    },
  ];
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
            <Table.Column>Title</Table.Column>
            <Table.Column>Author</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Created At</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Comments</Table.Column>
          </Table.Header>
          <Table.Body>
            {examplePullRequests.map((pullRequest) => (
              <Table.Row key={pullRequest.id}>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {pullRequest.title}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {pullRequest.author}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {pullRequest.status}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {pullRequest.createdAt}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Row justify="center" align="center">
                    <Col>{pullRequest.comments}</Col>
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
