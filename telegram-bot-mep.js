import FWLink from "../daq-fwlink/FWLink.js"
import TelegramBot from "./telegram-bot.js"

export default class TelegramMepBot extends TelegramBot {

    /**
     * 
     * @param {string} message messagem que estará dentro do arquivo
     * @param {string} error menssagem de erro que vai compor a legenda junto com outras informções retiradas do PVI
     * @param {string} nameDocument nome do arquivo que será enviado no chat
     * @returns {Object}
     * 
     * Exemplo
     * 
     * const result = await TelegramBot.sendLogTest("message", "error", "logTest.txt")
     * 
     * Retorno
     * 
     * {ok: true, result: {…}}
     * 
     */
    static async sendLogTest(message = ["Base message for txt files"], error, nameDocument = 'logTest.txt') {

        const machineInformation = FWLink.runInstruction("ras.getmachineid", []).split(",")
        const user = FWLink.runInstruction("ras.getuser", [])
        const scriptPath = FWLink.runInstruction("GETSCRIPTPATH", [])
        const station = FWLink.runInstruction("ras.gettipoestacao", [])
        const sector = FWLink.runInstruction("ras.getsetor", [])
        const date = new Date().toString()

        let caption =
            `PC: ${machineInformation[0].trim()}\n` +
            `PVI: ${machineInformation[1].trim().substring(machineInformation[1].indexOf(" ", 1))}\n` +
            `User: ${user}\n` +
            `Station: ${station}\n` +
            `Sector: ${sector}\n` +
            `Date: ${date.substring(date.indexOf(" ") + 1, date.indexOf("GMT") - 1)}\n\n` +
            `Script: \n${scriptPath}\n\n` +
            `Expection: \n${error}`


        return await this.sendDocument(message, caption, nameDocument)

    }

    static { this.token = "6873550866:AAEhzTrphh79yDfoCevQvMmSJuvF0gYKI_8", this.chatID = "-1002007408384" }
    static { window.TelegramMepBot = TelegramMepBot }

}