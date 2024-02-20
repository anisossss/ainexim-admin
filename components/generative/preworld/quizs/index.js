import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import QuizCard from "./quiz-card.js";

export const TableQuiz = () => {
  const [quizs, setQuizs] = useState([]);

  useEffect(() => {
    const fetchQuizs = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-software-quiz`;
        const response = await axios.get(url);
        console.log("data", response.data.quizs);
        setQuizs(response.data.quizs);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchQuizs();
  }, []);

  return (
    <Grid
      css={{
        padding: "4%",
      }}
    >
      <Grid>
        <Text b size={"$2xl"}>
          Generated Software Development Quizzes
        </Text>
      </Grid>
      <Grid.Container gap={2}>
        {quizs.map((quiz) => (
          <Grid md={6} key={quiz._id}>
            <QuizCard quiz={quiz} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
