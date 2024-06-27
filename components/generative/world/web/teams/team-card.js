import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Grid } from "@nextui-org/react";

const TeamCard = ({ team }) => {
  return (
    <Card
      css={{
        lineHeight: "2em",
        width: "100%",
        padding: "1em",
      }}
    >
      <Card.Body>
        <Text h3 className="task_title">
          {team.name}
        </Text>
        <Divider />
        <Spacer y={1} />
        <Text
          b
          css={{
            textTransform: "capitalize",
          }}
        >
          Description:&nbsp;
        </Text>
        <Text
          span
          css={{
            textTransform: "capitalize",
          }}
        >
          {team.description}
        </Text>
        <Text
          b
          css={{
            textTransform: "capitalize",
          }}
        >
          Level:&nbsp;
        </Text>
        <Text
          span
          css={{
            textTransform: "capitalize",
          }}
        >
          {team.level}
        </Text>
        <Grid>
          <Text b>Participants:</Text>
          <ul>
            {team.participants.map((participant) => (
              <li key={participant._id}>{participant.name}</li>
            ))}
          </ul>
        </Grid>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
