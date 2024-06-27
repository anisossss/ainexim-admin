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
      <Sidebar collapsed={collapsed} css={{}}>
        <Flex direction={"column"} justify={"between"}>
          <Image
            src={"/logo/logo_footer.svg"}
            width={60}
            height={60}
            alt=""
            objectFit="contain"
          />
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
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/world/web/programs/create"
                }
                title="Create Programs"
                icon={<IoCreate color={"#697177"} size={25} />}
                href="/generative-ai/world/web/programs/create"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/world/web/programs"
                }
                title="List Web Development Programs"
                icon={<ReportsIcon />}
                href="/generative-ai/world/web/programs"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/world/web/teams/create"
                }
                title="Create Teams"
                icon={<IoCreate color={"#697177"} size={25} />}
                href="/generative-ai/world/web/teams/create"
              />
              <SidebarItem
                isActive={router.pathname === "/generative-ai/world/web/teams"}
                title="List Team"
                icon={<ReportsIcon />}
                href="/generative-ai/world/web/teams"
              />
              <hr></hr>
              PREWORLD
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/preworld/software-tests/generate"
                }
                title="Generate Software Tests"
                icon={<IoCreate color={"#697177"} size={25} />}
                href="/generative-ai/preworld/software-tests/generate"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/preworld/software-tests"
                }
                title="All Software Tests"
                icon={<ReportsIcon />}
                href="/generative-ai/preworld/software-tests"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/preworld/software-quizzes/generate"
                }
                title="Generate Software Quizzes"
                icon={<IoCreate color={"#697177"} size={25} />}
                href="/generative-ai/preworld/software-quizzes/generate"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/preworld/software-quizzes"
                }
                title="All Software Quizzes"
                icon={<ReportsIcon />}
                href="/generative-ai/preworld/software-quizzes"
              />
              <hr></hr>
              WORLD
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web/tasks/dev/generate"
                }
                title="Generate Web Coding Tasks"
                icon={<IoCreate color={"#697177"} size={25} />}
                href="/generative-ai/world/web/tasks/dev/generate"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/world/web/tasks/dev"
                }
                title="All Web Coding Tasks"
                icon={<ReportsIcon />}
                href="/generative-ai/world/web/tasks/dev"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web/tasks/quizzes/generate"
                }
                title="Generate Web Quizzes"
                icon={<IoCreate color={"#697177"} size={24} />}
                href="/generative-ai/world/web/tasks/quizzes/generate"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/world/web/tasks/quizzes"
                }
                title="All Web Quizzes"
                icon={<ReportsIcon />}
                href="/generative-ai/world/web/tasks/quizzes"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web/meetings/generate"
                }
                title="Generate Web Meetings"
                icon={<IoCreate color={"#697177"} size={24} />}
                href="/generative-ai/world/web/tasks/meetings/generate"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/world/web/tasks/meetings"
                }
                title="All Web Meetings"
                icon={<ReportsIcon />}
                href="/generative-ai/world/web/tasks/meetings"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web/problem-solving/generate"
                }
                title="Generate Web Problem Solving Tests"
                icon={<IoCreate color={"#697177"} size={24} />}
                href="/generative-ai/world/web/tasks/problem-solving/generate"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/world/web/tasks/problem-solving"
                }
                title="All Web Problem Solving Tests"
                icon={<ReportsIcon />}
                href="/generative-ai/world/web/tasks/problem-solving"
              />
              <hr></hr>
              GITHUB ACTIONS
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
              USERS MONITORING
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
