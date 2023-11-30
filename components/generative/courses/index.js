import React, { useState, useEffect } from "react";
import { CONSTANTS } from "../../../constants/index.js";
import axios from "axios";
import { Grid, Text } from "@nextui-org/react";
import CourseCard from "./course-card";

export const TableCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchcourses = async () => {
      try {
        var url = `${CONSTANTS.API_URL_PROD}/generation/get-web-courses`;
        const response = await axios.get(url);
        console.log("data", response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchcourses();
  }, []);

  return (
    <Grid
      css={{
        padding: "4%",
      }}
    >
      <Grid>
        <Text h3>Generated Web Development Courses</Text>
      </Grid>
      <Grid.Container gap={2}>
        {courses.map((course) => (
          <Grid md={6} key={course._id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid.Container>
    </Grid>
  );
};
