import { Response } from "express";


export function ok(res:Response, obj:any) {
    res.status(200).json(obj);
}

export function success(res:Response, obj:any) {
    res.status(201).json(obj);
}

export function bad_req(res:Response, obj:any) {
    res.status(400).json(obj);
}

export function unauthorized(res:Response, obj:any) {
    res.status(401).json(obj);
}

export function no_access(res:Response, obj:any) {
    res.status(403).json(obj);
}
export function not_found(res:Response, obj:any) {
    res.status(404).json(obj);
}

export function server_error(res:Response, obj:any) {
    res.status(500).json(obj);
}