import React, { useState } from "react";
import { Card, Text, Divider, Spacer, Button } from "@nextui-org/react";

const CourseCard = ({ course }) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const toggleDescription = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  const truncatedDescription = course.description.slice(0, 100);

  const descriptionWithEllipsis =
    course.description.length > 100
      ? truncatedDescription + "..."
      : course.description;

  const renderContent = course.content.map((item, index) => (
    <div key={index}>- {item}</div>
  ));

  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="course_title">
          {course.title}
        </Text>
        <Divider />
        <Spacer y={1} />
        <Text span>
          {showMoreDescription ? course.description : descriptionWithEllipsis}
          {course.description.length > 100 && (
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
        <Text b className="course_title">
          Content:{" "}
        </Text>
        <Text span>{renderContent}</Text>
        <Spacer y={1} />
        <Text span>{course.score}</Text>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
