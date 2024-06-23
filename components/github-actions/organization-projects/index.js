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

export const OrganizationProjects = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/evaluation/list-org-projects`;
  const [orgProjects, setOrgProjects] = useState([]);

  useEffect(() => {
    const fetchOrgProjects = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.post(url, {
          headers,
        });
        console.log("data", response.data.orgProjects);
        setOrgProjects(response.data.orgProjects);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchOrgProjects();
  }, []);
  const mockOrgProjects = [
    {
      id: 1,
      name: "E-commerce Website Development",
      description:
        "Developing an e-commerce website for an online store selling various products.",
      status: "Active",
      members: ["Anis Khalef", "Kabelo Mbewe"],
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      progress: 70,
      tasks: 15,
      completedTasks: 10,
    },
    {
      id: 2,
      name: "Portfolio Website Redesign",
      description:
        "Redesigning and updating a portfolio website for showcasing professional work and skills.",
      status: "Inactive",
      members: ["Anis Khalef", "Kabelo Mbewe"],
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      progress: 40,
      tasks: 20,
      completedTasks: 8,
    },
    {
      id: 3,
      name: "Online Learning Platform Development",
      description:
        "Building a platform for online education, providing courses and resources to learners.",
      status: "Active",
      members: ["Emma Johnson", "William Smith"],
      startDate: "2024-02-10",
      endDate: "2024-03-10",
      progress: 60,
      tasks: 12,
      completedTasks: 9,
    },
    {
      id: 4,
      name: "Social Media Integration",
      description:
        "Integrating social media features into an existing platform to enhance user engagement.",
      status: "Active",
      members: ["Olivia Davis", "James Wilson"],
      startDate: "2024-01-20",
      endDate: "2024-03-01",
      progress: 80,
      tasks: 18,
      completedTasks: 15,
    },
    {
      id: 5,
      name: "Content Management System Development",
      description:
        "Creating a CMS to manage and organize content for a website or application.",
      status: "Inactive",
      members: ["Sophia Taylor", "David Martinez"],
      startDate: "2024-02-05",
      endDate: "2024-03-20",
      progress: 30,
      tasks: 25,
      completedTasks: 6,
    },
    {
      id: 6,
      name: "Mobile App Backend Development",
      description:
        "Building the backend infrastructure for a mobile application to handle data and user interactions.",
      status: "Active",
      members: ["David Martinez", "Daniel Garcia"],
      startDate: "2024-01-25",
      endDate: "2024-03-05",
      progress: 50,
      tasks: 30,
      completedTasks: 12,
    },
    {
      id: 7,
      name: "Website Performance Optimization",
      description:
        "Improving the speed and performance of a website through optimization techniques and best practices.",
      status: "Validated",
      members: ["Liam Brown", "Ella Wilson"],
      startDate: "2024-02-15",
      endDate: "2024-03-25",
      progress: 65,
      tasks: 22,
      completedTasks: 18,
    },
    {
      id: 8,
      name: "E-learning Platform App Development",
      description:
        "Developing a mobile application for an e-learning platform to provide access to courses and educational materials on the go.",
      status: "Inactive",
      members: ["Mia Johnson", "Noah Anderson"],
      startDate: "2024-01-30",
      endDate: "2024-03-10",
      progress: 20,
      tasks: 10,
      completedTasks: 2,
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
            Organization Projects
          </Text>
        </Flex>{" "}
        <br></br>
        <br></br>
        <Table
          aria-label=" s"
          css={{
            height: "auto",
            px: 0,
          }}
        >
          <Table.Header>
            <Table.Column>Name</Table.Column>
            <Table.Column>Description</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Members</Table.Column>
            <Table.Column>Progress</Table.Column>
            <Table.Column>Total Tasks</Table.Column>
            <Table.Column>Completed Tasks</Table.Column>
            <Table.Column>Start Date</Table.Column>
            <Table.Column>End Date</Table.Column>
          </Table.Header>
          <Table.Body>
            {mockOrgProjects.map((orgProject) => (
              <Table.Row key={orgProject.id}>
                <Table.Cell>
                  <Text span size={"$xs"}>
                    {orgProject.name}
                  </Text>
                </Table.Cell>
                <Table.Cell css={{ maxWidth: "8em" }}>
                  <Text span size={"$xs"}>
                    <Tooltip
                      content={orgProject.description}
                      color="primary"
                      placement="bottom-left"
                    >
                      {orgProject.description}
                    </Tooltip>
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$xs"}>
                    {orgProject.status}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$xs"}>
                    {orgProject.members.join(", ")}
                  </Text>
                </Table.Cell>

                <Table.Cell>
                  <Text span size={"$xs"}>
                    {orgProject.progress}%
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$xs"}>
                    {orgProject.tasks}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$xs"}>
                    {orgProject.completedTasks}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$xs"}>
                    {orgProject.startDate}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text span size={"$xs"}>
                    {orgProject.endDate}
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
