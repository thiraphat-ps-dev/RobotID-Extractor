import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // กำหนดขนาดหน้าจอให้เต็มจอ
  await page.setViewport({
    width: 1920, // ความกว้างของหน้าจอเต็มจอ
    height: 1080, // ความสูงของหน้าจอเต็มจอ
    deviceScaleFactor: 1, // อัตราส่วนของหน้าจอ 1x, 2x, 3x, ...
  });

  await page.goto("http://localhost:3000");

  // full screen
  await page.evaluate(() => {
    document.documentElement.requestFullscreen();
  });

  // // รอให้หน้าเว็บโหลดเสร็จสมบูรณ์
  // await page.waitForNavigation();

  // รอให้หน้าเว็บโหลดหรือกระทำตามที่คุณต้องการ
  await page.evaluate(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000); // รอให้เวลาผ่านไป 2 วินาที (2000 มิลลิวินาที)
    });
  });

  await page.waitForSelector('[data-id="header-user-menu-button"]'); // กดปุ่ม User Menu

  // คลิกปุ่มหรือทำการกระทำใด ๆ ที่ต้องการ
  await page.click('[data-id="header-user-menu-button"]');

  // รอให้หน้าเว็บโหลดหรือกระทำตามที่คุณต้องการ
  await page.evaluate(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000); // รอให้เวลาผ่านไป 2 วินาที (2000 มิลลิวินาที)
    });
  });

  // ใช้ evaluate เพื่อ execute JavaScript ภายใน browser
  const dataIds = await page.evaluate(() => {
    const elementsWithDataId = document.querySelectorAll("[data-id]");
    const dataIds = [];
    elementsWithDataId.forEach((element) => {
      dataIds.push(element.getAttribute("data-id"));
    });
    return dataIds;
  });

  // แปลงข้อมูลเป็นข้อความ
  const resultText = dataIds.join("\n");

  // เขียนข้อมูลลงในไฟล์ txt
  fs.writeFileSync("data-id.txt", resultText);

  console.log("Result has been saved to data-id.txt");

  await browser.close();
})();
