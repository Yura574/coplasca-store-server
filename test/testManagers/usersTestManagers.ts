

import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

export class UsersTestManagers {
  constructor(protected app: INestApplication) {
  }

  async createUser(data: any, statusCode = HttpStatus.CREATED) {

    const res = await request(this.app.getHttpServer())
      .post(`/users`)
      .auth('admin', 'qwerty')
      .send(data)
      .expect(statusCode);
    return res.body;
  }

  async getUserById(id: string, httpStatus= HttpStatus.OK){
    const res = await request(this.app.getHttpServer())
      .get(`/users/${id}`)
      .expect(httpStatus)
    return res.body
  }
  async getUsers( httpStatus= HttpStatus.OK){
    const res = await request(this.app.getHttpServer())
      .get(`/users`)
      .expect(httpStatus)
    return res.body
  }
}