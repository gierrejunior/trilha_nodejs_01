npm init -y

npm é um gerenciador de pacotes 


node src/server.js => ativa o nosso servidor http, porém vai ficar com o msm código, msm q altere ele no vs code, tendo q fechar e abrir novamente, para acontecer as alterações
node --watch src/server.js ==> faz o mesmo do código acima, porém att conforme as açlteraçõe sno código


http localhost:3333  => faz uma requisição pra porta  q for indicada


node --watch src/server.js

dentro do package.json do npm, da pra criar scripts, que são alias que facilitam, pois não precisa escrever todo o código:
exemplo:
      "scripts": {
    "dev" : "node --watch src/server.js",
    },

agora não é mais necessário digitar: "node --watch src/server.js"
é só digitar "npm run dev"