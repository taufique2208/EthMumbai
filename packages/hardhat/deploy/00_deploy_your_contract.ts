import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployTestEvaluation: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;

  // Deploy TestEvaluation contract
  await deploy("TestEvaluation", {
    from: (await hre.getNamedAccounts()).deployer,
    log: true,
  });
};

export default deployTestEvaluation;
