import { expect } from '@playwright/test';
class MedicalRecordpage{
    constructor(page){
        this.page = page;
        this.loadState = page.waitForLoadState('networkidle');
        this.loadState2 = page.waitForLoadState('domcontentloaded');
        this.addButton = page.locator(`//span[text()=' ADD ']`);
        this.addMedicalNoteButton = page.locator(`//button[text()=' Medical Note ']`);
        this.existingNote = page.getByText(" A medical note for the current time already exists. ");
        this.addAnotherButton = page.getByRole('button', { name: ' Add Another ' });
        this.examNote = page.locator(`//span[text()='Exam Note']`);
        this.selectPatientLocator = page.getByRole('link', { name: 'Automating Medical Note' })
        this.selectMedicalRecord = page.getByRole('button', { name: ' MEDICAL RECORD ' })

    }

    async addMedicalNote() {
        //Add Medical Note
        await this.page.goto("https://banfield-6001.qa2v2.voyager.marsvh.com/client-patient/client-search?entId=900001&bId=800002&ouId=c18c8e67-9606-7c63-9eed-71c33a9a4898");
        await this.selectPatientLocator.click(); 
        await this.loadState2;
        await this.selectMedicalRecord.click();
        await this.addButton.isVisible();
        await this.addButton.click();
        
        await expect(this.addMedicalNoteButton).toBeVisible();
        await this.addMedicalNoteButton.click();

        const ExitingNote = await this.existingNote.isVisible();
        console.log(`Existing note is visible: ${ExitingNote}`);
        if (ExitingNote) {
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