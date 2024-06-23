import type { NextPage } from "next";
import { StatsUsers } from "../../components/stats-users";
import { StatsResources } from "../../components/stats-resources";
import { LatestUsers } from "../../components/latest-users";
import Meta from "../../components/seo";
import { Grid } from "@nextui-org/react";

const Home: NextPage = () => {
  return (
    <>
      <Meta
        title="Admin Dashboard - AINEXIM"
        description="AINEXIM, step into the future of virtual work experience."
        ogUrl="https://ainexim.com"
        thumbnail="https://i.postimg.cc/MKBWj4pd/thumbnail.png"
        keywords="AINEXIM, Virtual work"
      ></Meta>
      <Grid className="innerContainer">
        <StatsUsers />
        <StatsResources />

        <hr></hr>
        <LatestUsers />
      </Grid>
    </>
  );
};

export default Home;
