import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import TestCard from "./test-card.js";
import { useSelector } from "react-redux";

export const TableTests = () => {
  const [tests, setTests] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const headers = { Authorization: accessToken };
    const fetchTasks = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-software-test`;
        const response = await axios.get(url, { headers });
        console.log("data", response.data.tests);
        setTests(response.data.tests);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Grid className="innerContainer">
      <Grid>
        <Text b size={"$2xl"}>
          Generated Software Development Tests
        </Text>
      </Grid>
      <br></br>
      <Grid.Container gap={2}>
        {tests.map((test) => (
          <Grid md={4} key={test._id}>
            <TestCard test={test} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
