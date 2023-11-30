import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import ModuleCard from "./module-card";

export const TableModules = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-modules`;
        const response = await axios.get(url);
        console.log("data", response.data.missions);
        setMissions(response.data.missions);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchMissions();
  }, []);

  return (
    <Grid
      css={{
        padding: "4%",
      }}
    >
      <Grid>
        <Text h3>Generated Web Development Modules</Text>
      </Grid>
      <Grid.Container gap={2}>
        {missions.map((mission) => (
          <Grid md={6} key={mission._id}>
            <ModuleCard mission={mission} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
