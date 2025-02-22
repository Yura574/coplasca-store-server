import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecoveryPassword, RecoveryPasswordDocument } from '../../../entity/recoveryPassword.entity';
import { Model } from 'mongoose';
import { RecoveryPasswordType } from '../api/models/types/recoveryPasswordType';


@Injectable()
export class RecoveryPasswordRepository {
  constructor(@InjectModel(RecoveryPassword.name) private recoveryPasswordModel: Model<RecoveryPasswordDocument>) {
  }

  async addUserRecoveryPassword(data: RecoveryPasswordType) {
    try {
      const recoveryPassword = await this.recoveryPasswordModel.create(data);
      await recoveryPassword.save();
    } catch (err) {
      console.log('validation error', err);
    }
  }

  async getUserRecoveryPassword(recoveryCode: string) {
    return this.recoveryPasswordModel.findOne({ recoveryCode });
  }

  async getUserRecoveryPasswordByEmail(email: string) {
    return this.recoveryPasswordModel.findOne({ email });
  }

  async deleteUserRecoveryPassword(recoveryCode: string) {
    return this.recoveryPasswordModel.deleteOne({ recoveryCode });
  }


}