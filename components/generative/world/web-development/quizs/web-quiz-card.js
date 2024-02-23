import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Button } from "@nextui-org/react";

const WebQuizCard = ({ webQuiz }) => {
  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="task_title">
          {webQuiz.title}
        </Text>
        <Divider />
        <Spacer y={1} />

        <Spacer y={1} />
        <Text b className="task_title">
          Question:
        </Text>
        <Text span>{webQuiz.question}</Text>
      </Card.Body>
    </Card>
  );
};

export default WebQuizCard;
