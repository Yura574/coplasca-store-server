import { Request } from 'express';
type UserType = {
  userId: string
  email: string
  login: string
  deviceId?: string
}

export type RequestType<P, B, Q> = Request<P, {}, B, Q> & { user?:UserType}

export type QueryType = {
  pageNumber?: number
  pageSize?: number | string
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}