// @flow

import moment from 'moment-timezone'

const timestamp = (
    datetime: string,
    dateFormat: string = 'YYYY-MM-DDTHH:mm:ss',
    zone: string = 'AUSTRALIA/MELBOURNE'
) => {
    return moment(datetime.trim(), dateFormat).tz(zone).unix()
}

function splitArray(list: Array<any>, capacity: number = 50): Array<any> {
    const { length } = list
    const sizeOfLastSubArray = length % capacity
    const partitionArray = []

    for (let k = 0; k < Math.floor(length / capacity); k += 1) {
        partitionArray.push(list.slice(k * capacity, (k + 1) * capacity))
    }

    // Add the remainder of the items
    if (sizeOfLastSubArray > 0) {
        const lastArray = list.slice(length - sizeOfLastSubArray)
        partitionArray.push(lastArray)
    }
    return partitionArray
}

export { timestamp, splitArray }
