import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Button } from "@nextui-org/react";

const QuizCard = ({ quiz }) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);

  const toggleDescription = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  const renderArrayAsString = (array) => {
    return array.join(", ");
  };

  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="task_title">
          {quiz.title}
        </Text>
        <Divider />

        <Spacer y={1} />
        <Text b className="task_title">
          Content:
        </Text>
      </Card.Body>
    </Card>
  );
};

export default QuizCard;
