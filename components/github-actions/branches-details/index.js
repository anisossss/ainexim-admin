import { Table, Text, Button, Col, Row } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../../constants/index.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { Flex } from "../../styles/flex";
import { AiFillFileExcel } from "react-icons/ai";

export const BranchesDetails = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/evaluation/list-branches`;
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.post(url, {
          headers,
        });
        console.log("data", response.data.branches);
        setBranches(response.data.branches);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchBranches();
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
            Branches Details
          </Text>
        </Flex>{" "}
        <br></br>
        <br></br>
        <Table aria-label="Branches Table" css={{ height: "auto", px: 0 }}>
          <Table.Header>
            <Table.Column>Branch Name</Table.Column>
            <Table.Column>Last Commit SHA</Table.Column>
            <Table.Column>Protected</Table.Column>
            <Table.Column>Protection Enabled</Table.Column>
            <Table.Column>Required Status Checks</Table.Column>
            <Table.Column>Last Commit URL</Table.Column>
            <Table.Column>Protection URL</Table.Column>
          </Table.Header>
          <Table.Body>
            {branches.map((branch) => (
              <Table.Row key={branch.name}>
                <Table.Cell>{branch.name}</Table.Cell>
                <Table.Cell css={{ maxWidth: "10em" }}>
                  {branch.commit.sha}
                </Table.Cell>

                <Table.Cell>{branch.protected.toString()}</Table.Cell>
                <Table.Cell>{branch.protection.enabled.toString()}</Table.Cell>
                <Table.Cell>
                  {branch.protection.required_status_checks.enforcement_level}
                </Table.Cell>
                <Table.Cell css={{ maxWidth: "10em" }}>
                  <a
                    href={branch.commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {branch.commit.url}
                  </a>
                </Table.Cell>
                <Table.Cell css={{ maxWidth: "20em" }}>
                  <a
                    href={branch.protection_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {branch.protection_url}
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    </>
  );
};
