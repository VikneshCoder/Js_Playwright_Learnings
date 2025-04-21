const {test, expect} = require("@playwright/test");

test("Basic URL lanching", async ({page})=>{
    await page.goto("https://devv2.voyager.marsvh.com/")
    console.log(await page.title())
    await expect(page).toHaveTitle("Voyager");
});
