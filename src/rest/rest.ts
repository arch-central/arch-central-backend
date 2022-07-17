import Fastify, { FastifyReply } from 'fastify'
import fs from 'fs'
import path from 'path'

//Fastify

const rest = Fastify({
  logger: false
})

export default rest

//Rest Helper

/**
 * Verify if a query has all parameters
 * @param query to be verified
 * @param requiredSize the minimum query siz
 * @returns true if valid, otherwise returns false
 */
export const isQueryValid = (query: any, requiredSize: number) => {
    if (Object.keys(query).length < requiredSize)
        return false
    return true
}

/**
 * Verify a parameter
 * @param param the parameter to be checked
 * @param validation used to verify
 * @returns true if valid, otherwise returns false 
 */
export const isParameterValid = (param: string | number, validation: RegExp | string[]) => {
    if (Array.isArray(validation))
        return validation.findIndex(v => v == param) != -1
    else
        return validation.test(param.toString())
}

/**
 * Rest Send Wrap
 * @param reply the server reply
 * @param message the message to send
 * @param status the message status code
 */
 export const send = (reply: FastifyReply, message: string, status: number, data?: any) => {
    reply.send({
        message,
        status,
        ...(data &&  { data }),
        error: "none" //Needs a code to error convertor
    })
}

export const sendFile = (reply: FastifyReply, filePath: string) => {
    reply.type('image/png').send(fs.createReadStream(path.resolve(filePath)))
}
