/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 æ* @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
require('dotenv').config()

const { subscribed } = require('../functions/mailchimpSubs')
const { memberInfo, updateMember } = require('../functions/mailchimpUpdated')
const { getPianoUser, getPianoUserPayment, getPianoConsent, getPianoSubscription } = require('../functions/piano')
const { decrypt } = require('../util/TPSecurityUtils')
const { selectTable, insertTable, updateTable } = require('../util/dbOperations')

const formatDate = (date) => {
  let datearray = date.split('/');
  return datearray[2] + '-' + datearray[0] + '-' + datearray[1];
}

const dispatcherHandler = async (event, context) => {
  let response
  let req = event.queryStringParameters.data
  // // let req = event
  // let req = JSON.parse(event.body)
  // let status = req.status

  console.info('received:', req)

  let stats = ""
  const webhookData = req
  const privateKey = process.env.PIANO_PRIVATE
  const result = decrypt(privateKey, webhookData)
  const decryptResult = JSON.parse(result)
  const type = decryptResult.type
  const pianoResult = await getPianoUser(result)
  const pianoConsentResult = await getPianoConsent(result)
  const pianoSubsResult = await getPianoSubscription(result)

  const pianoData = pianoResult.data
  const consentData = pianoConsentResult.data

  let subscriptions = 'NO'
  let billing = ""
  let terms = ""
  let resources = ""

  if (typeof pianoSubsResult.data.subscriptions != 'undefined') {
    if (pianoSubsResult.data.subscriptions.length > 0) {
      pianoSubsResult.data.subscriptions.map((item, index) => {
        let unix_timestamp = item.next_bill_date
        let date = new Date(unix_timestamp * 1000)
        if (item.status != "cancelled") {
          billing = date
          terms += item.term.term_id + "' "
          resources += item.resource.rid + "' "
          subscriptions = 'YES'
        }
      })
    } else {
      if (type == "access_granted") {
        if (typeof decryptResult.rid != 'undefined') {
          console.log('access granted')
          resources += decryptResult.rid + "' "
        }
      }

      console.log('no subscriptions')
    }
  }

  if (type == "user_disabled")
    stats = "cleaned"
  else
    stats = "subscribed"

  let pData = {
    mail: typeof pianoData.user == 'undefined' ? '' : pianoData.user.email,
    status: stats,
    listId: "fed75856d2",
    custom: {
      FNAME: !pianoData.user ? '' : pianoData.user.first_name,
      LNAME: !pianoData.user ? '' : pianoData.user.last_name,
      ADDRESS: {
        addr1: "",
        city: "",
        state: "",
        zip: ""
      },
      PHONE: "",
      BIRTHDAY: "",
      REGISTERED: "YES",
      SUBSCRIBED: subscriptions,
      RESOURCES: resources.replace(/,\s*$/, ""),
      TERMS: terms.replace(/,\s*$/, ""),
      NEXTBILL: billing,
      ABANDON30: "",
      CONSENTERM: typeof consentData.consent_entry[0] == 'undefined' ? "" : consentData.consent_entry[0].entry == true ? 'YES' : 'NO',
      CONSENREC: typeof consentData.consent_entry[1] == 'undefined' ? "" : consentData.consent_entry[1].entry == true ? 'YES' : 'NO',
      PARENTMSG: typeof consentData.consent_entry[2] == 'undefined' ? "" : consentData.consent_entry[2].entry == true ? 'YES' : 'NO',
      ACCOUNTYPE: typeof decryptResult.parent_uid != 'undefined' ? "CHILD" : "PARENT"
    }
  }

  consentData.consent_entry.map((item, index) => {
    console.log(item.field_name)
  })

  console.log(type, " --> type")

  if (type == "user_created" || type == 'user_disabled' || type == 'shared_subscription_child' || type == 'access_modified' || type == 'access_granted' || type == 'user_address_updated' || type == 'access_revoked' || type == 'term_changed' || type == 'term_change_finished' || type == 'user_email_confirmed') {
    if (type == "user_created") {
      let params = {
        TableName: 'user_relationship',
        Item: {
          'id_user': pianoData.user.uid,
          'user_name': pianoData.user.email
        }
      }

      try {
        await insertTable(params).then((responseData) => {
          resSel = responseData
        })

        console.log('user_created')
        console.log(resSel)

        console.log({ status: 200, message: resSel, line: 75 })
      } catch (err) {
        console.log({ status: 400, message: err.message, line: 77 })
      }
    } else if (type == 'shared_subscription_child') {
      pData.custom.TERMS = decryptResult.term_id
      pData.custom.RESOURCES = decryptResult.rid
      pData.custom.SUBSCRIBED = "YES"
    } else if (type == 'user_disabled') {
      let params = {
        TableName: 'user_relationship',
        Key: {
          'id_user': decryptResult.uid,
        }
      }

      console.log(params, ' ---> params inside user deleted')

      try {
        await selectTable(params).then((responseData) => {
          resPiano = responseData
        })

        console.log('user_disabled')
        console.log(resPiano)

        pData.mail = resPiano.Item.user_name
        pData.custom.SUBSCRIBED = 'NO'
        delete pData.custom.FNAME
        delete pData.custom.LNAME

        console.log({ status: 200, message: resPiano, line: 75 })
      } catch (err) {
        console.log({ status: 400, message: err.message, line: 77 })
      }
    }

    console.log(pData, ' ---> pData')

    await subscribed(pData).then(data => {
      subsResponse = data
    }).catch(err => {
      response = {
        status: 400,
        message: err.message
      }
    })

    response = {
      status: subsResponse.status,
      message: subsResponse.message
    }
  } else if (type == "user_updated") {
    try {
      let params = {
        TableName: 'user_relationship',
        Key: {
          "id_user": decryptResult.uid
        }
      }

      await selectTable(params).then((responseData) => {
        eset = responseData
      }).catch(err => {
        console.log(err.message)
      })

      if (eset.Item.user_name !== pianoData.user.email) {
        pData.mail = eset.Item.user_name
        pData.newemail = pianoData.user.email

        let updateParams = {
          TableName: 'user_relationship',
          Key: {
            "id_user": decryptResult.uid
          },
          UpdateExpression: "set #MyVariable = :x",
          ExpressionAttributeNames: {
            "#MyVariable": "user_name"
          },
          ExpressionAttributeValues: {
            ":x": pData.newemail
          }
        }

        await updateTable(updateParams).then((responseData) => {
          eset2 = responseData
        }).catch(err => {
          console.log(err.message)
        })
      }

    } catch (err) {
      console.log(err.message)
    }

    await updateMember(pData).then(data => {
      uptResponse = data
    }).catch(err => {
      response = {
        status: 400,
        message: err.message
      }
    })

    response = {
      status: uptResponse.status,
      message: uptResponse.message
    }
  } else {
    response = {
      status: 200,
      message: "Error processing the webhook request"
    }
  }

  return response
}

const dispatcherHandlerdev = async (event, _) => {
  let req = event.queryStringParameters.data
  console.log(`received: ${req}`)

  let stats = ""
  const webhookData = req
  const privateKey = process.env.PIANO_PRIVATE
  const result = decrypt(privateKey, webhookData)
  const decryptResult = JSON.parse(result)
  const type = decryptResult.type
  const pianoResult = await getPianoUser(result)
  console.log(`pianoUser: ${JSON.stringify(pianoResult.data, null, 2)}`);
  const pianoConsentResult = await getPianoConsent(result)
  console.log(`pianoConsent: ${JSON.stringify(pianoConsentResult.data, null, 2)}`);
  const pianoSubsResult = await getPianoSubscription(result)
  console.log(`pianoSubscription: ${JSON.stringify(pianoSubsResult.data, null, 2)}`);

  const pianoData = pianoResult.data
  const consentData = pianoConsentResult.data

  let subscriptions = 'NO'
  let billing = ""
  let terms = ""
  let resources = ""

  if (typeof pianoSubsResult.data.subscriptions != 'undefined') {
    if (pianoSubsResult.data.subscriptions.length > 0) {
      pianoSubsResult.data.subscriptions.map((item, _) => {
        let unix_timestamp = item.next_bill_date
        let date = new Date(unix_timestamp * 1000)
        if (item.status != "cancelled") {
          billing = date
          terms += item.term.term_id + "' "
          resources += item.resource.rid + "' "
          subscriptions = 'YES'
        }
      })
    } else {
      if (type == "access_granted") {
        if (typeof decryptResult.rid != 'undefined') {
          console.log('access granted')
          resources += decryptResult.rid + "' "
        }
      }
      console.log('no subscriptions')
    }
  }

  if (type == "user_disabled")
    stats = "cleaned"
  else
    stats = "subscribed"

  let pData = {
    mail: typeof pianoData.user == 'undefined' ? '' : pianoData.user.email,
    status: stats,
    listId: "fed75856d2",
    custom: {
      FNAME: !pianoData.user ? '' : pianoData.user.first_name,
      LNAME: !pianoData.user ? '' : pianoData.user.last_name,
      ADDRESS: {
        addr1: "",
        city: "",
        state: "",
        zip: ""
      },
      PHONE: "",
      BIRTHDAY: "",
      REGISTERED: "YES",
      SUBSCRIBED: subscriptions,
      RESOURCES: resources.replace(/,\s*$/, ""),
      TERMS: terms.replace(/,\s*$/, ""),
      NEXTBILL: billing,
      ABANDON30: "",
      CONSENTERM: typeof consentData.consent_entry[0] == 'undefined' ? "" : consentData.consent_entry[0].entry == true ? 'YES' : 'NO',
      CONSENREC: typeof consentData.consent_entry[1] == 'undefined' ? "" : consentData.consent_entry[1].entry == true ? 'YES' : 'NO',
      PARENTMSG: typeof consentData.consent_entry[2] == 'undefined' ? "" : consentData.consent_entry[2].entry == true ? 'YES' : 'NO',
      ACCOUNTYPE: typeof decryptResult.parent_uid != 'undefined' ? "CHILD" : "PARENT"
    }
  }

  console.log(`pianoConsentData: ${JSON.stringify(consentData, null, 2)}`)

  console.log(`type: ${type}`)

  if (type == "user_created" || type == 'user_disabled' || type == 'shared_subscription_child' || type == 'access_modified' || type == 'access_granted' || type == 'user_address_updated' || type == 'access_revoked' || type == 'term_changed' || type == 'term_change_finished' || type == 'user_email_confirmed') {
    if (type == "user_created") {
      let params = {
        TableName: 'user_relationship',
        Item: {
          'id_user': pianoData.user.uid,
          'user_name': pianoData.user.email
        }
      }
      console.log(`insertTable: ${JSON.stringify(params, null, 2)}`)

    } else if (type == 'shared_subscription_child') {
      pData.custom.TERMS = decryptResult.term_id
      pData.custom.RESOURCES = decryptResult.rid
      pData.custom.SUBSCRIBED = "YES"
    } else if (type == 'user_disabled') {
      let params = {
        TableName: 'user_relationship',
        Key: {
          'id_user': decryptResult.uid,
        }
      }
      console.log(`params inside user deleted: ${params}`)

      try {
        await selectTable(params).then((responseData) => {
          resPiano = responseData
        })

        console.log('user_disabled')
        console.log(resPiano)

        pData.mail = resPiano.Item.user_name
        pData.custom.SUBSCRIBED = 'NO'
        delete pData.custom.FNAME
        delete pData.custom.LNAME

        console.log({ status: 200, message: resPiano, line: 75 })
      } catch (err) {
        console.log({ status: 400, message: err.message, line: 77 })
      }
    }

    console.log(`pData: ${JSON.stringify(pData, null, 2)}`)
  } else if (type == "user_updated") {
    try {
      let params = {
        TableName: 'user_relationship',
        Key: {
          "id_user": decryptResult.uid
        }
      }

      await selectTable(params).then((responseData) => {
        eset = responseData
      }).catch(err => {
        console.log(err.message)
      })

      if (eset.Item.user_name !== pianoData.user.email) {
        pData.mail = eset.Item.user_name
        pData.newemail = pianoData.user.email

        let updateParams = {
          TableName: 'user_relationship',
          Key: {
            "id_user": decryptResult.uid
          },
          UpdateExpression: "set #MyVariable = :x",
          ExpressionAttributeNames: {
            "#MyVariable": "user_name"
          },
          ExpressionAttributeValues: {
            ":x": pData.newemail
          }
        }

        console.info(`updateParams: ${updateParams}`)
      }

    } catch (err) {
      console.log(err.message)
    }

    console.info('updateMember');
    console.info(`pData: ${pData}`);
    console.info('Development environment. Successful processing of the webhook request.');
    response = {
      status: 200,
      message: "Successful processing of the webhook request"
    }
  } else {
    console.info('Development environment. Error processing the webhook request.');
    response = {
      status: 200,
      message: "Error processing the webhook request"
    }
  }
}

module.exports = {
  dispatcherHandler,
  dispatcherHandlerdev
}
