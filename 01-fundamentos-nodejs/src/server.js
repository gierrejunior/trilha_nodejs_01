// const http = require('http') // é um modulo interno do Nodejs

// Aplicações HTTp => APIs
// commoJs => Padrão de importação que usa o require, não é mt usado o mais usado agopra é o ESModules
// ESModules => import/export, por padrão no Node não suporta o ESModules, tem q colocar dentro do package.json o "type": "module" (fica o import parecido com do python)
// um modulo interno pode ser importado assim (import http from 'http'), porém para diferenciar o modulo interno do de terceiros, por convenção devemos importar assim:
// import http from 'node:http'

import http from 'node:http';

//MÉTODOS HTTP
//GET => Buscar um recurso do back-end
//POST => Criar um recurso no back-end
//PUT => Atualizar um recurso nop back-end
//PATCH => Atualizar uma informação específica de um recurso no back-end
//DELETE => Deletar um recurso no back-end

// as rotas se diferenciam pela soma do método HTTP e a URL
// Ou seja posso ter duas rotas /users uma sendo GET e a outra sendo POST
    // GET /users => Buscando usuários no backend
    // POST /users => Criar um usuário no back-end

/*
    app stateful => ela sempre vai ter algum tipo de informação guardada na memoria, 
    a aplicação depende de informações salvas na memoria.
    se a app for derrubada e eprder ops dados salvo em memorias, 
    ela pode funcionar diferente do que estava funcionando antes

    app stateless => não salva nada em memoria, geralmanete salva em dispositivos externos
    ex: BD, arquivos de textos
    independente se a app para e botar pra rodar denovo, ela continuará igual
*/

// Cabeçaçhos (Requisição/Resposta) => Metadados


const users =[]

const server = http.createServer((req, res) => { // Função anonima / req => request, res => response
    // const method = req.method  ou caso de desestrutarização pode ficar como const { method } = req
    // const url = req.url
    const { method, url} = req // msm coisa q method.req e url.req

    console.log(method, url)

    if (method === "GET" && url === ("/users")) {
        return res
        .setHeader("Content-type", "application/json") // enviando um Header no response informando que os dados esta no formato JSON
        .end(JSON.stringify(users)) // não é possivel enviar o array puro, por isso a necessidade de transformar em um JSON
    }

    if (method === "POST" && url === ("/users")) {
        users.push({
            id: 1,
            name: "John Doe",
            email : "johndoe@email.com",
        })
        return res.writeHead(201).end() // Retorna http status 201, sucesso em criar alguma coisa
    }


    return res.writeHead(404).end('Not Found') // Retorna http status 404
})

server.listen(3333) // o servidor http, ouvirá a porta localhost: 3333, aí toda vez q acessar oesse endereço ele cairá na função acima

console.log("servidor rodando")