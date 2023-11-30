import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Button } from "@nextui-org/react";

const MissionCard = ({ mission }) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const toggleDescription = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  const truncatedDescription = mission.description.slice(0, 100);

  const descriptionWithEllipsis =
    mission.description.length > 100
      ? truncatedDescription + "..."
      : mission.description;

  const renderContent = mission.content.map((item, index) => (
    <div key={index}>- {item}</div>
  ));

  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="mission_title">
          {mission.title}
        </Text>
        <Divider />
        <Spacer y={1} />
        <Text span>
          {showMoreDescription ? mission.description : descriptionWithEllipsis}
          {mission.description.length > 100 && (
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
        <Text b className="mission_title">
          Content:{" "}
        </Text>
        <Text span>{renderContent}</Text>
        <Spacer y={1} />
        <Text span>{mission.score}</Text>
      </Card.Body>
    </Card>
  );
};

export default MissionCard;
