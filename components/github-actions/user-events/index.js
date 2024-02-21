import { Table, Text, Button, Col, Row } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../../constants/index.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { Flex } from "../../styles/flex";

export const UsersEvents = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/evaluation/list-events-auth-user`;
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.post(url, {
          headers,
        });
        console.log("data", response.data.userEvents);
        setUserEvents(response.data.userEvents);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchUserEvents();
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
            Authenticated User Events
          </Text>
        </Flex>
        <br></br>
        <br></br>
        <Table aria-label="User Events Table" css={{ height: "auto", px: 0 }}>
          <Table.Header>
            <Table.Column>Event Type</Table.Column>
            <Table.Column>Actor's Login</Table.Column>
            <Table.Column>Repository Name</Table.Column>
            <Table.Column>Action</Table.Column>
            <Table.Column>Created At</Table.Column>
          </Table.Header>
          <Table.Body>
            {userEvents.map((event) => (
              <Table.Row key={event.id}>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {event.type}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {event.actor.login}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {event.repo.name}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {event.payload.action}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$sm"}>
                    {new Date(event.created_at).toLocaleString()}
                  </Text>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    </>
  );
};
