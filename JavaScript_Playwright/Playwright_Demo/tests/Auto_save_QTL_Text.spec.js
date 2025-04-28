import { test, expect } from '@playwright/test';

const WAIT_FOR_PAGE_TIMEOUT = 30000;

async function login(page) {
  await page.goto('https://devv2.voyager.marsvh.com/medical-records/medical-history?entId=900001&bId=800002&ouId=c18c8e67-9606-7c63-9eed-71c33a9a4898&petId=bba0b6a6-da7a-4e0b-a7b4-5c783dca280b&patientId=980ba393-f7f8-43b8-aad3-b502d7cda2cf&accountId=b820ec11-472b-4cac-bf0b-500ad35b67a1');
  await page.waitForLoadState('domcontentloaded', { timeout: WAIT_FOR_PAGE_TIMEOUT });

  // Login
  await page.locator(`//input[@name='identifier']`).fill('suvetha.soundarajan@vca.com');
  await page.locator(`//input[@value='Next']`).press('Enter');
  await page.waitForLoadState('domcontentloaded', { timeout: WAIT_FOR_PAGE_TIMEOUT });

  await page.locator(`//input[@type='password']`).fill('MedicalRecord@1510');
  await page.locator(`//input[@value='Verify']`).press('Enter');
  await page.waitForLoadState('domcontentloaded', { timeout: WAIT_FOR_PAGE_TIMEOUT });

  await page.locator(`//input[@name ='credentials.answer']`).fill('Briyani');
  await page.locator(`//input[@data-type='save']`).press('Enter');
  await page.waitForLoadState('domcontentloaded', { timeout: WAIT_FOR_PAGE_TIMEOUT });
}

async function addMedicalNote(page) {
  // Add Medical Note
  await page.locator(`//span[text()=' ADD ']`).click();
  await page.locator(`//button[text()=' Medical Note ']`).click();
  await page.waitForLoadState('domcontentloaded', { timeout: WAIT_FOR_PAGE_TIMEOUT });
  
  // Verify the exam note was added
  const examNote = page.locator(`//span[text()='Exam Note']`);
  await expect(examNote).toBeVisible();
  console.log(`Exam Note is added`);
}

async function addAssessment(page) {
  // Scroll down the page
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  console.log('Page scrolled down');
  
  // Wait for the assessment text and click
  const addAssessmentLocator = page.locator(`//h3[text()=' Add Assessment ']`);
  await expect(addAssessmentLocator).toBeVisible();
  await addAssessmentLocator.click();

  // Select health concern: Wellness/Preventive Care
  const wellnessLocator = page.locator(`//span[text()=' Wellness/Preventive care ']`);
  await expect(wellnessLocator).toBeVisible();
  await wellnessLocator.click();

  // Add text in QTL input
  const content = "A paragraph is a distinct section of written text that develops a single idea or point. It typically consists of several sentences, often beginning on a new line with an indent, and focuses on a unified topic. Paragraphs help to organize and structure written work, making it easier for readers to follow the author's thoughts.";
  const editorLocator = page.locator(`//div[@id='richEditorHandle_rte-edit-view']`);
  await editorLocator.click();
  await editorLocator.fill(content);

  // Save and close
  const saveButtonLocator = page.locator(`//button[@class='mat-focus-indicator header-right-button lock-btn secondary-button mat-stroked-button mat-button-base']`);
  await saveButtonLocator.click();
}

async function openMedicalRecordTab(page) {
  const element = page.locator('.medical-history-inner').first();
  await element.click();
  console.log('First element clicked');
  
  // Grab and verify the text content of the medical record
  const grabbedTextContent = await page.locator('.medical-history-inner__content').textContent();
  console.log(`Grabbed text content: ${grabbedTextContent}`);
  
  const expectedContent = "A paragraph is a distinct section of written text that develops a single idea or point.";
  await expect(grabbedTextContent).toContain(expectedContent);
}

test('Assessment Auto save using QTL', async ({ page }) => {
  await login(page);
  
  await addMedicalNote(page);

  await addAssessment(page);

  await openMedicalRecordTab(page);
});
