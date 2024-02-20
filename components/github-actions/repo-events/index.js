import { Table, Text, Button, Col, Row } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../../constants/index.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { Flex } from "../../styles/flex";

export const RepoEvents = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/evaluation/list-repo-events`;
  const [repoEvents, setRepoEvents] = useState([]);

  useEffect(() => {
    const fetchrepoEvents = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.post(url, {
          headers,
        });
        console.log("data", response.data.repoEvents);
        setRepoEvents(response.data.repoEvents);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchrepoEvents();
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
            Repository Events
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
            <Table.Column>Event Type</Table.Column>
            <Table.Column>Actor's Login</Table.Column>
            <Table.Column>Repository Name</Table.Column>
            <Table.Column>Created Date</Table.Column>
            <Table.Column css={{ textAlign: "center" }}>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {repoEvents.map((repoEvent) => (
              <Table.Row key={repoEvent.id}>
                <Table.Cell>{repoEvent.type}</Table.Cell>
                <Table.Cell>{repoEvent.actor.login}</Table.Cell>
                <Table.Cell>{repoEvent.repo.name}</Table.Cell>
                <Table.Cell>
                  {new Date(repoEvent.created_at).toLocaleString()}
                </Table.Cell>
                <Table.Cell>{/* Actions */}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    </>
  );
};
