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
import { CONSTANTS } from "../../../../../../constants/index.js";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
export const GenerateProblemSolvingTest = () => {
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [frameworkLibrary, setFrameworkLibrary] = useState("");
  const [timeAllocation, setTimeAllocation] = useState("");
  const [testType, setTestType] = useState("");
  const [meetingContent, setMeetingContent] = useState("");
  const [techSkills, setTechSkills] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // Add state to store selected user
  const [userOptions, setUserOptions] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      const headers = { Authorization: accessToken };
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

  const toggleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "expert", label: "Expert" },
  ];

  const programmingLanguageOptions = [
    { value: "All", label: "All" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "Other", label: "Other" },
  ];

  const frameworkLibraryOptions = [
    { value: "All", label: "All" },
    { value: "React", label: "React" },
    { value: "Angular", label: "Angular" },
    { value: "Other", label: "Other" },
  ];

  const timeAllocationOptions = [
    { value: "1hour", label: "1 hour" },
    { value: "2hours", label: "2 hours" },
    { value: "Other", label: "Other" },
  ];
  const techSkillsOptions = [
    { value: "Frontend", label: "Frontend Development" },
    { value: "Backend", label: "Backend Development" },
    { value: "Fullstack", label: "Fullstack Development" },
    { value: "Database", label: "Database Management" },
    { value: "Security", label: "Security Practices" },
    { value: "Other", label: "Other" },
  ];
  const meetingContentOptions = [
    { value: "Syntax", label: "Syntax" },
    { value: "Best Practices", label: "Best Practices" },
    { value: "Design Patterns", label: "Design Patterns" },
    { value: "Other", label: "Other" },
  ];
  const testTypeOptions = [
    { value: "Logical Problem Solving", label: "Logical Problem Solving" },
    { value: "Analytical Thinking", label: "Analytical Thinking" },
    { value: "Critical Thinking", label: "Critical Thinking" },
    { value: "Creative Problem Solving", label: "Creative Problem Solving" },
    { value: "Decision Making", label: "Decision Making" },
  ];
  const handleSelectionChange = (selectedValue, setFunction) => {
    if (selectedValue === "Other") {
      setFunction("Other");
    } else {
      setFunction(selectedValue);
    }
  };
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const userId = selectedUser ? selectedUser._id : null;
      const url = `${CONSTANTS.API_URL_PROD}/generation/generate-web-problem-solving-test/${level}`;
      const headers = { Authorization: accessToken };

      if (selectedUser) {
        url += `?userId=${userId}`;
      }
      const response = await axios.post(
        url,
        {
          subject,
          type: testType,
        },

        { headers }
      );

      console.log(response.data);

      setIsLoading(false);
      router.push("/generative-ai/world/web/tasks/problem-solving");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid css={{ padding: "5%", height: "100vh", overflowY: "scroll" }}>
        <Grid>
          <Text b size={"$2xl"}>
            Generate Web Development Problem Solving Test
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
          <Grid.Container css={{ alignItems: "center" }}>
            <Grid>
              <Text b>Type of Problem Solving Test</Text>
            </Grid>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Dropdown>
              <Dropdown.Button flat color="warning">
                {testType ? testType : "Select Problem Solving Test Type"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Select Problem Solving Test Type"
                color="warning"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={testType ? new Set([testType]) : new Set()}
                onSelectionChange={(selected) =>
                  setTestType(selected.values().next().value)
                }
              >
                {testTypeOptions.map((option) => (
                  <Dropdown.Item key={option.value} css={{ height: "100%" }}>
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Container>
          <br></br>

          <Grid css={{ alignItems: "center" }}>
            <Grid>
              <Text b>Subject</Text>
            </Grid>
            <br></br>
            <Grid>
              <Input
                placeholder="Subject of the Meeting"
                width="100%"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
          </Grid>
          <br></br>

          <br></br>
          <Grid.Container>
            <Button flat color="secondary" onClick={toggleAdvancedOptions}>
              {showAdvancedOptions
                ? "Hide Advanced Options"
                : "Show Advanced Options"}
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Grid>
              <Button flat color="primary" onClick={handleGenerate}>
                Generate
              </Button>
            </Grid>
          </Grid.Container>
          {showAdvancedOptions && (
            <>
              <br></br>
              <br></br>
              <Grid.Container css={{ alignItems: "center" }}>
                {" "}
                <Text b>Selected User:</Text>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="warning"
                    css={{ marginLeft: "5px" }}
                  >
                    {selectedUser ? selectedUser.name : "Select User"}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Select User"
                    color="warning"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={
                      selectedUser ? new Set([selectedUser._id]) : new Set()
                    }
                    onSelectionChange={(selected) =>
                      setSelectedUser(
                        userOptions.find(
                          (user) => user._id === selected.values().next().value
                        )
                      )
                    }
                  >
                    {userOptions.map((user) => (
                      <Dropdown.Item key={user._id}>
                        <Text span size={"$sm"}>
                          {user.name}
                        </Text>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Container>
              <br></br>

              <Grid css={{ alignItems: "center" }}>
                <Grid>
                  <Text b>Programming Language</Text>
                </Grid>
                <br></br>
                <Grid>
                  <Dropdown>
                    <Dropdown.Button flat color="warning">
                      {programmingLanguage
                        ? programmingLanguage
                        : "Select Programming Language"}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Select Programming Language"
                      color="warning"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={
                        programmingLanguage
                          ? new Set([programmingLanguage])
                          : new Set()
                      }
                      onSelectionChange={(selected) =>
                        handleSelectionChange(
                          selected.values().next().value,
                          setProgrammingLanguage
                        )
                      }
                    >
                      {programmingLanguageOptions.map((option) => (
                        <Dropdown.Item key={option.value}>
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  {programmingLanguage === "Other" && (
                    <>
                      <br></br>
                      <Input
                        placeholder="Enter Programming Language"
                        fullWidth
                      />
                      <br></br>
                    </>
                  )}
                </Grid>
              </Grid>
              <br></br>
              <Grid>
                <Grid>
                  <Text b>Framework Library</Text>
                </Grid>
                <br></br>
                <Grid>
                  <Dropdown>
                    <Dropdown.Button flat color="warning">
                      {frameworkLibrary
                        ? frameworkLibrary
                        : "Select Framework Library"}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Select Framework Library"
                      color="warning"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={
                        frameworkLibrary
                          ? new Set([frameworkLibrary])
                          : new Set()
                      }
                      onSelectionChange={(selected) =>
                        setFrameworkLibrary(selected.values().next().value)
                      }
                    >
                      {frameworkLibraryOptions.map((option) => (
                        <Dropdown.Item key={option.value}>
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <>
                    {frameworkLibrary === "Other" && (
                      <>
                        <br></br>
                        <Input
                          placeholder="Enter Framework Library"
                          fullWidth
                        />
                        <br></br>
                      </>
                    )}
                  </>
                </Grid>
              </Grid>
              <br></br>
              <Grid>
                <Text b>Tech Skills to Evaluate</Text>
              </Grid>
              <br></br>
              <Grid>
                <Dropdown>
                  <Dropdown.Button flat color="warning">
                    {techSkills ? techSkills : "Select Tech Skills to Evaluate"}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Select Tech Skills"
                    color="warning"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={
                      techSkills ? new Set([techSkills]) : new Set()
                    }
                    onSelectionChange={(selected) =>
                      setTechSkills(selected.values().next().value)
                    }
                  >
                    {techSkillsOptions.map((option) => (
                      <Dropdown.Item key={option.value}>
                        <Text span size={"$sm"}>
                          {option.label}
                        </Text>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {techSkills === "Other" && (
                  <>
                    <br></br>
                    <Input placeholder="Enter Tech Skill" fullWidth />
                    <br></br>
                  </>
                )}
              </Grid>
              <br></br>
              <Grid>
                <Text b>Type of Meeting Content</Text>
              </Grid>
              <br></br>
              <Grid>
                <Dropdown>
                  <Dropdown.Button flat color="warning">
                    {meetingContent ? meetingContent : "Select Meeting Content"}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Select Meeting Content"
                    color="warning"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={
                      meetingContent ? new Set([meetingContent]) : new Set()
                    }
                    onSelectionChange={(selected) =>
                      setMeetingContent(selected.values().next().value)
                    }
                  >
                    {meetingContentOptions.map((option) => (
                      <Dropdown.Item key={option.value}>
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {meetingContent === "Other" && (
                  <>
                    <br></br>
                    <Input placeholder="Enter Meeting Content" fullWidth />
                    <br></br>
                  </>
                )}
              </Grid>
              <br></br>
              <Grid>
                <Grid>
                  <Text b>Time Allocation </Text>
                </Grid>
                <br></br>
                <Grid>
                  <Dropdown>
                    <Dropdown.Button flat color="warning">
                      {timeAllocation
                        ? timeAllocation
                        : "Select Time Allocation"}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Select Time Allocation"
                      color="warning"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={
                        timeAllocation ? new Set([timeAllocation]) : new Set()
                      }
                      onSelectionChange={(selected) =>
                        setTimeAllocation(selected.values().next().value)
                      }
                    >
                      {timeAllocationOptions.map((option) => (
                        <Dropdown.Item key={option.value}>
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <br></br>
                  {timeAllocation === "Other" && (
                    <Input placeholder="Enter Time Allocation" fullWidth />
                  )}
                  <br></br>
                </Grid>
              </Grid>
            </>
          )}
          <br></br>
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
