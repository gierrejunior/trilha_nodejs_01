/*
Este código define uma classe chamada Database, que é usada para simular um sistema de armazenamento de dados simples. 
A classe tem dois métodos principais:

select(table): Este método recebe o nome de uma tabela e retorna os dados presentes nessa tabela.
Se a tabela não existir, ele retorna um array vazio.

insert(table, data): Este método recebe o nome de uma tabela e os dados que devem ser inseridos nessa tabela.
Se a tabela já tiver dados (indicado por um array), os novos dados serão adicionados ao array existente. 
Se a tabela ainda não tiver dados, será criado um array com os dados fornecidos.
*/

// this. == self. no python
// .push == .append no python

// O construtor em linguagens de programação orientadas a objetos, como o constructor() em JavaScript e o def __init__() em Python,
// têm a mesma função: eles são chamados automaticamente quando você cria uma nova instância de uma classe e são usados para inicializar
// os atributos ou propriedades do objeto.

import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url) // se colocar ../db.json ele vai voltar um diretorio 

export class Database {
    // O símbolo # (cerquilha) é usado para definir campos privados em classes no contexto de JavaScript. 
    // Campos privados são aqueles que não devem ser acessados ou modificados diretamente fora da classe

    #database = {} // Cria um objeto vazio chamado `database` para armazenar os dados. s dados serão organizados em tabelas, onde cada tabela é uma chave neste objeto.

    /*
    #database é um campo privado da classe Database. Isso significa que ele não pode ser acessado diretamente 
    fora da classe. A intenção é encapsular os dados dentro da classe e fornecer métodos públicos, 
    como select e insert, para manipular esses dados.
    Se você tentar acessar ou modificar #database fora da classe, receberá um erro:
    */

    constructor() { // constructor equivale o def __init__(): em python
        fs.readFile(databasePath, "utf8")
            .then(data => { // .then  está servindo para dizer "após a leitura do arquivo o #database "
                this.#database = JSON.parse(data)
            })
            .catch(() => { // existe o try catch e o then catch que é para os casos assincronos, como promises
                this.#persist()
            })
    }
    /*
    O método fs.readFile(databasePath, "utf8") é uma operação assíncrona que lê o conteúdo do arquivo do banco de dados especificado pelo caminho databasePath. 
    O segundo argumento "utf8" indica que queremos que o conteúdo seja lido como texto no formato UTF-8.

    A função .then(data => { ... }) está sendo encadeada após a operação de leitura assíncrona. Isso significa que, quando a leitura do arquivo for concluída com sucesso,
    essa função será chamada, e o resultado da leitura será passado para ela como o argumento data.

    Portanto, no contexto desse código, o data é o conteúdo do arquivo do banco de dados lido pela operação assíncrona. 
    O nome data foi escolhido para representar o conteúdo lido do arquivo.

    Dentro da função .then(data => { ... }), o conteúdo do arquivo é convertido de uma string JSON em um objeto JavaScript por meio do JSON.parse(data). 
    Presumindo que o conteúdo do arquivo seja um JSON válido, essa operação transforma a string em um objeto JavaScript que pode ser manipulado e usado posteriormente.

    Em resumo, o data é a representação do conteúdo do arquivo do banco de dados após a leitura, e a função .then() lida com esse conteúdo, 
    transformando-o em um objeto JavaScript para uso posterior.

    O .catch() está sendo usado diretamente após a chamada do .then(). Isso é conhecido como tratamento de erro encadeado. 
    Quando ocorre um erro na operação de leitura do arquivo (dentro da função .then()), ele é capturado pelo .catch(). 

    */

    #persist() { // método persist
        fs.writeFile(databasePath,JSON.stringify(this.#database)) // databasePath -> local + nome do arquivo, writefile, só aceita string, por isso transformamos o databse em string
    }

    select(table) { // método select
        const data = this.#database[table] ?? [] // Usa a operação de coalescência nula (`??`) para verificar se a tabela existe. Se a tabela não existir, retorna um array vazio (indicando que não há dados nessa tabela).

        return data
    }

    insert(table, data) { // método insert
        if (Array.isArray(this.#database[table])) { // Array.isArray é uma função embutida em JavaScript que é usada para verificar se um determinado valor é um array. 
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }
    
        this.#persist() // após inserir os dados, ele chama o metodo persist, para criar um arquivo come ssas informações. Ela retorna um valor booleano (true ou false) indicando se o valor fornecido é um array ou não.

        return data
    }
}

