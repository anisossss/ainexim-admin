import type { NextPage } from "next";
import { StatsUsers } from "../../components/stats-users";
import { StatsResources } from "../../components/stats-resources";
import { LatestUsers } from "../../components/latest-users";

const Home: NextPage = () => {
  return (
    <>
      <StatsUsers />
      <StatsResources />
      <hr></hr>
      <br></br>
      <LatestUsers />
    </>
  );
};

export default Home;
