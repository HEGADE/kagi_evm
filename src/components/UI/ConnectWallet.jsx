import React from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { Menu, Button, Text, rem } from "@mantine/core";
import { IconLogout, IconCopy, IconSelect } from "@tabler/icons-react";
import { shortAddress } from "../../utils/format/address.format";
import { useStacks } from "../../providers/StacksProvider";
import { copy } from "../../utils/copy-text";
import toast from "react-hot-toast";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export function disconnect() {
  userSession.signUserOut("/");
}

export function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks React Starter",
      icon: window.location.origin + "/logo512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}
const ConnectWallet = () => {
  return (
    <>
      {!userSession.isUserSignedIn() ? (
        <button
          className="button primary wallet-connect"
          onClick={authenticate}
        >
          Connect Wallet
        </button>
      ) : null}
    </>
  );
};

export const ConnectWalletWithDropDown = () => {
  const { address } = useStacks();
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            rightSection={
              <IconSelect style={{ width: rem(17), height: rem(17) }} />
            }
          >
            {shortAddress(address)}
          </Button>
        </Menu.Target>

        <Menu.Dropdown bg={"white"} pt={"lg"}>
          <Menu.Item
            onClick={() => {
              copy(address);

              toast.success("Address Copied!", {
                duration: 2000,
                position: "bottom-right",
              });
            }}
            leftSection={
              <IconCopy style={{ width: rem(14), height: rem(14) }} />
            }
          >
            {shortAddress(address)}
          </Menu.Item>
          <Menu.Divider />

          <Menu.Item
            onClick={disconnect}
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Disconnect
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ConnectWallet;
