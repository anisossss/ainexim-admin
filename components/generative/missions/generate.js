import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Input, Text, Grid, Progress } from "@nextui-org/react";
import { CONSTANTS } from "../../../constants/index.js";

export const GenerateMissions = () => {
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [missions, setMissions] = useState(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const url = `${CONSTANTS.API_URL_PROD}/generation/generate-web-missions/${level}`;

      const response = await axios.post(url, {
        subject,
      });

      setIsLoading(false);
      setMissions(response.data.missions);
      setLevel("");
      setSubject("");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid css={{ padding: "5%" }}>
        <Grid>
          <Text b>Generate web development Missions</Text>
        </Grid>
        <br></br>
        <Grid md={10}>
          <Grid>
            <Input
              placeholder="Level"
              width="100%"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </Grid>
          <br></br>
          <Grid>
            <Input
              placeholder="Subject"
              width="100%"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Grid>
          <br></br>
          <Grid>
            <Button flat color="primary" onClick={handleGenerate}>
              Generate
            </Button>
          </Grid>
        </Grid>

        {isLoading && (
          <Modal open={isLoading} loading={isLoading} css={{ padding: "2em" }}>
            <Text b>Generating... Please wait</Text>
            <br></br>
            <Progress
              indeterminate
              value={50}
              color="primary"
              status="primary"
            />
          </Modal>
        )}
      </Grid>
    </>
  );
};
