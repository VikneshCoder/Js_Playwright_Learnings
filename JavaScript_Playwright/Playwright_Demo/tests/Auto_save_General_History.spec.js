import { test} from '@playwright/test';
import Utilitis from '../tests/Utilits/Utilitis.js';
 
test.use({viewport : { width: 1366, height: 768 }});
test('Assessment Auto save using QTL', async ({ page }) => {
    test.setTimeout(80000)

    const medicalNote = new Utilitis();
    await medicalNote.MedicalNoteNavigation(page);

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