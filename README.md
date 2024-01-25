# Telegram Bot

Biblioteca que permite gerenciar portas seriais através do browser via websocket

## Instalando

Abra o terminal, e na pasta raíz do script, execute:

```
npm i @libs-scripts-mep/telegram-bot
```

## Desinstalando

Abra o terminal, e na pasta raíz do script, execute:

```
npm uninstall @libs-scripts-mep/telegram-bot
```

## Atualizando

Abra o terminal, e na pasta raíz do script, execute:

```
npm uninstall @libs-scripts-mep/telegram-bot
```

## Como utilizar

Realize a importação:

```js
import TelegramMepBot from "../libs/telegram-bot-mep.js" 
```

ou para funções expecificas do bot mep

```js
import TelegramBot from "../libs/telegram-bot.js" 
```

Após isso basta invocar o método desejado.

### Métodos implementados

```js

await TelegramBot.getUpdates()

await TelegramBot.sendMessage("message")

await TelegramBot.sendPhoto("https://i.imgur.com/HWpENJX.png")

await TelegramBot.sendDocument("message", "caption", "logTest.txt")

await TelegramBot.sendLogTest("message", "error", "logTest.txt")

```