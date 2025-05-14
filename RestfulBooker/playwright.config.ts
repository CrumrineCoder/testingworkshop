import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
//  reporter: "html",
  use: {
    baseURL: "https://restful-booker.herokuapp.com", // Set the base URL here
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
 /*   {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    }, */
  ],
});
