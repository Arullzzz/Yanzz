let fs = require('fs')
let fetch = require('node-fetch')
let wm = global.botwm
let logo = global.logo
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (isBlocked) return
    if (m.isBaileys) return
    if (m.chat.endsWith('broadcast')) return
    let setting = db.data.settings[this.user.jid]
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]

    // ketika ditag
    try {
        if (m.mentionedJid.includes(this.user.jid) && m.isGroup) {
            await this.send2Button(m.chat,
                isBanned ? 'Ada Apa Kak?' : banned ? 'kamu dibanned' : 'Ynz Disini',
                '',
                isBanned ? 'Unban' : banned ? 'Pemilik Bot' : '⋮☰ Menu',
                isBanned ? '.unban' : banned ? '.owner' : '.menu',
                m.isGroup ? 'Owner' : isBanned ? 'Donasi' : 'Donasi',
                m.isGroup ? '.nowner' : isBanned ? '.donasi' : '.donasi', m)
        }
    } catch (e) {
        return
    }

    // ketika ada yang invite/kirim link grup di chat pribadi
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.send2ButtonLoc(m.chat, logo, `
╭━━〔 List Sewa〕━✧
│⬦ *1 Bulan* :      *Rp 15000*
│⬦ *2 bulan* :      *Rp 20000*
│⬦ *8 Bulan* :      *Rp 35000*
│⬦ *12 Bulan* :      *Rp 45000*
┝━━〔Payment〕━✧
│⬦ Gopay
│⬦ Pulsa
╰━━━✧
Note: Syarat dan Ketentuan mungkin berlaku`.trim(), wm, 'Payment', '#payment', 'Owner', '#owner', m)
}

    // salam
    let reg = /(terima?kasih|makasih|maacih|tengkyuh)/i
    let isSalam = reg.exec(m.text)
    if (isSalam && !m.fromMe) {
        m.reply(`Sama-sama, , （ ・∀・）`)
    }

    // backup db
    if (setting.backup) {
        if (new Date() * 1 - setting.backupDB > 1000 * 60 * 60) {
            let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            await global.db.write()
            this.reply(global.owner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            this.sendFile(global.owner[0] + '@s.whatsapp.net', fs.readFileSync('./database.json'), 'database.json', '', 0, 0, { mimetype: 'application/json' })
            setting.backupDB = new Date() * 1
        }
    }

    // update status
    if (new Date() * 1 - setting.status > 1000) {
        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)
        await this.setStatus(`𝙸'𝙼 𝚈𝚊𝚗𝚣𝚣-𝙱𝚘𝚝 👾 || ⏰ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 ${uptime} ||📡 𝙼𝚘𝚍𝚎: ${global.opts['self'] ? '𝙿𝚛𝚒𝚟𝚊𝚝𝚎' : setting.groupOnly ? '𝙷𝚊𝚗𝚢𝚊 𝙶𝚛𝚞𝚙' : '𝙿𝚞𝚋𝚕𝚒𝚌'} || © 𝟸𝟶𝟸𝟸 𝙱𝚢 𝚈𝚊𝚗𝚣𝚣 🗿`).catch(_ => _)
        setting.status = new Date() * 1
    }

}

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
