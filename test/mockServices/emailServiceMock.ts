import { EmailService } from '../../src/features/auth/application/email.service';


export class EmailServiceMock extends EmailService{
  async sendMailConfirmation (email: string, code: string){
    return true
  }
  async sendEmailForRecoveryPassword(email: string, code: string){
    return true
  }
}