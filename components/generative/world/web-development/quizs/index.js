import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import WebQuizCard from "./web-quiz-card.js";

export const TableWebQuiz = () => {
  const [webQuizs, setWebQuizs] = useState([]);

  useEffect(() => {
    const fetchWebQuizs = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-quizs`;
        const response = await axios.get(url);
        console.log("data", response.data.webQuizs);
        setWebQuizs(response.data.webQuizs);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchWebQuizs();
  }, []);

  return (
    <Grid
      css={{
        padding: "4%",
      }}
    >
      <Grid>
        <Text b size={"$2xl"}>
          Generated Web Development Quizzes (WORLD)
        </Text>
      </Grid>
      <br></br>
      <Grid.Container gap={2}>
        {webQuizs.map((webQuiz) => (
          <Grid md={4} key={webQuiz._id}>
            <WebQuizCard webQuiz={webQuiz} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
