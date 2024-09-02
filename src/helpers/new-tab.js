import { testNetExplorerLink } from "../lib/constants";

export const openNewTab = (tx) => {
  setTimeout(() => {
    window.open(`${testNetExplorerLink}/tx/${tx}`, "_blank");
  }, 2000);
};
