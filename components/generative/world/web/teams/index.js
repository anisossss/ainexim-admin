import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import TeamCard from "./team-card.js";
import { useSelector } from "react-redux";

export const TableTeams = () => {
  const [teams, setTeams] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTeams = async () => {
      const headers = { Authorization: accessToken };
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-teams`;
        const response = await axios.get(url, { headers });
        console.log("data", response.data.webTeams);
        setTeams(response.data.webTeams);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchTeams();
  }, []);

  return (
    <Grid className="innerContainer">
      <Grid>
        <Text b size={"$2xl"}>
          Generated Web Development Teams
        </Text>
      </Grid>
      <br></br>
      <Grid.Container gap={2} css={{ height: "auto" }}>
        {teams.map((team) => (
          <Grid md={12} key={team._id}>
            <TeamCard team={team} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
