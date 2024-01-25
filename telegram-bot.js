export default class TelegramBot {

    static url = "https://api.telegram.org/bot"

    static token = ""
    static chatID = ""

    /**
     * @returns {Object}
     * 
     * # Exemplo
     * 
     * ```js
     * const result = await this.getUpdates()
     * ```
     * 
     * # Result
     * 
     * ```js
     * {ok: Boolean, result: Array(x)}
     * ```
     */
    static async getUpdates() {

        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({ offset: null, limit: null, timeout: null })
        };

        await fetch(`${this.url}${this.token}/getUpdates`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                return response
            })
            .catch(err => {
                console.log(err);
                return err
            });

    }

    /**
     * 
     * @param {string} text Mensagem que será enviada no chat do bot
     * @param {string} parseMode formatação da mensagem (html, Markdown)
     * @param {boolean} disableWebPagePreview Desativa visualizações de links nesta mensagem
     * @param {boolean} disableNotification Envia a mensagem silenciosamente.
     * @param {boolean} replyMessageID Se a mensagem for uma resposta, ID da mensagem original
     * @returns {Object}
     * 
     * # Exemplo
     * 
     * ```js
     * const result = await TelegramBot.sendMessage("Escreva aqui sua menssagem")
     * ```
     * 
     * # Result
     * 
     * ```js
     * {ok: Boolean, result: {object}}
     * ```
     * 
     */

    static async sendMessage(text, parseMode = "html", disableWebPagePreview = false, disableNotification = false, replyMessageID = null) {

        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({
                text: text,
                chat_id: this.chatID,
                parse_mode: parseMode,
                disable_web_page_preview: disableWebPagePreview,
                disable_notification: disableNotification,
                reply_to_message_id: replyMessageID
            })
        };


        await fetch(`${this.url}${this.token}/sendMessage`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                return response
            })
            .catch(err => {
                console.log(err);
                return err
            });

    }

    /**
     * 
     * @param {string} message messagem que estará dentro do arquivo
     * @param {string} caption Legenda informada na mensagem com o arquivo
     * @param {string} nameDocument nome do arquivo que será enviado no chat
     * @returns {Object}
     * 
     * # Exemplo
     * 
     * ```js
     * const result = await TelegramBot.sendDocument("Mensagem do arquivo", "Arquivo de teste", "logTest.txt")
     * ```
     * 
     * # Retorno
     * 
     * ```js
     * {ok: Boolean, result: {object}}
     * ```
     * 
     */
    static async sendDocument(message = ["Base message for txt files"], caption = "File", nameDocument = 'logTest.txt') {

        return new Promise(async (resolve) => {

            let blob = new Blob(message, { type: 'plain/text' })

            var formData = new FormData();
            formData.append('chat_id', this.chatID);
            formData.append('document', blob, nameDocument);
            formData.append('caption', caption)

            var request = new XMLHttpRequest();

            request.open('POST', `${this.url}${this.token}/sendDocument`);
            request.send(formData);

            resolve(true)

        })

    }

    /**
     * 
     * @param {string} photo link web da foto que será enviada no chat
     * @param {string} caption legenda que compõe a menssagem da foto
     * @returns {Object}
     * 
     * # Exemplo
     * 
     * ```js
     * const result = await TelegramBot.sendPhoto("https://i.imgur.com/HWpENJX.png", "Minha foto")
     * ```
     * 
     * # Retorno
     * 
     * ```js
     * {ok: Boolean, result: {object}}
     * ```
     * 
     */
    static async sendPhoto(photo, caption = "Imagem") {

        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({
                photo: photo,
                chat_id: '-1002007408384',
                caption: caption,
                disable_notification: false,
                reply_to_message_id: null
            })
        };


        await fetch(`${this.url}${this.token}/sendPhoto`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                return response
            })
            .catch(err => {
                console.log(err);
                return err
            });

    }

    static { window.TelegramBot = TelegramBot }

}