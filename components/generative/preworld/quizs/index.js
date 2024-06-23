import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import QuizCard from "./quiz-card.js";
import { useSelector } from "react-redux";

export const TableQuiz = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const [quizs, setQuizs] = useState([]);

  useEffect(() => {
    const fetchQuizs = async () => {
      const headers = { Authorization: accessToken };
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-software-quiz`;
        const response = await axios.get(url, { headers });
        console.log("data", response.data.quizs);
        setQuizs(response.data.quizs);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchQuizs();
  }, []);

  return (
    <Grid className="innerContainer">
      <Grid>
        <Text b size={"$2xl"}>
          Generated Software Development Quizzes
        </Text>
      </Grid>
      <br></br>
      <Grid.Container gap={2}>
        {quizs.map((quiz) => (
          <Grid md={4} key={quiz._id}>
            <QuizCard quiz={quiz} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
