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
import { Flex } from "../../styles/flex";
import Link from "next/link";
export const CommitsHistory = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/evaluation/list-commits`;
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.post(url, {
          headers,
        });
        console.log("data", response.data.commits);
        setCommits(response.data.commits);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchCommits();
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
            Commits History
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
            <Table.Column css={{ minWidth: "40em" }}>Commit Message</Table.Column>
            <Table.Column>Author</Table.Column>
            <Table.Column>Date</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {commits.map((commit) => (
              <Table.Row key={commit.sha}>
                <Table.Cell  css={{ maxWidth: "20em" }}>
                  {commit.commit.message}
                </Table.Cell>
                <Table.Cell>{commit.commit.author.name}</Table.Cell>
                <Table.Cell>
                  {new Date(commit.commit.author.date).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <Link href="">
                    <a
                      href={commit.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View  
                    </a>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    </>
  );
};
