import {expect, test} from '@playwright/test';
import POManager from '../pageObjectModel/POManager.js';
import { skip } from 'node:test';
 
// test.describe.configure({ mode: 'parallel' });
test.use({viewport : { width: 1366, height: 768 }});
test.use({ storageState: 'storageState.json' });
test.only(`General History Free text Auto save using QTL`, async ({ page }) => {
    test.setTimeout(200000);

    const poManager = new POManager(page);
    // const loginPage = poManager.getLoginPage(page);
    // await loginPage.goToURL();
    // await loginPage.validLogin();
    const MedicalRecordPage = poManager.getMedicalRecordPage(page);
    await MedicalRecordPage.addMedicalNote();


    // Add General History from Side Sheet
    const generalhistoryLocator = page.locator(".patient-history-form-heading");
    await generalhistoryLocator.click();

    const exciseHistory  = [
        "Activity and exercise history",
        "Agility activity",
        "Lethargy"
    ]
      for (const options of exciseHistory) {
        await page.getByText(options).click();
    }

    // Adding one more general history
    await generalhistoryLocator.click();
    const travelOptions = [
        "Travel history",
        "Traveled outside the state",
        "Travels regularly"
    ];
    for (const option of travelOptions) {
        await page.getByText(option).click();
    }

    await page.waitForTimeout(30000);

    // Enter free text in General History
    const freeText = "This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work. This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work."
    await generalhistoryLocator.click();
    await generalhistoryLocator.pressSequentially(freeText);

    // Click on Save and close button
    await page.getByText(" SAVE & CLOSE ").click();

    // Navigating to the Medical History tab
    await page.getByText(" Exam Note: Exam Note ").first().click();
    let medicalHistory = await page.locator(".medical-history-inner__content.ng-star-inserted").first();
    let medicalHistoryText = await medicalHistory.textContent();
    console.log(`Medical History text: ${medicalHistoryText}`);



});