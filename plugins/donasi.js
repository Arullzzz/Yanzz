let fetch = require('node-fetch')
let handler = async (m, { conn }) => conn.sendButtonLoc(m.chat, await (await fetch(fla + 'donasi')).buffer(), `››╭─〘 *Donasi* 〙
╭╡
│┝‷✧ *Pulsa:* 6287708773367
│┝‷✧ *Dana:* 6285712420674
│┝‷✧ *Linkaja:* 6285712420674
│┝‷✧ *Gopay:* 6285712420674
│┝‷✧ *Ovo:* 6285712420674
│╰───···─────
│⁺◛˖ Ingin Donasi? Chat
│wa.me/6288229683561?text=kak+mau+donasi
╰──────────···───╮
▌│█║▌║▌║║▌║▌║█│▌
`.trim(), `${wm}`, 'Owner', '.owner')

module.exports = handler

let wm = global.botwm
