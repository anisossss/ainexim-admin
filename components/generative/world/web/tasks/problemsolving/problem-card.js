import React, { useState } from "react";
import { Card, Text, Divider, Spacer } from "@nextui-org/react";

const ProblemSolvingTestCard = ({ problemSolvingTest }) => {
  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="task_title">
          {problemSolvingTest.title}
        </Text>
        <Divider />
        <Spacer y={1} />
        <Text span>{problemSolvingTest.problematic}</Text>
        <Spacer y={1} />
        <Text b className="task_title">
          Content:
        </Text>
        <Text span>{problemSolvingTest.title}</Text>

        <Spacer y={1} />
        <Text b className="task_title">
          Skills Required :
        </Text>
        <Text span>{problemSolvingTest.skillsRequired.join(", ")}</Text>
        <Spacer y={1} />
        <Text b className="task_title">
          Resources:
        </Text>
        <div>{problemSolvingTest.resources.join(", ")}</div>
      </Card.Body>
    </Card>
  );
};

export default ProblemSolvingTestCard;
