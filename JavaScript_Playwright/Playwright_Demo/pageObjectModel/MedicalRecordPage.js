import { expect } from '@playwright/test';
class MedicalRecordpage{
    constructor(page){
        this.page = page;
        this.loadState = page.waitForLoadState('networkidle');
        this.loadState2 = page.waitForLoadState('domcontentloaded');
        this.addButton = page.locator(`//span[text()=' ADD ']`);
        this.addMedicalNoteButton = page.locator(`//button[text()=' Medical Note ']`);
        this.existingNote = page.getByText(" A medical note for the current time already exists.");
        this.addAnotherButton = page.getByRole('button', { name: ' Add Another ' });
        this.examNote = page.locator(`//span[text()='Exam Note']`);

    }

    async addMedicalNote() {
        //Add Medical Note
        await this.addButton.isVisible();
        await this.addButton.click();
        
        
        await expect(this.addMedicalNoteButton).toBeVisible();
        await this.addMedicalNoteButton.click();

        const existingNote = await this.existingNote.isVisible();
        if (existingNote) {
            console.log(`Existing note is visible`);
            await this.addAnotherButton.click();
        }
    
        //Verify Exam Note added
        await this.loadState;
        await this.loadState2;
        await expect(this.examNote).toBeVisible();
        console.log(`Exam Note is added`)
    }
}

export default MedicalRecordpage;