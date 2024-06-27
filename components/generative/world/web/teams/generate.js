import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Text,
  Grid,
  Progress,
  Dropdown,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../../../../../constants/index.js";
import { useRouter } from "next/router";

export const CreateWebTeams = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const router = useRouter();
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "expert", label: "Expert" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.get(
          `${CONSTANTS.API_URL_PROD}/admin/users-accounts`,
          { headers }
        );
        setUserOptions(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchWebPrograms = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.get(
          `${CONSTANTS.API_URL_PROD}/generation/get-web-programs`,
          { headers }
        );
        setPrograms(response.data.programs);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchWebPrograms();
  }, []);

  const handleSelectionChange = (selected) => {
    setSelectedUsers(selected);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const userIds = Array.from(selectedUsers);
      const headers = { Authorization: accessToken };
      const response = await axios.post(
        `${CONSTANTS.API_URL_PROD}/generation/create-web-team`,
        {
          name: name,
          description: description,
          programId: selectedProgram,
          level: level,
          userIds: userIds,
        },
        { headers: headers }
      );

      console.log(response.data);
      setIsLoading(false);
      router.push("/generative-ai/world/web/teams");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };
  const handleProgramSelectionChange = (selected) => {
    setSelectedProgram(selected.values().next().value);
  };
  return (
    <>
      <Grid css={{ padding: "5%", height: "100vh", overflowY: "scroll" }}>
        <Grid>
          <Text b size={"$2xl"}>
            Create Web Development Team
          </Text>
        </Grid>
        <br></br>
        <br></br>
        <Grid md={10}>
          <Grid css={{ alignItems: "center" }}>
            <Grid>
              <Text b>Name</Text>
            </Grid>
            <Grid>
              <Input
                placeholder="Team's Name"
                width="100%"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          </Grid>
          <br></br>

          <Grid css={{ alignItems: "center" }}>
            <Grid>
              <Text b>Description</Text>
            </Grid>
            <Grid>
              <Textarea
                placeholder="Team's Description"
                width="100%"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <br></br>

          <Grid.Container css={{ alignItems: "center" }}>
            {" "}
            <Text b>Assign to Program:</Text>
            &nbsp; &nbsp;
            <Dropdown>
              <Dropdown.Button flat color="warning">
                {selectedProgram
                  ? programs.find((p) => p._id === selectedProgram)?.name
                  : "Select Program"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Select Program"
                selectionMode="single"
                selectedKeys={new Set([selectedProgram])}
                onSelectionChange={handleProgramSelectionChange}
              >
                {programs?.map((program) => (
                  <Dropdown.Item key={program._id}>
                    {program.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Container>
          <br></br>

          <Grid.Container css={{ alignItems: "center" }}>
            <Grid>
              <Text b>Level</Text>
            </Grid>
            &nbsp; &nbsp;
            <Dropdown>
              <Dropdown.Button flat color="warning" css={{ tt: "capitalize" }}>
                {level
                  ? level.replaceAll("_", " ")
                  : "Select Level of difficulty"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Select Level"
                color="warning"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={level ? new Set([level]) : new Set()}
                onSelectionChange={(selected) =>
                  setLevel(selected.values().next().value)
                }
              >
                {levelOptions.map((option) => (
                  <Dropdown.Item key={option.value}>
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Container>
          <br></br>

          <Grid.Container
            css={{ alignItems: "center", justifyContent: "start" }}
          >
            <Text b>Participants:</Text>
            &nbsp; &nbsp;
            <Dropdown>
              <Dropdown.Button flat color="warning">
                {selectedUsers.size === 0
                  ? "Select Users"
                  : Array.from(selectedUsers)
                      .map(
                        (userId) =>
                          userOptions.find((user) => user._id === userId).name
                      )
                      .join(", ")}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Select Users"
                maxSelections={2}
                color="warning"
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedUsers}
                onSelectionChange={handleSelectionChange}
              >
                {userOptions.map((user) => (
                  <Dropdown.Item key={user._id}>{user.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Container>
        </Grid>
        <Grid>
          <br></br>

          <Button flat color="primary" onClick={handleGenerate}>
            Generate
          </Button>
        </Grid>
        {isLoading && (
          <Modal open={isLoading} loading={isLoading} css={{ padding: "2em" }}>
            <Text b>Generating... Please wait</Text>
            <br></br>
            <Progress
              indeterminate
              value={50}
              color="primary"
              status="primary"
            />
          </Modal>
        )}
      </Grid>
    </>
  );
};
