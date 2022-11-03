require('dotenv').config()
const mailchimp = require('@mailchimp/mailchimp_marketing')
const md5 = require('md5')

mailchimp.setConfig({
    apiKey: process.env.API_MAILCHIMP,
    server: process.env.SERVER_PREFIX,
});

const memberInfo = async (memberMail) => {
    let subscriberHash = md5(memberMail.mail)
    let response

    try{
        const resp = await mailchimp.lists.getListMember(
            process.env.LIST_ID,
            subscriberHash
        )
    
        response = { status: 200, message: resp }
        console.log(response)
    }catch (err) {
        response = { status: 400, message: err.message }
    }

    return response
}

const updateMember = async (memberInfo) => {
    let subscriberHash = md5(memberInfo.mail)
    let response

    console.log(memberInfo, ' --> testing object')

    let mEmail = !memberInfo.newemail ? memberInfo.mail : memberInfo.newemail

    console.log("---New Email----")
    console.log(mEmail)

    try {
        const resp = await mailchimp.lists.updateListMember(
            process.env.LIST_ID,
            subscriberHash,
            {
                email_address: mEmail,
                status: memberInfo.status,
                merge_fields: memberInfo.custom
            }
          )

        response = { status: 200, message: resp }
    } catch (err) {
        response = { status: 400, message: err.message }
    }

    return response
}

module.exports = {
    memberInfo,
    updateMember
}
