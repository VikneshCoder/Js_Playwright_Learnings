import { LoginPage } from '../pageObjectModel/LoginPage.js';
import MedicalRecordpage from '../pageObjectModel/MedicalRecordPage.js';

class POManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.medicalRecordPage = new MedicalRecordpage(page);
    }
    getLoginPage(){
        return this.loginPage;
    }

    getMedicalRecordPage(){
        return this.medicalRecordPage;
    }

}

export default POManager;