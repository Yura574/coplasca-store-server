import { Request } from 'express';
type UserType = {
  userId: string
  email: string
  login: string
}

export type RequestType<P, B, Q> = Request<P, {}, B, Q> & { user?:UserType}

export type QueryType = {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}