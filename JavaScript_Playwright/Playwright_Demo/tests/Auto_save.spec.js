import { test} from '@playwright/test';
import Utilitis from '../tests/Utilits/Utilitis.js';
 
 test.use({viewport : { width: 1366, height: 768 }});
test('Assessment Auto save using QTL', async ({ page }) => {
    test.setTimeout(80000)

    const medicalNote = new Utilitis();
    await medicalNote.MedicalNoteNavigation(page);
     
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
 
    //wait idle till the auto save set config time without providing any input
    await page.waitForTimeout(30000);
    
    //Verify auto save
    const autoSaveTickSymbol = page.locator(`//mat-icon[text()='check_circle']`);
    const autoSaveTime = page.locator(`//span[@class='saved-time']`);
    if (await autoSaveTickSymbol.isVisible()) {
 
        console.log(`Auto save is done without any input provided, ${await autoSaveTime.innerText()}`);
    } else {
        console.log(`No auto save happened without any input provided`);
    }
});