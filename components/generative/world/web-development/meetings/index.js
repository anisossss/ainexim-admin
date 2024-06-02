import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import WebMeetingCard from "./web-meeting-card.js";

export const TableWebMeetings = () => {
  const [webMeetings, setWebMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-meetings`;
        const response = await axios.get(url);
        console.log("data", response.data.webMeetings);
        setWebMeetings(response.data.webMeetings);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <Grid
      css={{
        padding: "4%",
      }}
    >
      <Grid>
        <Text b size={"$2xl"}>
          Generated Web Development Meetings (WORLD)
        </Text>
      </Grid>
      <br></br>
      <Grid.Container gap={2} css={{ height: "auto" }}>
        {webMeetings.map((webMeeting) => (
          <Grid md={12} key={webMeeting._id}>
            <WebMeetingCard webMeeting={webMeeting} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
