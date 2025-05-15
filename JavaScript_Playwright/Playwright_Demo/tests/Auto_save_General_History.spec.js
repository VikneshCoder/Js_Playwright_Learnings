import {test} from '@playwright/test';
import POManager from '../pageObjectModel/POManager.js';
 
// test.describe.configure({ mode: 'parallel' });
test.use({viewport : { width: 1366, height: 768 }});
test(`@regression General History Free text Auto save using QTL`, async ({ page }) => {
    test.setTimeout(80000)

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage(page);
    await loginPage.goToURL();
    await loginPage.validLogin();
    const MedicalRecordPage = poManager.getMedicalRecordPage(page);
    await MedicalRecordPage.addMedicalNote();

    // Add General History from Side Sheet
    const generalhistoryLocator = page.locator(".patient-history-form-heading");
    await generalhistoryLocator.click();
    await page.getByText("Activity and exercise history").click();
    await page.getByText("Agility activity").click();
    await page.getByText("Lethargy").click();

    // Adding one more general history
    await generalhistoryLocator.click();
    await page.getByText("Travel history").click();
    await page.getByText("Traveled outside the state").click();
    await page.getByText("Travels regularly").click();

    await page.pause();


});