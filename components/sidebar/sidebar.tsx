import React from "react";
import { Box } from "../styles/box";
import { Sidebar } from "./sidebar.styles";
import { Flex } from "../styles/flex";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { useRouter } from "next/router";
import Image from "next/image";
import { Text, Grid } from "@nextui-org/react";
import { IoCreate } from "react-icons/io5";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { IoGitCommitSharp } from "react-icons/io5";
import { GoGitPullRequest } from "react-icons/go";
import { GoOrganization } from "react-icons/go";
import { GoGitBranch } from "react-icons/go";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { RiUserLocationLine } from "react-icons/ri";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <Box as="aside">
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}
      <Sidebar
        collapsed={collapsed}
        css={{
          minHeight: "100%",
          overflowY: "scroll",
        }}
      >
        <Grid css={{ position: "absolute", top: 0 }}>
          <Image
            src={"/logo/logo_footer.svg"}
            width={50}
            height={0}
            alt=""
            objectFit="contain"
          />
        </Grid>
        <Flex direction={"column"} justify={"between"}>
          <Sidebar.Body className="body sidebar">
            <SidebarMenu title=" ">
              <SidebarItem
                title="Dashboard"
                icon={<HomeIcon />}
                isActive={router.pathname === "/dashboard"}
                href="/dashboard"
              />
              <SidebarItem
                isActive={router.pathname === "/waitlist"}
                title="Waitlist"
                icon={<AccountsIcon />}
                href="/waitlist"
              />
              <SidebarItem
                isActive={router.pathname === "/all-users"}
                title="All Users"
                icon={<AccountsIcon />}
                href="/all-users"
              />
              <SidebarItem
                isActive={router.pathname === "/orders"}
                title="Orders"
                icon={<PaymentsIcon />}
                href="/orders"
              />
              <SidebarItem
                isActive={router.pathname === "/requests"}
                title="Support Requests"
                icon={<ReportsIcon />}
                href="/requests"
              />
              <hr></hr>
              <Text span size="$md" color="gray">
                PREWORLD
              </Text>
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/preworld/generate-tests"
                }
                title="Generate Tests"
                icon={<IoCreate color={"#697177"} size={25} />}
                href="/generative-ai/preworld/generate-tests"
              />{" "}
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/preworld/generated/tests"
                }
                title="Generated Tests"
                icon={<ReportsIcon />}
                href="/generative-ai/preworld/generated/tests"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/preworld/generate-quizzes"
                }
                title="Generate Quizzes"
                icon={<IoCreate color={"#697177"} size={25} />}
                href="/generative-ai/preworld/generate-quizzes"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/preworld/generated/quizzes"
                }
                title="Generated Quizzes"
                icon={<ReportsIcon />}
                href="/generative-ai/preworld/generated/quizzes"
              />
              <hr></hr>
              <Text span size="$md" color="gray">
                WORLD
              </Text>
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web-development/generate-tasks"
                }
                title="Generate Web Tasks"
                icon={<IoCreate color={"#697177"} size={25} />}
                href="/generative-ai/world/web-development/generate-tasks"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web-development/generated/tasks"
                }
                title="Generated Web Tasks"
                icon={<ReportsIcon />}
                href="/generative-ai/world/web-development/generated/tasks"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web-development/generate-quizzes"
                }
                title="Generate Web Quizzes"
                icon={<IoCreate color={"#697177"} size={24} />}
                href="/generative-ai/world/web-development/generate-quizzes"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web-development/generated/quizzes"
                }
                title="Generated Web Quizzes"
                icon={<ReportsIcon />}
                href="/generative-ai/world/web-development/generated/quizzes"
              />
              <hr></hr>
              <Text span size="$md" color="gray">
                Github Actions
              </Text>
              <SidebarItem
                isActive={router.pathname === "/github/organization-projects"}
                title="Organization Projects"
                icon={<GoOrganization color={"#697177"} size={24} />}
                href="/github/organization-projects"
              />
              <SidebarItem
                isActive={router.pathname === "/github/repository-events"}
                title="Repository Events"
                icon={
                  <RiGitRepositoryCommitsLine color={"#697177"} size={24} />
                }
                href="/github/repository-events"
              />
              <SidebarItem
                isActive={router.pathname === "/github/branches-details"}
                title="Branches Details"
                icon={<GoGitBranch color={"#697177"} size={24} />}
                href="/github/branches-details"
              />
              <SidebarItem
                isActive={router.pathname === "/github/commits"}
                title="Commits History"
                icon={<IoGitCommitSharp color={"#697177"} size={24} />}
                href="/github/commits"
              />
              <SidebarItem
                isActive={router.pathname === "/github/pull-requests"}
                title="Pull Requests"
                icon={<GoGitPullRequest color={"#697177"} size={24} />}
                href="/github/pull-requests"
              />
              <SidebarItem
                isActive={router.pathname === "/github/user-events"}
                title="User Events"
                icon={<AiOutlineUserSwitch color={"#697177"} size={24} />}
                href="/github/user-events"
              />
              <hr></hr>
              <Text span size="$md" color="gray">
                Users Monitoring
              </Text>
              <SidebarItem
                isActive={router.pathname === "/monitoring/online-users"}
                title="Online Users"
                icon={<RiUserLocationLine color={"#697177"} size={24} />}
                href="/monitoring/online-users"
              />
              <SidebarItem
                isActive={router.pathname === "/monitoring/users-activity"}
                title="Users Activity"
                icon={<AiOutlineUserSwitch color={"#697177"} size={24} />}
                href="/monitoring/users-activity"
              />
            </SidebarMenu>
          </Sidebar.Body>
        </Flex>
      </Sidebar>
    </Box>
  );
};
