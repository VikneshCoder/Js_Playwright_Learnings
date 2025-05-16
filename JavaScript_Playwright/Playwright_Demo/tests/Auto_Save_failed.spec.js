import {test} from '@playwright/test';
import POManager from '../pageObjectModel/POManager.js';

test.use({viewport : { width: 1366, height: 768 }});
test.use({ storageState: 'storageState.json' });
test('Auto save failed', async ({ page }) => {
    test.setTimeout(80000)
 
    const poManager = new POManager(page);
    // const loginPage = poManager.getLoginPage(page);
    // await loginPage.goToURL();
    // await loginPage.validLogin();
    const MedicalRecordPage = poManager.getMedicalRecordPage(page);
    await MedicalRecordPage.addMedicalNote();
 
    //Wait for the assessment text to be visible
    await page.locator(`//h3[text()=' Add Assessment ']`).isVisible();
    console.log(`Assessment text is visible`);
 
    //Add Assessment
    await page.locator(`//h3[text()=' Add Assessment ']`).click();
   
    //Select health concern Wellness/Preventive Care
    const wellnessLocator = page.locator(`//span[text()=' Wellness/Preventive care ']`);
    await wellnessLocator.isVisible();
    await wellnessLocator.click();
 
    //click on assessment input field
    await page.locator(`//div[@id="richEditorHandle_rte-edit-view"]`).click();
    await page.locator(`//div[@id="richEditorHandle_rte-edit-view"]`).fill("Auto save is getting failed");

    // Click on Close button
    await page.locator(`//span[normalize-space()='Close']`).click();

    // Click on Assessment 
    await page.locator(`//p[@class='healthConcern-View-revamp filter-health-concern']`).click();
    await page.locator(`//mat-icon[normalize-space()='cancel']`).click();
    console.log("Health Concern gets removed")

    console.log('Page scrolled to top');  
 
    //wait idle till the auto save set config time without providing any input
    await page.waitForTimeout(30 * 1000);
 
    // Verify the auto save is getting Failed.
    const failedText = await page.locator(`//span[@class='saved-time']`).textContent();
    console.log(`Auto save is failed and the test is ${failedText}`)
    if (failedText){
      expect(failedText).toContain(" Autosave failed. Recent changes have not been saved. ");
      console.log("Auto save Failed test case is executed")
    }
    await page.pause();
});
  