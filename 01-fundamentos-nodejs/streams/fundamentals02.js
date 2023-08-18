// construindo streams

import {Readable, Writable, Transform }  from 'node:stream'
import { setTimeout } from 'node:timers'

// Toda stream readable, possui um método obrigatório, que é o método "_read"
// a stream abaixo é uma stream de leitura
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


class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback) { // Método obrigatorio pra uma classe q herdou o Transform
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed))) // o primeiro parametro de um callback é o erro, se n houve erro, retorna null
    }
}



// _write método de uma classe que herdou o Writable, sempre recebe 3 parametros chunk, encoding, callback
// chunk => é o "pedaço" que vem pela stream;
// encoding => é como a informação está codificada;
// callback => é uma função que a stream de escrita tem que chamar quando ela terminou.
// em uma stream de escrita, ela nunca retorna nada, ela só processa o dado, ela nunca vai transforma o dado em alguma outra coisa, vai apena processar o dado
class MultiplyByTenStream extends Writable{ //A palavra-chave extends é usada para criar uma classe que herda propriedades e métodos de outra classe.
    _write(chunk, encoding, callback){// Método obrigatorio pra uma classe q herdou o Writable
        console.log(Number(chunk.toString())*10) // transforma o chunk em uma string, depois converte em number e depois multiplica por 10 e printa isso na tela
        callback()
    }
}




//new OneToHundredStream().pipe(process.stdout) //está criando uma nova instância da classe OneToHundredStream e, em seguida, chamando o método .pipe() dessa instância, redirecionando a saída da stream para process.stdout (a saída padrão do console).
// ja é possivel mostrar os dados de dentro da stream, antes mesmo dos dados está completo
// o req e o res são streams nativamente

// new OneToHundredStream().pipe(new MultiplyByTenStream)

new OneToHundredStream() // stream de leitura => só ler dados
    .pipe(new InverseNumberStream()) // stream de transformação => precisa ler dados de algum lugar e escrever dados pra outro lugar => stream musada no intermeio, pra comunicação entre outras streams
    .pipe(new MultiplyByTenStream()) // stream de escrita => só escreve dados

// Buffer é uma forma de transicionar dados entre streams        