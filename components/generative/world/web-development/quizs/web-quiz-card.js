import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Button } from "@nextui-org/react";

const WebQuizCard = ({ webQuiz }) => {
  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="webQuiz_title">
          {webQuiz.title}
        </Text>
        <Divider />
        <Spacer y={1} />

        <Spacer y={1} />
        <Text b className="webQuiz_title">
          Content:
        </Text>
      </Card.Body>
    </Card>
  );
};

export default WebQuizCard;
