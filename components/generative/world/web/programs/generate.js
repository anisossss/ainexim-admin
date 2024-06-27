import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Input,
  Text,
  Grid,
  Progress,
  Dropdown,
} from "@nextui-org/react";
import { CONSTANTS } from "../../../../../constants/index.js";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const CreateWebPrograms = () => {
  const [level, setLevel] = useState("");
  const [career, setCareer] = useState("");

  const [selectedUser, setSelectedUser] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  useEffect(() => {
    const headers = { Authorization: accessToken };
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${CONSTANTS.API_URL_PROD}/admin/users-accounts`,
          { headers }
        );
        console.log(response.data);
        setUserOptions(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "expert", label: "Expert" },
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const headers = { Authorization: accessToken };
      const userIds = Array.from(selectedUsers);

      const response = await axios.post(
        `${CONSTANTS.API_URL_PROD}/generation/generate-web-program`,
        {
          career: career,
          level: level,
          userIds: userIds,
        },
        { headers }
      );
      console.log(response.data);
      setIsLoading(false);
      router.push("/generative-ai/world/web/programs");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };
  const handleSelectionChange = (selected) => {
    setSelectedUsers(selected);
  };
  return (
    <>
      <Grid css={{ padding: "5%", height: "100vh", overflowY: "scroll" }}>
        <Grid>
          <Text b size={"$2xl"}>
            Create Web Development Program
          </Text>
        </Grid>
        <br></br>
        <br></br>
        <Grid md={10}>
          <Grid.Container css={{ alignItems: "center" }}>
            <Grid>
              <Text b>Level</Text>
            </Grid>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

          <Grid css={{ alignItems: "center" }}>
            <Grid>
              <Text b>Career</Text>
            </Grid>
            <br></br>
            <Grid>
              <Input
                placeholder="Career Name"
                width="100%"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
              />
            </Grid>
          </Grid>
          <br></br>
          <Grid.Container css={{ alignItems: "center" }}>
            {" "}
            <Text b>Enrolled Users:</Text>
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
          <br></br>
          <Grid.Container>
            <Grid>
              <Button flat color="primary" onClick={handleGenerate}>
                Generate
              </Button>
            </Grid>
          </Grid.Container>
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
