import React from "react";
import { Card, Text, Divider, Spacer } from "@nextui-org/react";

const ProgramCard = ({ program }) => {
  return (
    <Card css={{ lineHeight: "2em", width: "100%", padding: "1em" }}>
      <Card.Body>
        <Text h3 className="task_title">
          {program.name}
        </Text>
        <Divider />
        <Spacer y={1} />
        <Text span>{program.description}</Text>
        <Text span>Level: {program.level}</Text>

        <Spacer y={1} />
        <Text h3>Tasks:</Text>
        {program.tasks.length === 0 ? (
          <Text span>No tasks available</Text>
        ) : (
          program.tasks.map((task, index) => (
            <Text key={index} span>
              {task}
            </Text>
          ))
        )}

        <Spacer y={1} />
        <Text h3>Badges:</Text>
        {program.badges.map((badge, index) => (
          <>
            <div key={index}>
              <Text b>• Name: </Text>
              <Text span> {badge.name}</Text>
              <br></br>
              <Text b>• Description: </Text>
              <Text span> {badge.description}</Text>
              <br></br>
              <Text b>• Badge ID: </Text>
              <Text span> {badge.badgeID}</Text>
              <Spacer y={1} />
            </div>
          </>
        ))}

        <Spacer y={1} />
        <Text h3>Missions:</Text>
        {program.missions.map((mission, index) => (
          <>
            <div key={index}>
              <Text b>• Name: </Text>
              <Text span> {mission.name}</Text>
              <br></br>
              <Text b>• Description: </Text>
              <Text span>{mission.description}</Text>
              <br></br>
              <Text b>• Mission ID:</Text>
              <Text span>{mission.missionID}</Text>
              <Spacer y={1} />
            </div>
          </>
        ))}

        <Spacer y={1} />
        <Text b>Created At:</Text>
        <Text span>{new Date(program.createdAt).toLocaleString()}</Text>
        <Text b>Updated At:</Text>
        <Text span>{new Date(program.updatedAt).toLocaleString()}</Text>
      </Card.Body>
    </Card>
  );
};

export default ProgramCard;
