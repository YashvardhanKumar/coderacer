import { Response } from "express";
import { no_access, ok, server_error, success, unauthorized } from "./errorcodes";

export async function addSuccessWrapper(
  res: Response,
  obj: any,
  error?: string
) {
  try {
    success(res, obj);
  } catch (err) {
    server_error(res, error || (err as any).message);
  }
}

export async function okWrapper(
  res: Response,
  obj: any,
  error?: string
) {
  try {
    ok(res, obj);
  } catch (err) {
    server_error(res, error || (err as any).message);
  }
}

export async function authWrapper(
    res: Response,
    obj: any,
    error?: string
  ) {
    try {
      ok(res, obj);
    } catch (err) {
      unauthorized(res, error || (err as any).message);
    }
  }

  export async function denyAccessWrapper(
    res: Response,
    obj: any,
    error?: string
  ) {
    try {
      ok(res, obj);
    } catch (err) {
      no_access(res, error || (err as any).message);
    }
  }
