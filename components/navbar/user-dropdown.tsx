import { Avatar, Dropdown, Navbar, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

export const UserDropdown = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.reload();
  };
  return (
    <Dropdown placement="bottom-right">
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar
            bordered
            zoomed
            as="button"
            size="md"
            src="/assets/avatar1.png"
          />
        </Dropdown.Trigger>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
        color="success"
      >
        <Dropdown.Item key="profile" css={{ height: "$18" }}>
          <Text b color="inherit" css={{ d: "flex" }}>
            Signed in as
          </Text>
          <Text b color="inherit" css={{ d: "flex" }}>
            admin@ainexim.com
          </Text>
        </Dropdown.Item>

        <Dropdown.Item key="logout" withDivider color="error">
          <Text b onClick={handleLogout} color="error">
            Logout
          </Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
