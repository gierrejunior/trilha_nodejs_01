// Netflix & Spotify

// Começa a visualizar o filme ou ouvir a musica desde o incio, mesmo que não esteja compartilhado por completo

// O  Conceito de Stream é ler pequenas partes de algo e já conseguir ja trabalhar com esses dados, mesmo antes de ler o arquivo por completo

// Exemplo de outro caso de uso de streams: Importação de clientes via CSV (Excel) -> subir um arquivo de 1gb  de csv com 1.000.000 de linhas
// Se não estivermos usando o conceito de stream no caso acima:
    // 1gb - 1.000.000
    // o usuario vai subir o CSV, via uma rota POST /upload import.csv
    // o NODE vai ter q ler o arquivo por COMPLETO, percorrer o arquivo por COMPLETO, fazendo cada uma das operações descritas no banco de dados
    // em uma conexão de 10mb/s de upload
    // vai ter que esperar 100s, para o upload do arquivo ser totalmente finalizado
    //para só depois o Node começar a ler e fazer as inserções no banco de dados

//Se usarmos o conceito de streams:
    //conexão de de 10mb/s
    //1s -> 10mb -> 10.000
    //nesse um segundo ja insere os 10.000 registros no BD.
    //ler os dados aos poucos e processando ele, enquanto o arquivo ainda esta sendo enviado pro servidor.


// writable Streams: (streams de escrita) Servidor -> usuario
    // Enviando aos poucos o arquivo para o front end
    // Ex: Netflix & Spotify

// Readable stream:
    // lendo os arquivos aos poucos
    // EX:  Importação de clientes via CSV
    // ta recebendo no servidor


// no NODE toda a porta de entrada e saída é automaticamente uma stream


// A propriedade "process.stdin" retorna um fluxo conectado ao stdin
// stdin é tudo o que o usuário digita no terminal

//tudo que é recebido como entrada no terminal é encaminhado como saída no terminal
process.stdin //stream de leitura
    .pipe(process.stdout) //stream de escrita