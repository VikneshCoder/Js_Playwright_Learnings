import {expect, test} from '@playwright/test';
import POManager from '../pageObjectModel/POManager.js';


test.use({viewport : { width: 1366, height: 768 }});
test.use({ storageState: 'storageState.json' });
test('Assessment Auto save using QTL', async ({ page }) => {
    test.setTimeout(100000)

    const poManager = new POManager(page);
    // const loginPage = poManager.getLoginPage(page);
    // await loginPage.goToURL();
    // await loginPage.validLogin();
    const MedicalRecordPage = poManager.getMedicalRecordPage(page);
    await MedicalRecordPage.addMedicalNote();

    // Add Physical Exam from Side Sheet
    const OverallConditionLocator = page.locator("#physicalExamSectionBtn0");
    const categories = ["Responsiveness", "Mentation", "Life stage", "Procedure reports"];
    const selections = [1, 2, 4];

    // Loop through each category and select the corresponding items
    for (const category of categories) {
         // Adding a wait before clicking
        await OverallConditionLocator.click();
        await page.waitForTimeout(1000); // Adding a wait
        await page.getByText(category).click();
        for (const index of selections) {
            const length = page.locator("//div[@class='tab-content-right physical-exam']/ul/li");
            await length.nth(index).click()
        await page.waitForTimeout(1000);
    }
}

    // Adding one more physical exam
    const headLocator = page.locator("#physicalExamSectionBtn1");
    await headLocator.click();

    const headInputs = [
        { selector: "input[id='str1,0']", value: "FreeTextHead" },
        { selector: "div[id='fnd1,0,0']", value: "Free Text Head 01" },
        { selector: "div[id='fnd1,0,1']", value: "Free Text Head 02" },
        { selector: "div[id='fnd1,0,2']", value: "Free Text Head 03" },
        { selector: "div[id='fnd1,0,3']", value: "Free Text Head 04" },
        { selector: "div[id='fnd1,0,4']", value: "Free Text Head 05" },
    ];  

    for (const input of headInputs) {
        const element = page.locator(input.selector);
        await element.click();
        await element.fill(input.value);
        let result = page.locator(input.selector).textContent();
        await page.locator(".add-circle.add-finding").click();
        if (headInputs.selector != "input[id='str1,0']" & "div[id='fnd1,0,0']")  {
            expect(result).toContain(input.value);
        }
    }    
    console.log("Continuous load is not gets happening")
    await page.pause();
});
