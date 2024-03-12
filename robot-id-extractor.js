import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import readlineSync from "readline-sync";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const url = readlineSync.question("Enter the URL to scrape: ");
  if (!url) {
    console.error("URL is required.");
    return;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Set viewport size to full screen
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Navigate to the specified URL
    await page.goto(url);

    // Request full screen
    await page.evaluate(() => {
      document.documentElement.requestFullscreen();
    });

    // Wait for page to load
    await delay(3000);

    // Ask whether to login
    const shouldLogin = readlineSync.question("Do you want to login? (Y/N): ");
    if (shouldLogin.toUpperCase() === "Y") {
      const shouldLoginStatic = readlineSync.question(
        "Do you want to login with Static? (Y/N): "
      );
      if (shouldLoginStatic.toUpperCase() === "Y") {
        const username = readlineSync.question("Enter your username: ");
        const password = readlineSync.question("Enter your password: ", {
          hideEchoBack: true,
        });

        // Fill and submit login form
        await page.type('input[name="username"]', username);

        await page.waitForSelector(`[data-id="login-continue-button"]`);
        await page.click(`[data-id="login-continue-button"]`);

        // Wait for user menu to load
        await delay(3000);

        await page.type('input[name="password"]', password);

        await page.waitForSelector(`[data-id="welcome-back-login-button"]`);
        await page.click(`[data-id="welcome-back-login-button"]`);

        await delay(3000);

        // Navigate to the specified URL
        await page.goto(url);

        // Request full screen
        await page.evaluate(() => {
          document.documentElement.requestFullscreen();
        });
      }

      const shouldLoginModal = readlineSync.question(
        "Do you want to login with Modal? (Y/N): "
      );
      if (shouldLoginModal.toUpperCase() === "Y") {
        const username = readlineSync.question("Enter your username: ");
        const password = readlineSync.question("Enter your password: ", {
          hideEchoBack: true,
        });

        await page.waitForSelector(`[data-id="header-user-menu-button"]`);
        await page.click(`[data-id="header-user-menu-button"]`);

        // Wait for user menu to load
        await delay(3000);

        // Fill and submit login form
        await page.type('input[name="username"]', username);

        await page.waitForSelector(`[data-id="login-popup-continue-button"]`);
        await page.click(`[data-id="login-popup-continue-button"]`);

        // Wait for user menu to load
        await delay(3000);

        await page.type('input[name="password"]', password);

        await page.waitForSelector(`[data-id="login-button"]`);
        await page.click(`[data-id="login-button"]`);

        await delay(3000);

        // Navigate to the specified URL
        await page.goto(url);

        // Request full screen
        await page.evaluate(() => {
          document.documentElement.requestFullscreen();
        });
      }
    }

    // Ask whether to click a button with specific data-id
    const buttonDataId = readlineSync.question(
      "Do you want to click a button with a specific data-id? (Y/N): "
    );
    if (buttonDataId.toUpperCase() === "Y") {
      const dataIdToClick = readlineSync.question(
        "Enter the data-id to click: "
      );
      if (!dataIdToClick) {
        console.error("Data-id is required.");
        return;
      }

      await page.waitForSelector(`[data-id="${dataIdToClick}"]`);
      await page.click(`[data-id="${dataIdToClick}"]`);

      // Wait for user menu to load
      await delay(3000);
    }

    // Extract data-ids
    const dataIds = await page.evaluate(() => {
      const elementsWithDataId = document.querySelectorAll("[data-id]");
      return Array.from(elementsWithDataId, (element) =>
        element.getAttribute("data-id")
      );
    });

    // Convert data-ids to text
    const resultText = dataIds.join("\n");

    // Get current directory
    const currentDirectory = process.cwd();

    // Create resources directory if not exists
    const resourcesDirectory = path.join(currentDirectory, "resources");
    if (!fs.existsSync(resourcesDirectory)) {
      fs.mkdirSync(resourcesDirectory);
    }

    // Extract filename from URL
    const pathname = new URL(url).pathname;
    const fileName = pathname.split("/").filter(Boolean).join("-");

    // Write data to file with filename.txt
    const filePath = path.join(resourcesDirectory, `${fileName}.txt`);
    fs.writeFileSync(filePath, resultText);

    console.log(`Result has been saved to ${filePath}`);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
