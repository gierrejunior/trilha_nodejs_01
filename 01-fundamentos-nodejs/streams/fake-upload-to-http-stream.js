// É uma requsisição ficticia, enviando alguma informação pesada que tem que ser enviada aos poucos

import {Readable} from 'node:stream'
import {setTimeout} from 'node:timers'


class OneToHundredStream extends Readable { //A palavra-chave extends é usada para criar uma classe que herda propriedades e métodos de outra classe.
    index = 1

    _read() { // Método obrigatorio pra uma classe q herdou o Readable
        const i = this.index++ // o this. se assemelha ao self em python e o ++  equivale += 1 em python
        
        setTimeout(() => { //setTimeout é uma função global no Node.js que permite agendar a execução de uma função após um determinado período de tempo ter decorrido. Ele é usado para atrasar a execução de uma ação em um ambiente assíncrono
            if (i > 100) {
                this.push(null) // push é um método utilizado em uma readable stream fornecer informações para quem tiver consumindo ela
            } else {
                const buf = Buffer.from(String(i)) // convertendo para buffer, ams antes converte em uma string, ja q o buffer n aceita números
    
                this.push(buf)
            }
        }, 1000)// 1000 é em milisegundos ou seja equivale a 1 segundo
    }
}


// fetch api, serve para fazer requsisição
// Estamos enviando uma stream no body da requisição

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
})
