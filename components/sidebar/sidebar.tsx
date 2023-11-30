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
import { Text } from "@nextui-org/react";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <Box as="aside">
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}
      <Sidebar
        collapsed={collapsed}
        css={{
          height: "100%",
        }}
      >
        <Image
          src={"/logo/logo_footer.svg"}
          width={70}
          height={70}
          alt=""
          objectFit="contain"
        />

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
                Generative AI
              </Text>
              <hr></hr>
              <SidebarItem
                isActive={router.pathname === "/generative-ai/generate-modules"}
                title="Generate Modules"
                icon={<ReportsIcon />}
                href="/generative-ai/generate-modules"
              />
              <SidebarItem
                isActive={router.pathname === "/generative-ai/generate-courses"}
                title="Generate Courses"
                icon={<ReportsIcon />}
                href="/generative-ai/generate-courses"
              />
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/generate-missions"
                }
                title="Generate Missions"
                icon={<ReportsIcon />}
                href="/generative-ai/generate-missions"
              />
              <SidebarItem
                isActive={router.pathname === "/generative-ai/generate-tasks"}
                title="Generate Tasks"
                icon={<ReportsIcon />}
                href="/generative-ai/generate-tasks"
              />
              <SidebarItem
                isActive={router.pathname === "/generative-ai/task-validation"}
                title="Task Validation"
                icon={<ReportsIcon />}
                href="/generative-ai/task-validation"
              />
              <hr></hr>
              <Text span size="$md" color="gray">
                Web Development
              </Text>
              <hr></hr>
              <SidebarItem
                isActive={
                  router.pathname === "/generative-ai/generated/generated-tasks"
                }
                title="Generated Tasks"
                icon={<ReportsIcon />}
                href="/generative-ai/generated/generated-tasks"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/generated/generated-modules"
                }
                title="Generated Modules"
                icon={<ReportsIcon />}
                href="/generative-ai/generated/generated-modules"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/generated/generated-missions"
                }
                title="Generated Missions"
                icon={<ReportsIcon />}
                href="/generative-ai/generated/generated-missions"
              />
              <SidebarItem
                isActive={
                  router.pathname ===
                  "/generative-ai/generated/generated-courses"
                }
                title="Generated Courses"
                icon={<ReportsIcon />}
                href="/generative-ai/generated/generated-courses"
              />
            </SidebarMenu>
          </Sidebar.Body>
        </Flex>
      </Sidebar>
    </Box>
  );
};
