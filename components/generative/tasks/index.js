import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import TaskCard from "./task-card";

export const TableTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-tasks`;
        const response = await axios.get(url);
        console.log("data", response.data.tasks);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Grid
      css={{
        padding: "4%",
      }}
    >
      <Grid>
        <Text h3>Generated Web Development Tasks</Text>
      </Grid>
      <Grid.Container gap={2}>
        {tasks.map((task) => (
          <Grid md={6} key={task._id}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
