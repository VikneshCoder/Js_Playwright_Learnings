const loginData = JSON.parse(JSON.stringify(require("../Utils/loginTestDate.json")))   // Covert JSON file to JS object

class LoginPage{
    constructor(page){
        this.page = page;
        this.loadState = page.waitForLoadState('networkidle');
        this.loadState2 = page.waitForLoadState('domcontentloaded');
        this.usernameLocator = page.locator(`//input[@name='identifier']`);
        this.userEnterButton = page.locator(`//input[@value='Next']`);
        this.passwordLocator = page.locator(`//input[@type='password']`);
        this.passwordEnterButton = page.locator(`//input[@value='Verify']`)
        this.securityQuestion = page.getByText("Verify it's you with a security method");
        this.securityQuestionLocator = page.locator("a[aria-label='Select Security Question.']");
        this.securityInputLocator = page.locator(`//input[@name ='credentials.answer']`);
        this.securityEnterButton = page.locator(`//input[@data-type='save']`);
    }

async goToURL(){
        await this.page.goto("https://banfield-6001.qa2v2.voyager.marsvh.com/medical-records/medical-history?entId=900001&bId=800002&ouId=c18c8e67-9606-7c63-9eed-71c33a9a4898&petId=6dafeb77-a2fb-445e-8232-ba75a3d81efb&patientId=99f59687-ba10-4d50-ad87-e06013a4a964&accountId=772e03ee-624c-425b-b474-3e973ac06ffa");
        await this.loadState;
        await this.loadState2;
}

async validLogin(){
        //Login using Credentials
        await this.usernameLocator.isVisible({ timeout: 10000 });
        await this.usernameLocator.fill(loginData.Username);
        await this.userEnterButton.press('Enter');
        await this.loadState;

        await this.passwordLocator.isVisible({ timeout: 10000 });
        await this.passwordLocator.fill(loginData.Password);
        await this.passwordEnterButton.press('Enter');
        await this.loadState;

        const securityQuestion = await this.securityQuestion.textContent();
        if (await securityQuestion){
            console.log(`Security question is visible`);
            await this.securityQuestionLocator.click();
        }
        await this.securityInputLocator.isVisible({ timeout: 10000 });
        await this.securityInputLocator.fill(loginData.Security);
        await this.securityEnterButton.press('Enter');
        await this.loadState;
}
}
module.exports = {LoginPage};

