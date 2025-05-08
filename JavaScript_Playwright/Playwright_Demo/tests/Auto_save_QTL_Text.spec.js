import { test, expect } from '@playwright/test';
import Utilitis from '../tests/Utilits/Utilitis.js';

async function login(page) {
  
  const medicalNote = new Utilitis();
  await medicalNote.MedicalNoteNavigation(page);

}

async function addAssessment(page) {
  // // Scroll down the page
  // await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  // console.log('Page scrolled down');
  
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

  console.log(await page.url()); // Check what page you're on
  await page.screenshot({ path: 'debug-click-fail.png', fullPage: true }); // Visual clue
  
  await page.waitForTimeout(15000);
  const element = page.locator('.medical-history-inner').first();
  await element.click();
  
  console.log('First element clicked');

  // Grab and verify the text content of the medical record
  const grabbedTextContent = await page.locator('.medical-history-inner__content').first().textContent();
  console.log(`Grabbed text content: ${grabbedTextContent}`);
  
  const expectedContent = "A paragraph is a distinct section of written text that develops a single idea or point.";
  await expect(grabbedTextContent).toContain(expectedContent);
}

test.only('Assessment Auto save using QTL', async ({ page }) => {
  await login(page);

  await addAssessment(page);

  await openMedicalRecordTab(page);
});
