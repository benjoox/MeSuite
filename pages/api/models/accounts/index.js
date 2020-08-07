import * as dynamodb from '../../services/dynamoDb'

const TABLENAME = 'Accounts'

const schema = {
  AttributeDefinitions: [
    {
      AttributeName: "user_account_date_amount", 
      AttributeType: "S"
    },
    {
      AttributeName: "account", 
      AttributeType: "S"
    }
  ], 
  KeySchema: [
    {
      AttributeName: "user_account_date_amount", 
      KeyType: "HASH"
    },
    {
      AttributeName: "account", 
      KeyType: "RANGE"
    }
  ], 
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }, 
  TableName: TABLENAME
}

export async function getAccounts() {
    try {
        const response = await dynamodb.scan({
            TableName : TABLENAME
        })  
        return accountsMap(response.Items)
        
    } catch(err) {
        console.log('error in get Accounts ', err)
    }
    
}

/**
 * Converts the list of items from Accounts table
 * into a map of items array
 * 
 * @param {*} itemList 
 */
export const accountsMap = itemList => {

  const accountsMap = {}
  for(let k = 0; k < itemList.length; k++ ) {
      const accountName = itemList[k].account.S
      if(!accountsMap[accountName]) {
          accountsMap[accountName] = []
      }
      accountsMap[accountName].push(convertItemToAccountObj(itemList[k]))
  }

  return accountsMap
}

/**
 * Convert the a dynamodb account item to a a simple object
 * 
 * @param {obj} item 
 */
  
export const convertItemToAccountObj = item => {
    let result = {}
    for (let k in item) {
        if(k === "user_account_date_amount") {
            const primaryKeySplitted = item[k].S.split('_') 
            result = {
              ...result, 
              username: primaryKeySplitted[0],
              date: primaryKeySplitted[2],
              amount: primaryKeySplitted[3],
            }
        } else {
            result = {...result, [k]: item[k].S }
        }
    }
    return result 
}