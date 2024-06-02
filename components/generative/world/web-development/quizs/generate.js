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
export const GenerateWebQuizs = () => {
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [frameworkLibrary, setFrameworkLibrary] = useState("");
  const [timeAllocation, setTimeAllocation] = useState("");
  const [quizType, setQuizType] = useState("");
  const [quizContent, setQuizContent] = useState("");
  const [techSkills, setTechSkills] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // Add state to store selected user
  const [userOptions, setUserOptions] = useState([]); // Add state to store users for dropdown
  useEffect(() => {
    // Fetch users by name
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${CONSTANTS.API_URL_PROD}/admin/users-accounts`
        );
        console.log(response.data);
        setUserOptions(response.data.users); // Assuming response.data.users is an array of user objects
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Run only once when component mounts
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
  const quizContentOptions = [
    { value: "Syntax", label: "Syntax" },
    { value: "Best_practices", label: "Best Practices" },
    { value: "Design_patterns", label: "Design Patterns" },
    { value: "Other", label: "Other" },
  ];
  const quizTypeOptions = [
    { value: "Single_choice", label: "Single Choice" },
    { value: "Multiple_choice", label: "Multiple Choice" },
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
      let url = `${CONSTANTS.API_URL_PROD}/generation/generate-web-quiz/${level}`;
      const userId = selectedUser ? selectedUser._id : null;

      if (selectedUser) {
        url += `?userId=${userId}`;
      }
      const response = await axios.post(url, {
        subject,
        quizType,
      });

      setIsLoading(false);
      router.push("/generative-ai/world/web-development/generated/quizzes");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid css={{ padding: "5%" }}>
        <Grid>
          <Text b size={"$2xl"}>
            Generate Web Development Quizzes (WORLD)
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
              <Text b>Type of Quiz</Text>
            </Grid>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Dropdown>
              <Dropdown.Button flat color="warning">
                {quizType ? quizType : "Select Quiz Type"}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Select Quiz Type"
                color="warning"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={quizType ? new Set([quizType]) : new Set()}
                onSelectionChange={(selected) =>
                  setQuizType(selected.values().next().value)
                }
              >
                {quizTypeOptions.map((option) => (
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
              <Text b>Subject</Text>
            </Grid>
            <br></br>
            <Grid>
              <Input
                placeholder="Subject of the Quizzes"
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
              <br></br>
              <Grid.Container css={{ alignItems: "center" }}>
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
                <Text b>Type of Quiz Content</Text>
              </Grid>
              <br></br>
              <Grid>
                <Dropdown>
                  <Dropdown.Button flat color="warning">
                    {quizContent ? quizContent : "Select Quiz Content"}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Select Quiz Content"
                    color="warning"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={
                      quizContent ? new Set([quizContent]) : new Set()
                    }
                    onSelectionChange={(selected) =>
                      setQuizContent(selected.values().next().value)
                    }
                  >
                    {quizContentOptions.map((option) => (
                      <Dropdown.Item key={option.value}>
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                {quizContent === "Other" && (
                  <>
                    <br></br>
                    <Input placeholder="Enter Quiz Content" fullWidth />
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
