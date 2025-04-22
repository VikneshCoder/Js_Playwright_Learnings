import { test, expect } from '@playwright/test';
import { exitCode } from 'process';
 
 
test.only('Auto save failed', async ({ page }) => {
 
    //Launch URL
    await page.goto('https://devv2.voyager.marsvh.com/medical-records/medical-history?entId=900001&bId=800002&ouId=c18c8e67-9606-7c63-9eed-71c33a9a4898&petId=bba0b6a6-da7a-4e0b-a7b4-5c783dca280b&patientId=980ba393-f7f8-43b8-aad3-b502d7cda2cf&accountId=b820ec11-472b-4cac-bf0b-500ad35b67a1');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
   
 
      //Login using Credentials
      await page.locator(`//input[@name='identifier']`).isVisible({ timeout: 10000 });
      await page.locator(`//input[@name='identifier']`).fill('Vikneshwaraj.M@VCA.com');
      await page.locator(`//input[@value='Next']`).press('Enter');
      await page.waitForLoadState('domcontentloaded');
 
      await page.locator(`//input[@type='password']`).isVisible({ timeout: 10000 });
      await page.locator(`//input[@type='password']`).fill('Phototest@1302');
      await page.locator(`//input[@value='Verify']`).press('Enter');
      await page.waitForLoadState('domcontentloaded');
 
      await page.locator(`//input[@name ='credentials.answer']`).isVisible({ timeout: 10000 });
      await page.locator(`//input[@name ='credentials.answer']`).fill('Photographer');
      await page.locator(`//input[@data-type='save']`).press('Enter');
      await page.waitForLoadState('domcontentloaded');
 
      //Add Medical Note
      await page.waitForLoadState(`networkidle`);
      await page.locator(`//span[text()=' ADD ']`).isVisible();
      await page.locator(`//span[text()=' ADD ']`).click();
 
      await expect(page.locator(`//button[text()=' Medical Note ']`)).toBeVisible();
      await page.locator(`//button[text()=' Medical Note ']`).click();
      await page.waitForLoadState('domcontentloaded');
 
      //Verify Exam Note added
      await expect(page.locator(`//span[text()='Exam Note']`)).toBeVisible();
      console.log(`Exam Note is added`);
 
     
    // Scroll down the page
    await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
    });
    console.log('Page scrolled down');
 
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

    // Scroll to the top
    await page.evaluate(() => {
      window.scrollTo(0, 0);
  });
  console.log('Page scrolled to top');  
 
    //wait idle till the auto save set config time without providing any input
    await page.waitForTimeout(15000);
    await page.pause();
 
    // Verify the auto save is getting Failed.
    const failedText = await page.locator(`//span[@class='saved-time']`).textContent();
    if (failedText){
      expect(failedText).toContain(" Autosave failed. Recent changes have not been saved. ");
      console.log("Auto save is failed successfull")
    }
    await page.pause();
});
  