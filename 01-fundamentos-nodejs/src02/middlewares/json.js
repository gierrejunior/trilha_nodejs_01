export async function json(req, res) { // exportando a função possibilitando ela ser chamada em outro arquivo
    const buffers = [] // cria a varaivel buffers

    for await (const chunk of req){ // aguarda todos os chunks que vem na request
        buffers.push(chunk)  // coloca todos os chunks na lista buffers criado acima
    }
    try { // tenta fazer o que ta descrito a baixo
    req.body = JSON.parse(Buffer.concat(buffers).toString()) //concatena os chunkers da lista buffer, transforma em string, e depois transforma em json e salva no req.body
    } catch { // caso falhe
        req.body = null // salva null no req.body
    }

    res.setHeader("Content-type", "application/json") // salva o content type da response

}// try catch é a mesma coisa que try exceptch

/*

Middlewares em Node.js são funções intermediárias que podem ser usadas para processar e manipular 
solicitações (requests) e respostas (responses) em uma aplicação web. Eles são chamados no meio do 
fluxo de execução, entre o momento em que a solicitação é feita ao servidor e o momento em que a 
resposta é enviada de volta ao cliente.

Os middlewares têm acesso tanto à solicitação quanto à resposta e podem executar ações como:

Modificar ou adicionar dados à solicitação ou à resposta.
Executar verificações de autenticação e autorização.
Registrar informações de log.
Fazer transformações nos dados.
Lidar com erros de forma centralizada.

Eles são usados para modularizar e organizar a lógica do servidor em partes menores e mais gerenciáveis,
permitindo que você adicione funcionalidades específicas em diferentes pontos do fluxo de solicitação e resposta.

Um exemplo comum de uso de middlewares é a autenticação. Quando um cliente faz uma solicitação a um servidor,
um middleware de autenticação pode verificar se o cliente tem permissão para acessar os recursos solicitados 
antes que o processamento real da solicitação seja realizado.

Em resumo, middlewares em Node.js são funções intermediárias que permitem que você manipule e processe solicitações 
e respostas em aplicativos web, adicionando funcionalidades extras de forma modular e organizada.

*/