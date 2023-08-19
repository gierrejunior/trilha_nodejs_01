// É uma requsisição ficticia, enviando alguma informação pesada que tem que ser enviada aos poucos

import {Readable} from 'node:stream'
import {setTimeout} from 'node:timers'


class OneToHundredStream extends Readable { //A palavra-chave extends é usada para criar uma classe que herda propriedades e métodos de outra classe.
    index = 1

    _read() { // Método obrigatorio pra uma classe q herdou o Readable
        const i = this.index++ // o this. se assemelha ao self em python e o ++  equivale += 1 em python
        
        setTimeout(() => { //setTimeout é uma função global no Node.js que permite agendar a execução de uma função após um determinado período de tempo ter decorrido. Ele é usado para atrasar a execução de uma ação em um ambiente assíncrono
            if (i > 5) {
                this.push(null) // push é um método utilizado em uma readable stream fornecer informações para quem tiver consumindo ela
            } else {
                const buf = Buffer.from(String(i)) // convertendo para buffer, ams antes converte em uma string, ja q o buffer n aceita números
    
                this.push(buf)
            }
        }, 1000)// 1000 é em milisegundos ou seja equivale a 1 segundo
    }
}

/*

.then(response => { return response.text(); }): Após a requisição, esse trecho do código começa a tratar a resposta da requisição. 
A função .then() é usada para encadear ações a serem executadas quando a resposta da requisição estiver disponível. 
Nesse caso, estamos convertendo a resposta para texto usando response.text().

.then(data => { console.log(data); }): Após converter a resposta para texto, 
esse trecho do código trata os dados convertidos. A função .then() é usada novamente para encadear outra ação a 
ser executada quando os dados estiverem disponíveis. Nesse caso, estamos apenas imprimindo os dados no console.

Em termos gerais, o .then() é usado para lidar com operações assíncronas, como requisições de rede, que podem demorar um tempo para serem concluídas. 
Ele permite que você especifique o que fazer com os dados quando eles estiverem prontos, sem bloquear o restante do código.

*/

fetch('http://localhost:3335', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: "half"
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})