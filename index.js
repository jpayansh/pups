const pupeteer = require("puppeteer");
const fs = require("fs/promises");

//to fetch img titles from the page
async function start1() {
  const browser = await pupeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://learnwebcode.github.io/practice-requests/");
  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info strong")).map(
      (x) => x.textContent
    );
  });
  await fs.writeFile("names.txt", names.join("\r\n"));
  await browser.close();
}
// start1();

//to get scshot of the page
async function start2() {
  const browser = await pupeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/JavaScript");
  await page.screenshot({ path: "sc.png", fullPage: true });
  await browser.close();
}
// start2();

//save image file to our drives
async function start3() {
  const browser = await pupeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://learnwebcode.github.io/practice-requests/");
  const photos = await page.$$eval("img", (imgs) => {
    return imgs.map((x) => x.src);
  });
  for (const photo of photos) {
    const imagePage = await page.goto(photo);
    await fs.writeFile(photo.split("/").pop(), await imagePage.buffer());
  }
  await browser.close();
}
// start3();

//to get a text which appear after clicking a btn
async function start4() {
  const browser = await pupeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://learnwebcode.github.io/practice-requests/");
  await page.click("#clickme");
  const clickedData = await page.$eval("#data", (e) => e.textContent);
  console.log(clickedData, " ==> Clicked text");
  await browser.close();
}
// start4();

//access to the text after filling out a form
async function start5() {
  const browser = await pupeteer.launch();
  const page = await browser.newPage();
  page.goto("https://learnwebcode.github.io/practice-requests/");
  await page.type("#ourfield", "blue");
  await Promise.all([page.click("#ourform button"), page.waitForNavigation()]);
  const info = await page.$eval("#message", (el) => el.textContent);

  console.log(info, "==> info after submitting form in new page");
  await browser.close();
}
// start5();
