import { MiddlewareInterface } from '@domain/contract/http-router.contract';
import { ForbiddenError, UnauthorizedError } from '@domain/error/semantic.error';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export const authenticateMiddleware: MiddlewareInterface<[req: Request, res: Response, next: NextFunction]> = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(!token) {
    throw new UnauthorizedError()
  }

  jwt.verify(token, crypto.randomBytes(32).toString('hex'), (err) => {
    if(err) throw new ForbiddenError()

    next()
  })
}


