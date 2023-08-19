

import http from 'node:http';
import { json } from './middlewares/json.js'; // não esquece de especificar o formato do arquivo
import { Database } from './database.js';
import {randomUUID} from 'node:crypto'

// UUID => Universal Unique ID
// const users =[]

const db = new Database

const server = http.createServer(async(req, res) => { 

    const { method, url} = req 

    await json(req, res) // esta chamando a função json, que criamos la no middlewares


    if (method === "GET" && url === ("/users")) {

        const users = db.select('users')

        return res.end(JSON.stringify(users))
    }


    if (method === "POST" && url === ("/users")) {
        const {name, email} = req.body

        const user = {
            id: randomUUID(),
            name, 
            email,
        }

        db.insert('users', user)

        return res.writeHead(201).end() 
    }
    return res.writeHead(404).end('Not Found')
})


server.listen(3333)
console.log("servidor rodando")