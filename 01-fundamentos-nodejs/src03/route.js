import { Database } from './01-fundamentos-nodejs/src03/database.js';
import {randomUUID} from 'node:crypto'


const db = new Database

export const routes = [ // um array de rotas, onde cada rotas é um objeto
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const users = db.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const {name, email} = req.body
      const user = {
        id: randomUUID(),
        name, 
        email,
      }
        db.insert('users', user)
        return res.writeHead(201).end() 
    }
  }
]