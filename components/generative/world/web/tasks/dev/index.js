import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import WebTaskCard from "./web-task-card.js";
import { useSelector } from "react-redux";

export const TableWebTasks = () => {
  const [webTasks, setWebTasks] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  useEffect(() => {
    const headers = { Authorization: accessToken };

    const fetchTasks = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-dev-tasks`;
        const response = await axios.get(url, { headers });
        setWebTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Grid className="innerContainer">
      <Grid>
        <Text b size={"$2xl"}>
          Generated Web Development Tasks
        </Text>
      </Grid>
      <br></br>
      <Grid.Container gap={2}>
        {webTasks.map((webTask) => (
          <Grid md={12} key={webTask._id}>
            <WebTaskCard webTask={webTask} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
