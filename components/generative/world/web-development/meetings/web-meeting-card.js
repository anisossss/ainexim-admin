import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Button } from "@nextui-org/react";

const WebMeetingCard = ({ webMeeting }) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);

  const toggleDescription = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  const toggleContent = () => {
    setShowMoreContent(!showMoreContent);
  };

  const truncatedDescription = webMeeting.description.slice(0, 100);
  const descriptionWithEllipsis =
    webMeeting.description.length > 100
      ? truncatedDescription + "..."
      : webMeeting.description;

  const renderContent = webMeeting.content.map((item, index) => (
    <div key={index}>- {item}</div>
  ));

  const contentWithEllipsis = showMoreContent
    ? renderContent
    : webMeeting.content
        .slice(0, 3)
        .map((item, index) => <div key={index}>- {item}</div>);

  const showMoreContentButton =
    webMeeting.content.length > 3 ? (
      <Text
        b
        onClick={toggleContent}
        css={{ cursor: "pointer", textDecoration: "underline" }}
      >
        {showMoreContent ? "Show Less" : "Show More"}
      </Text>
    ) : null;

  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="task_title">
          {webMeeting.title}
        </Text>
        <Divider />
        <Spacer y={1} />
        <Text span>
          {showMoreDescription
            ? webMeeting.description
            : descriptionWithEllipsis}
          {webMeeting.description.length > 100 && (
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
        <Text span>{contentWithEllipsis}</Text>
        {showMoreContentButton}
        <Spacer y={1} />
        <Text b className="task_title">
          Skills Required :
        </Text>
        <Text span>{webMeeting.skillsRequired.join(", ")}</Text>
        <Spacer y={1} />
        <Text b className="task_title">
          Resources:
        </Text>
        <div>{webMeeting.resources.join(", ")}</div>
      </Card.Body>
    </Card>
  );
};

export default WebMeetingCard;
