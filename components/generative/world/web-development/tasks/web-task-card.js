import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Button } from "@nextui-org/react";

const WebTaskCard = ({ webTask }) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const toggleDescription = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  const renderArrayAsString = (array) => {
    return array.join(", ");
  };

  const truncatedDescription = webTask.description.slice(0, 100);

  const descriptionWithEllipsis =
    webTask.description.length > 100
      ? truncatedDescription + "..."
      : webTask.description;

  const renderContent = webTask.content.map((item, index) => (
    <div key={index}>- {item}</div>
  ));

  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="task_title">
          {webTask.title}
        </Text>
        <Divider />
        <Spacer y={1} />
        <Text span>
          {showMoreDescription ? task.description : descriptionWithEllipsis}
          {webTask.description.length > 100 && (
            <Text
              b
              onClick={toggleDescription}
              css={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {showMoreDescription ? " Show Less" : " Show More"}
            </Text>
          )}
        </Text>
        <Spacer y={1} />
        <Text b className="task_title">
          Content:
        </Text>
        <Text span>{renderContent}</Text>
        <Spacer y={1} />
        <Text b className="task_title">
          Skills Required :
        </Text>
        <Text span>{renderArrayAsString(webTask.skillsRequired)}</Text>
        <Spacer y={1} />
        <Text b className="task_title">
          Resources:
        </Text>
        <div>{renderArrayAsString(webTask.resources)}</div>
       
      </Card.Body>
    </Card>
  );
};

export default WebTaskCard;
