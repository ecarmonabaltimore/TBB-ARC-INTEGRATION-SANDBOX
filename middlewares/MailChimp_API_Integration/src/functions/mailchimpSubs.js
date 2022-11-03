require('dotenv').config()
const mailchimp = require('@mailchimp/mailchimp_marketing')

mailchimp.setConfig({
    apiKey: process.env.API_MAILCHIMP,
    server: process.env.SERVER_PREFIX,
});

const subscribed = async (test) => {
    console.log( test )
    let response
    try{
        const resp = await mailchimp.lists.batchListMembers(test.listId, {
            members: [{
                email_address: test.mail,
                status: test.status,
                merge_fields: test.custom
            }],
            update_existing: true
        })
        
        response = { status: 200, message: resp }
        console.log(response)
    }catch (err) {
        response = { status: 400, message: err.message }
    }

    return response
}


module.exports = {
    subscribed
}
