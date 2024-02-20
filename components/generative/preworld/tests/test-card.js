import React, { useState } from "react";
import { Card, Text, Divider, Spacer } from "@nextui-org/react";

const TestCard = ({ test }) => {
  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="task_title">
          {test.title}
        </Text>
        <Divider />

        <Spacer y={1} />
        <Text b className="task_title">
          Content:
        </Text>
        <Spacer y={1} />

        <Text span>{test.score}</Text>
      </Card.Body>
    </Card>
  );
};

export default TestCard;
