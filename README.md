<h1 align="center">Blockchain js</h1>
<h3 align="center">Projeto de Blockchain feito em Javascript</h3>
<p align="center">
        <a href="https://github.com/filipeas/blockchain-js/releases/tag/v0.1.0" alt="Version">
        <img src="https://img.shields.io/badge/version-0.1.0-blue" /></a>
        <a href="https://github.com/filipeas/blockchain-js/tree/main" alt="NodeJs">
        <img src="https://img.shields.io/badge/backend-NodeJs-green" /></a>
</p>

# Como funciona?
O projeto foi feito baseado na Blockchain do Bitcoin, logo foi adicionado caracteristicas básicas, como rede P2P, proof of work, apdate de chains para os nós e wallet.

# Como executar?
Você pode executar de duas formas. 

### Teste.js
No projeto há um arquivo na raíz chamado ``` teste.js ```. Ao executar ``` node ./teste.js ``` ele irá demonstrar 10 blocos sendo inseridos na blockchain para a instância atual.

### Rodando pares na rede P2P
Abra quantos terminais você quiser. Para o primeiro terminal aberto execute ``` npm run dev ``` para executar o primeiro nó na rede. 

Após isso, nos outros terminais execute o seguinte comando: ``` HTTP_PORT=3001 + (1 para cada novo terminal) P2P_PORT=5001 + (1 para cada novo terminal) PEERS=ws://localhost:5001 npm run dev ```

Por exemplo, se você executar 3 terminais, então a sequência que você irá executar será:
- para o primeiro terminal: ``` npm run dev ```
- para o segundo terminal: ``` HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev ```
- para o terceiro terminal: ``` HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001 npm run dev ```