import http from 'node:http'
import { escape } from 'node:querystring'


// caso onde é necessario aguardar o upload de toda informação antes de trabalhar com eles

/* 

for await: Esta é uma forma especial de um loop for que é usado quando você deseja percorrer 
elementos de uma sequência assíncrona, como uma stream que gera dados ao longo do tempo.

const chunk of req: Isso define uma variável chamada chunk que irá conter cada pedaço (ou "chunk") 
de dados da sequência req. O of aqui indica que estamos iterando sobre os elementos dentro de req.

buffers.push(chunk): Em cada iteração do loop, o chunk (pedaço de dados) é adicionado a um array chamado buffers.
Isso é feito usando o método .push(), que adiciona o chunk ao final do array. -> .push() seria o .append() no python

O método .concat() é uma função em JavaScript (e Node.js) que é usada para concatenar arrays ou buffers. 
Isso significa que ele combina os elementos de dois ou mais arrays (ou buffers) em um único array (ou buffer) resultante.

*/

const server = http.createServer(async(req,res) => { // toda vez q for usar wait em uma função, a funçaõ superior a ela precisa do async
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()// concatena o array buffers, transforma em buffer e depois convert pra string

    console.log(fullStreamContent)

    return res.end(fullStreamContent)
})


server.listen(3335)