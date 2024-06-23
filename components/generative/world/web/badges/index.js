import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import ProgramCard from "./program-card.js";
import { useSelector } from "react-redux";

export const TablePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMeetings = async () => {
      const headers = { Authorization: accessToken };
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-meetings`;
        const response = await axios.get(url, { headers });
        console.log("data", response.data.programs);
        setWebMeetings(response.data.programs);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <Grid className="innerContainer">
      <Grid>
        <Text b size={"$2xl"}>
          Generated Web Development Meetings (WORLD)
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
