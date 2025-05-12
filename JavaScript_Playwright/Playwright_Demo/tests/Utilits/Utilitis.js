import { expect } from '@playwright/test';
const WAIT_FOR_PAGE_TIMEOUT = 30000;

class Utilitis{
    
    async MedicalNoteNavigation(page){
        //Launch URL
        await page.goto("https://banfield-6001.qa2v2.voyager.marsvh.com/medical-records/medical-history?entId=900001&bId=800002&ouId=c18c8e67-9606-7c63-9eed-71c33a9a4898&petId=6dafeb77-a2fb-445e-8232-ba75a3d81efb&patientId=99f59687-ba10-4d50-ad87-e06013a4a964&accountId=772e03ee-624c-425b-b474-3e973ac06ffa");
        await page.waitForLoadState('networkidle');
        await page.waitForLoadState('domcontentloaded');
        await page.evaluate(() => {
          document.body.style.zoom = "75%";
        });
        

          //Login using Credentials
          await page.locator(`//input[@name='identifier']`).isVisible({ timeout: 10000 });
          await page.locator(`//input[@name='identifier']`).fill('Maruthupandi.Durai@vca.com');
          await page.locator(`//input[@value='Next']`).press('Enter');
          await page.waitForLoadState('domcontentloaded');
     
          await page.locator(`//input[@type='password']`).isVisible({ timeout: 10000 });
          await page.locator(`//input[@type='password']`).fill('Chennai@1639');
          await page.locator(`//input[@value='Verify']`).press('Enter');
          await page.waitForLoadState('domcontentloaded');

          const securityQuestion = await page.getByText("Verify it's you with a security method").textContent();
            if (await securityQuestion){
                console.log(`Security question is visible`);
                await page.locator("a[aria-label='Select Security Question.']").click();
            }
          await page.locator(`//input[@name ='credentials.answer']`).isVisible({ timeout: 10000 });
          await page.locator(`//input[@name ='credentials.answer']`).fill('keralam');
          await page.locator(`//input[@data-type='save']`).press('Enter');

          //Add Medical Note
          await page.waitForLoadState(`networkidle`);
          await page.locator(`//span[text()=' ADD ']`).isVisible();
          await page.locator(`//span[text()=' ADD ']`).click();
          
          
          await expect(page.locator(`//button[text()=' Medical Note ']`)).toBeVisible();
          await page.locator(`//button[text()=' Medical Note ']`).click();

          const existingNote = await page.getByText(" A medical note for the current time already exists.").isVisible();
          if (existingNote) {
              console.log(`Existing note is visible`);
              await page.getByRole('button', { name: ' Add Another ' }).click();
          }
     
          //Verify Exam Note added
          await page.waitForLoadState('networkidle');
          await page.waitForLoadState('domcontentloaded');
          await expect(page.locator(`//span[text()='Exam Note']`)).toBeVisible();
          console.log(`Exam Note is added`)
    }
}

export default Utilitis;