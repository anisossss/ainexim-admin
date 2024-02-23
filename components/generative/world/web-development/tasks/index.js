import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import WebTaskCard from "./web-task-card.js";

export const TableWebTasks = () => {
  const [webTasks, setWebTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-tasks`;
        const response = await axios.get(url);
        console.log("data", response.data.webTasks);
        setWebTasks(response.data.webTasks);
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
        <Text b size={"$2xl"}>
          Generated Web Development Tasks (WORLD)
        </Text>
      </Grid>
   <br></br>
      <Grid.Container gap={2}>
        {webTasks.map((webTask) => (
          <Grid md={8} key={webTask._id}>
            <WebTaskCard webTask={webTask} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
