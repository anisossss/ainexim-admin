import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import ProgramCard from "./program-card";
import { useSelector } from "react-redux";

export const TableWebPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPrograms = async () => {
      const headers = { Authorization: accessToken };
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-programs`;
        const response = await axios.get(url, { headers });
        console.log("data", response.data.programs);
        setPrograms(response.data.programs);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <Grid className="innerContainer">
      <Grid>
        <Text b size={"$2xl"}>
          Generated Web Development Programs
        </Text>
      </Grid>
      <br></br>
      <Grid.Container gap={2} css={{ height: "auto" }}>
        {programs.map((program) => (
          <Grid md={12} key={program._id}>
            <ProgramCard program={program} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
