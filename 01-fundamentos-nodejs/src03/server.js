import http from 'node:http';
import { json } from './middlewares/json.js'; 
import { routes } from '../../route.js';

/*
FORMAS DO FRONTEND ENVIAR SOLICITAÇÕES:

1. Query Parameters: URL stateful => Filtros, paginação, não-obrigatórios => ficam na URL
2. Route Parameters: identificação de recursos => ficam na URL
3. Request body: envio de informações de um formulário (HTTP) + mais seguro

Obs: Nenhuma informação sensível deve ser enviada via Query Parameters ou Route Parameters.

1. Query Parameters:
  São parâmetros nomeados que são enviados na própria URL da requisição.
  Exemplo:
    http://localhost:3333/users?userID=1&name=Gierre

2. Route Parameters:
  São parâmetros não nomeados que também são enviados no endereço da requisição.
  Eles não precisam ser nomeados, pois o método HTTP já indica o que o valor significa.
  Exemplos:
    GET http://localhost:3333/users/1
    DELETE http://localhost:3333/users/1

3. Request Body:
  Utilizado para enviar dados complexos ou grandes para o servidor.
  Útil ao criar ou atualizar recursos, pode ser em formatos como JSON ou XML.
  Exemplo:
  - Enviando um formulário para criar novo usuário:
  ```javascript
  fetch('http://localhost:3333/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'user123', email: 'user@example.com' })
  });

*/


const server = http.createServer(async(req, res) => { 

  const { method, url} = req 

  await json(req, res) 

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end('Not Found')
})


server.listen(3333)
console.log("servidor rodando")

/*
const route = ...: Cria uma constante chamada route que vai armazenar o resultado da busca na array routes.

routes.find(...): Utiliza o método find() em uma array chamada routes. O método find() é usado para buscar o 
primeiro elemento na array que satisfaça a condição especificada.

route => { ... }: Isso é uma função anônima que será usada como critério para a busca. 
A função recebe cada elemento da array routes como argumento e retorna true ou false com base em algumas condições.

route.method === method: Compara a propriedade method de um elemento da array routes com o valor da variável method. 
Isso verifica se o método HTTP do elemento da rota coincide com o método atual sendo verificado.

route.path === url: Compara a propriedade path de um elemento da array routes com o valor da variável url. 
Isso verifica se o caminho da rota coincide com o URL atual sendo verificado.

&&: O operador lógico "AND" (&&) combina as duas condições anteriores. Isso significa que a função de busca só 
retornará true se ambos os critérios (method e path) forem atendidos.

return ...;: A função de busca retorna o resultado da comparação usando return.

Finalmente, o resultado da busca é atribuído à constante route. Se um elemento na array routes satisfizer 
as condições (ou seja, se method e url coincidirem), a constante route conterá esse elemento. Caso contrário, route será undefined.
*/