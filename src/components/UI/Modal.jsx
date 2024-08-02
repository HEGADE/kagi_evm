import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Group } from "@mantine/core";

import { Image } from "@mantine/core";
import { authenticate } from "./ConnectWallet";

export const ModalMantine = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const connect = () => {
    authenticate();
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        size={"md"}
        onClose={close}
        title="Select Chain"
        centered
      >
        <main
          style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem",

            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Group
              style={{
                width: "50%",
              }}
            >
              <Button
                onClick={connect}
                style={{
                  width: "100%",
                  background: "black",
                }}
              >
                Stacks
                <span
                  style={{
                    margin: "0 0 0 1rem",
                  }}
                >
                  <Image
                    w={"30"}
                    h={"30"}
                    src={
                      "https://assets.coingecko.com/coins/images/2069/standard/Stacks_Logo_png.png?1709979332"
                    }
                  />
                </span>
              </Button>
            </Group>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Group
              style={{
                width: "50%",
              }}
            >
              <Button
                onClick={handleRefresh}
                style={{
                  width: "100%",
                  background: "black",
                }}
              >
                Merlin Chain
                <span
                  style={{
                    margin: "0 0 0 1rem",
                  }}
                >
                  <Image
                    w={"30"}
                    h={"30"}
                    src={
                      "https://assets.coingecko.com/coins/images/37118/standard/merlin.jpeg?1713352230"
                    }
                  />
                </span>
              </Button>
            </Group>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Group
              style={{
                width: "50%",
              }}
            >
              <Button
                onClick={handleRefresh}
                style={{
                  width: "100%",
                  background: "black",
                }}
              >
                Mintlayer
                <span
                  style={{
                    margin: "0 0 0 1rem",
                  }}
                >
                  <Image
                    w={"30"}
                    h={"30"}
                    src={
                      "https://assets.coingecko.com/coins/images/29454/standard/mintlayer-icon-coingecko200x200.png?1696528401"
                    }
                  />
                </span>
              </Button>
            </Group>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Group
              style={{
                width: "50%",
              }}
            >
              <Button
                onClick={handleRefresh}
                style={{
                  width: "100%",
                  background: "black",
                }}
              >
                Elastos
                <span
                  style={{
                    margin: "0 0 0 1rem",
                  }}
                >
                  <Image
                    w={"30"}
                    h={"30"}
                    src={
                      "https://assets.coingecko.com/coins/images/2780/standard/Elastos.png?1696503549"
                    }
                  />
                </span>
              </Button>
            </Group>
          </div>
        </main>
      </Modal>

      <Button onClick={open}>Connect</Button>
    </>
  );
};
