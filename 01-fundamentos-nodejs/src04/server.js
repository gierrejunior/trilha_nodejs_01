import http from 'node:http';
import { json } from './middlewares/json.js'; 
import { routes } from './route.js';
import { extractQueryParams } from './utils/extract-query-params.js';


const server = http.createServer(async(req, res) => { 

  const { method, url} = req 
  await json(req, res) 

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const {query, ...params} = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    req.params = { ...routeParams.groups}
    //Está criando uma cópia independente do objeto routeParams.group usando o operador de propagação (...). 
    // Isso é feito para garantir que as modificações feitas em params não afetem o objeto original routeParams.group

    return route.handler(req, res);
  }

  return res.writeHead(404).end('Not Found')
})


server.listen(3333)
console.log("servidor rodando")

