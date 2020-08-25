const PRIMARY_KEY = 'user_account_date_amount'

/**
 * Convert the a dynamodb account item to a a simple object
 *
 * @param {obj} item
 */
export const convertItemToAccountObj = (item) => {
    let result = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const k in item) {
        if (k === PRIMARY_KEY) {
            const primaryKeySplitted = item[k].S.split('_')
            result = {
                ...result,
                username: primaryKeySplitted[0],
                date: primaryKeySplitted[2],
                amount: primaryKeySplitted[3],
                id: item[k].S,
            }
        } else {
            result = { ...result, [k]: item[k].S }
        }
    }
    return result
}

/**
 * Converts the list of items from Accounts table
 * into a map of items array
 *
 * @param {*} itemList
 */
export const accountsMap = (itemList) => {
    const map = {}
    for (let k = 0; k < itemList.length; k += 1) {
        const accountName = itemList[k].account.S
        if (!map[accountName]) {
            map[accountName] = []
        }
        map[accountName].push(convertItemToAccountObj(itemList[k]))
    }

    return accountsMap
}
