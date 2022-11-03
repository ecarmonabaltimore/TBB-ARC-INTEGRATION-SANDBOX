const AWS = require('aws-sdk')

AWS.config.update({
    region: process.env.REGION
})

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    createTable: () => {
        var params = {
            TableName: "Tokens",
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH" }, //Partition key
            ],
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "S" },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };

        const create = dynamodb.createTable(params, function(err, data) {
            if (err) {
                console.log('DBOperations', '', '', "Create Table", err, 'ERROR');
            } 
        });

        return create
    },
    insertTable: async (params) => {
        const insertResult = docClient.put(params, function(err, data) {
            if (err) {
                console.log('DBOperations', '', '', "Insert Record Table", err, 'ERROR');
            }
        });

        return insertResult
    },
    selectTable: async(params) => {
        let rData = await docClient.get(params).promise();
        return rData
    },
    scanTable: async(tableName) => {
        let params = {
            TableName: tableName
        };
        let rData = await docClient.scan(params).promise();
        return rData;
    },
    updateTable: async(params) => {
        const updateResult = docClient.update(params, function(err, data) {
            if (err) {
                console.log('DBOperations', '', '', "Update Table", err, 'ERROR');
            } 
        });

        return updateResult
    }, 
    scanTableWithParameter: async(scanInput) => {
        const result = await docClient.scan(scanInput).promise() /*, function (error, data){
            if(error){
                console.log('DBOperations', '', '', "Scan Table", error, 'ERROR');
            }else{
                return data;
            }
        });*/
        return result;
    }
}
