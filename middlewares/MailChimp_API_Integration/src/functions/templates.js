const client = require("@mailchimp/mailchimp_marketing");
const fs = require('fs');
var folderId = "";
var templateID = "";
var deleteTemplateId = "";
var existsTemplate = false;
var updateTemplate = false;
var deleteTemplate = false;

client.setConfig({
    apiKey: process.env.API_MAILCHIMP,
    server: process.env.SERVER_PREFIX,
});

const listAllFold = async (name) =>{
    const listAllFolders = await client.templateFolders.list()

    return listAllFolders

    // listAllFolders.folders.forEach(function(folder){
    //     if(folder.name === name){
    //         folderId = folder.id;
    //     }
    // });
}

const listAllTemp = async () => {
    const listAllTemplates = await client.templates.list();

    return listAllTemplates

    // listAllTemplates.templates.forEach(function(template){
    // }
    //     else if(template.name === "another template"){
    //         deleteTemplate = true;
    //         deleteTemplateId = template.id;
    //     }
    // });
}

const createTemp = async ( getHtml, name, folder ) => {
    let response 
    const allTemp = await listAllTemp()

    listAllTemplates.templates.forEach(function(template){
        if(template.name === name){
            existsTemplate = true;
        } else {
            existsTemplate = false;
        }
    })

    try {
        if(existsTemplate === false){
            var html = getHtml
    
            const createTemplate = await client.templates.create({
                name: name,
                html: html,
                folder_id: folder
            })

v
        }else{
            response = {
                status: 400,
                message: "Unexisting template"
            }
        }
    }catch(err){
        response = {
            status: 400,
            message: err.message 
        }
    }

    return response
}

const udpateTemp = async (getHtml, name, folder) => {
    let response 
    const allTemp = await listAllTemp()

    listAllTemplates.templates.forEach(function(template){
        if(template.name === name){
            existsTemplate = true;
        } else {
            existsTemplate = false;
        }
    })

    try{
        if(updateTemplate === true && templateID > 0){
            console.log("Updating template id: "+ templateID);
            var html = getHtml
            const updateTemplate = await client.templates.updateTemplate(templateID, {
                name: name,
                html: html,
                folder_id: folder
            })

            response = {
                status: 200,
                message: "Everthing looks good"
            }
        }else{
            response = {
                status: 400,
                message: "Unexisting template"
            }
        }
    }catch (err) {
        response = {
            status: 400,
            message: err.message 
        }
    }

    return response
}

const deleteTemp = async ( name, tempId ) => {
    let response 
    const allTemp = await listAllTemp()

    listAllTemplates.templates.forEach(function(template){
        if(template.name === name){
            existsTemplate = true;
        } else {
            existsTemplate = false;
        }
    })

    try {
        if(tempId > 0){
            const deleteTemplate = await client.templates.deleteTemplate(tempId);
            response = {
                status: 200,
                message: "Template deletion completed without problems"
            }
        }else{
            response = {
                status: 400,
                message: "Unexisting template"
            }
        }
    }catch (err) {
        response = {
            status: 400,
            message: err.message 
        }
    }

    return response
}

module.exports = {
    listAllFold,
    listAllTemp,
    createTemp,
    udpateTemp,
    deleteTemp
}
