import FWLink from "../daq-fwlink/FWLink.js"
import TelegramBot from "./telegram-bot.js"

export default class TelegramMepBot extends TelegramBot {

    /**
     * 
     * @param {Array} message vetor de messagem que estará dentro do arquivo
     * @param {string} error menssagem de erro que vai compor a legenda junto com outras informções retiradas do PVI
     * @param {string} serialNumber numero serial referente ao produto testado
     * @returns {Object}
     * 
     * # Exemplo
     * 
     * ```js
     * const result = await TelegramBot.sendLogTest(Log.history, error, "1000009258898")
     * ```
     * 
     * # Retorno
     * 
     * ```js
     * {ok: Boolean, result: {Object}}
     * ```
     * 
     */
    static async sendLogTest(message = ["Base message for txt files"], error, serialNumber = "0000000000000") {

        const machineInformation = FWLink.runInstruction("ras.getmachineid", []).split(",")
        const user = FWLink.runInstruction("ras.getuser", [])
        const scriptPath = FWLink.runInstruction("GETSCRIPTPATH", [])
        const station = FWLink.runInstruction("ras.gettipoestacao", [])

        let caption =
            `PC: ${machineInformation[0].trim()}\n` +
            `PVI: ${machineInformation[1].trim().substring(machineInformation[1].indexOf(" ", 1))}\n` +
            `User: ${user}\n` +
            `Station: ${station}\n` +
            `SerialNumber: ${serialNumber}\n\n` +
            `Script: \n${scriptPath}\n\n` +
            `Expection: \n${error}`


        return await this.sendDocument(message, caption, `${sessionStorage.getItem("ProductCode")}_logTest.txt`)

    }

    static { this.token = "6873550866:AAEhzTrphh79yDfoCevQvMmSJuvF0gYKI_8", this.chatID = "-1002007408384" }
    static { window.TelegramMepBot = TelegramMepBot }

}