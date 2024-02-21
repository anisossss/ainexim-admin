import type { NextPage } from "next";
import { StatsUsers } from "../../components/stats-users";
import { StatsResources } from "../../components/stats-resources";
import { LatestUsers } from "../../components/latest-users";

const Home: NextPage = () => {
  return (
    <>
      <StatsUsers />
      <StatsResources />
      <br></br>

      <hr></hr>
      <LatestUsers />
    </>
  );
};

export default Home;
