import type { Config } from "@jest/types";
import "@testing-library/jest-dom";

export default async function (
  globalConfig: Config.GlobalConfig,
  projectConfig: Config.ProjectConfig
): Promise<void> {
  // Add any global mocks here
  jest.mock("node-fetch", () => ({
    default: jest.fn(),
  }));

  // You can add more setup logic here if needed

  console.log(`Jest setup loaded successfully`);
}
