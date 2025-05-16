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
        this.banfieldLocator = page.locator('a[routerlink="/dashboard"]').filter({hasText: 'Banfield'});
        this.bu6001Locator = page.locator('div.ou-id').filter({hasText: '6001'});
    }

async goToURL(){
        await this.page.goto("https://qa2v2.voyager.marsvh.com/");
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

        await this.loadState2;
        //Click on Banfield
        await this.banfieldLocator.click();
        await this.loadState2;
        await this.bu6001Locator.click();
        await this.loadState2;

        await this.page.context().storageState({ path: 'storageState.json' });
        console.log('session stored successfully');
    }
}
module.exports = {LoginPage};