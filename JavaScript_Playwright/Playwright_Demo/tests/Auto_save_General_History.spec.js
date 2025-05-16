import {test} from '@playwright/test';
import POManager from '../pageObjectModel/POManager.js';
import { skip } from 'node:test';
 
// test.describe.configure({ mode: 'parallel' });
test.use({viewport : { width: 1366, height: 768 }});
test.use({ storageState: 'storageState.json' });
test(`General History Free text Auto save using QTL`, async ({ page }) => {
    test.setTimeout(100000);

    const poManager = new POManager(page);
    // const loginPage = poManager.getLoginPage(page);
    // await loginPage.goToURL();
    // await loginPage.validLogin();
    const MedicalRecordPage = poManager.getMedicalRecordPage(page);
    await MedicalRecordPage.addMedicalNote();

    // Add General History from Side Sheet
    const generalhistoryLocator = page.locator(".patient-history-form-heading");
    await generalhistoryLocator.click();
    await page.getByText("Activity and exercise history").click();
    await page.getByText("Agility activity").click();
    await page.getByText("Lethargy").click();

    // // Adding one more general history
    // await generalhistoryLocator.click();
    // await page.getByText("Travel history").click();
    // await page.getByText("Traveled outside the state").click();
    // await page.getByText("Travels regularly").click();

    // await page.waitForTimeout(30000);

    // // Enter free text in General History
    // const freeText = "This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work. This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work.This practice lesson consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for writing essays, reports, emails, and more for school and work."
    // await generalhistoryLocator.click();
    // await generalhistoryLocator.pressSequentially(freeText);

    // Click on Save and close button
    await page.getByText(" SAVE & CLOSE ").click();
    const now = new Date();

    // Get PST time using toLocaleString with timeZone
    const pst = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

    const day = pst.getDate().toString().padStart(2, '0');
    const month = pst.toLocaleString('en-US', { month: 'short' });
    const year = pst.getFullYear();

    let hours = pst.getHours() % 12 || 12; // convert to 12-hour format
    hours = hours.toString().padStart(2, '0');
    const minutes = pst.getMinutes().toString().padStart(2, '0');

    const formatted = `${day}-${month}-${year} ${hours}:${minutes}`;
    console.log(formatted);


    await page.getByText(formatted).click();

    await page.pause();

});