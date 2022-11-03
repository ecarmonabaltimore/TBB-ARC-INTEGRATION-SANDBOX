require('dotenv').config()
const { decrypt } = require('../util/TPSecurityUtils');
const axios = require('axios').default

const getPianoUser = async (data) => {
    const webhookData = JSON.parse(data)

    const url = process.env.PIANO_USER
    const uid = webhookData.uid

    let payload = ''.concat('aid=',process.env.PIANO_APP_ID, '&api_token=', process.env.PIANO_KEY, '&uid=', uid) 

    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json"},
        data: payload,
        url 
    }

    const pianoResult = await axios(options)

    return pianoResult
}

const getPianoUserPayment = async (data) => {
    const webhookData = JSON.parse(data)

    const url = process.env.PIANO_PAYMENT
    const uid = webhookData.uid

    let payload = ''.concat('api_token=', process.env.PIANO_KEY,'&aid=',process.env.PIANO_APP_ID, '&uid=', uid, '&limit=', 10, '&offset=', 0) 

    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json"},
        data: payload,
        url 
    }

    const pianoResult = await axios(options)

    return pianoResult
}

const getPianoConsent = async (data) => {
    const webhookData = JSON.parse(data)

    const url = process.env.PIANO_CONSENT
    const uid = webhookData.uid

    let payload = ''.concat('api_token=', process.env.PIANO_KEY,'&aid=',process.env.PIANO_APP_ID, '&uid=', uid, '&limit=', 10, '&offset=', 0) 

    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json"},
        data: payload,
        url 
    }

    const pianoResult = await axios(options)

    return pianoResult
}

const getPianoSubscription = async (data) => {
    const webhookData = JSON.parse(data)

    const url = process.env.PIANO_SUBSCRIPTION
    const uid = webhookData.uid

    let payload = ''.concat('api_token=', process.env.PIANO_KEY,'&aid=',process.env.PIANO_APP_ID, '&uid=', uid) 

    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json"},
        data: payload,
        url 
    }

    const pianoResult = await axios(options)

    return pianoResult
}

module.exports = {
    getPianoUser,
    getPianoUserPayment,
    getPianoConsent,
    getPianoSubscription
}
