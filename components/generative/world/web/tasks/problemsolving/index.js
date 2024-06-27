import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import WebProblemSolvingTestCard from "./problem-card.js";
import { useSelector } from "react-redux";

export const TableWebProblemSolvingTest = () => {
  const [webProblemSolvingTest, setWebProblemSolvingTest] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const headers = { Authorization: accessToken };
    const fetchWebProblemSolvingTest = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-problem-solving-tests`;
        const response = await axios.get(url, { headers });
        console.log("data", response.data.webProblemSolvingTests);
        setWebProblemSolvingTest(response.data.webProblemSolvingTests);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchWebProblemSolvingTest();
  }, []);

  return (
    <Grid className="innerContainer">
      <Grid>
        <Text b size={"$2xl"}>
          Generated Web Porblem Solving Tests
        </Text>
      </Grid>
      <br></br>
      <Grid.Container gap={2} css={{ height: "auto" }}>
        {webProblemSolvingTest.map((problemSolvingTest) => (
          <Grid md={12} key={problemSolvingTest._id}>
            <WebProblemSolvingTestCard
              problemSolvingTest={problemSolvingTest}
            />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
