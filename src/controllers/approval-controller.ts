import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import approvalService from '@/services/approval-service';

export async function getApprovals(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await approvalService.getApprovals(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getApprovalById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  const newId = parseInt(id);
  try {
    await approvalService.getApprovalById(userId, newId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function updateApproval(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  const { status } = req.body;
  const newId = parseInt(id);
  try {
    await approvalService.updateApprovals(userId, newId, status);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
