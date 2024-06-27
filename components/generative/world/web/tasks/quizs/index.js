import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import WebQuizCard from "./web-quiz-card.js";
import { useSelector } from "react-redux";

export const TableWebQuiz = () => {
  const [webQuizs, setWebQuizs] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWebQuizs = async () => {
      const headers = { Authorization: accessToken };
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-quizs`;
        const response = await axios.get(url, { headers });
        console.log("data", response.data.webQuizs);
        setWebQuizs(response.data.webQuizs);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchWebQuizs();
  }, []);

  return (
    <Grid className="innerContainer">
      <Grid>
        <Text b size={"$2xl"}>
          Generated Web Development Quizzes
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
