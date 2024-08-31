import React, { useContext } from "react";
import { Menu, Button, Text, rem } from "@mantine/core";
import { IconLogout, IconCopy, IconSelect } from "@tabler/icons-react";
import { shortAddress } from "../../utils/format/address.format";
import { copy } from "../../utils/copy-text";
import toast from "react-hot-toast";
import { ConnectWalletMetamask } from "./Modal";
import { MetamaskContext } from "../../context/MetamaskContext";

const ConnectWallet = () => {
  const { accountID } = useContext(MetamaskContext);
  return <>{!accountID ? <ConnectWalletMetamask /> : null}</>;
};

export const ConnectWalletWithDropDown = () => {
  const { accountID } = useContext(MetamaskContext);
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            rightSection={
              <IconSelect style={{ width: rem(17), height: rem(17) }} />
            }
          >
            {shortAddress(accountID)}
          </Button>
        </Menu.Target>

        <Menu.Dropdown bg={"white"} pt={"lg"}>
          <Menu.Item
            onClick={() => {
              copy(accountID);

              toast.success("Address Copied!", {
                duration: 2000,
                position: "bottom-right",
              });
            }}
            leftSection={
              <IconCopy style={{ width: rem(14), height: rem(14) }} />
            }
          >
            {shortAddress(accountID)}
          </Menu.Item>
          {/* <Menu.Divider /> */}

          {/* <Menu.Item
            onClick={disconnectMetamask}
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Disconnect
          </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ConnectWallet;
