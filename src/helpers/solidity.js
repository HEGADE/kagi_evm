import { solidityCompiler } from "@agnostico/browser-solidity-compiler";

export const compileCode = async ({ compilerVersion, sourceCode }) => {
  const output = await solidityCompiler({
    version: `https://binaries.soliditylang.org/bin/${compilerVersion}`,
    contractBody: sourceCode,
    options: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  });
  return output;
};
