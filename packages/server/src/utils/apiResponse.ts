import { Response } from "express";

export const apiResponse = (response: Response, data: any, message: string, status: number = 200) => {
    response.status(status).send({
        message,
        data
    })
}