import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';
import { accessoryRouter, authenticationRouter, purchaseRouter, vendorRouter, approvalRouter } from '@/routers';
import { userRouter } from './routers/user-router';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/auth', authenticationRouter)
  .use('/purchase', purchaseRouter)
  .use('/vendor', vendorRouter)
  .use('/accessory', accessoryRouter)
  .use('/approval', approvalRouter)
  .use('/user', userRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
