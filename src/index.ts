import rest from './rest/rest'
import { join } from 'path/posix'
import autoload from '@fastify/autoload'
import 'dotenv/config'

console.log("Starting Server...")

const start = async () => {
    rest.register(require('@fastify/cors'))
    rest.register(autoload, { dir: join(__dirname, 'rest/modules'), options: { prefix: 'api/1' } })
    
    rest.listen(3001, '0.0.0.0', (err) => {
        if (err) throw err
        console.log("Sever Started Without Any Errors")
    })
}

start()