import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Button } from "@nextui-org/react";

const ModuleCard = ({ module }) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const toggleDescription = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  const truncatedDescription = module.description.slice(0, 100);

  const descriptionWithEllipsis =
    module.description.length > 100
      ? truncatedDescription + "..."
      : module.description;

  const renderContent = module.content.map((item, index) => (
    <div key={index}>- {item}</div>
  ));

  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="module_title">
          {module.title}
        </Text>
        <Divider />
        <Spacer y={1} />
        <Text span>
          {showMoreDescription ? module.description : descriptionWithEllipsis}
          {module.description.length > 100 && (
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
        <Text b className="module_title">
          Content:{" "}
        </Text>
        <Text span>{renderContent}</Text>
        <Spacer y={1} />
        <Text span>{module.score}</Text>
      </Card.Body>
    </Card>
  );
};

export default ModuleCard;
