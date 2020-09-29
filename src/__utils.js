// @flow

import moment from 'moment-timezone'

export type MomentType = typeof moment

const datetimeDisplay = (
    datetime: string,
    parseFormat: string = 'DD/mm/YYYY hh:mm:ss',
    desiredFormat: string = 'DD/mm/YYYY hh:mm:ss',
    zone: string = 'AUSTRALIA/MELBOURNE'
) => moment(datetime.trim(), parseFormat).tz(zone).format(desiredFormat)

const timestamp = (
    datetime: string,
    dateFormat: string = 'DD/MM/YYYY hh:mm:ss',
    zone: string = 'AUSTRALIA/MELBOURNE'
) => moment(datetime.trim(), dateFormat).tz(zone).unix()

const datetimeObject: MomentType = (
    datetime: string,
    parseFormat: string = 'DD/mm/YYYY hh:mm:ss',
    zone: string = 'AUSTRALIA/MELBOURNE'
) => moment(datetime.trim(), parseFormat).tz(zone)

const today: MomentType = (zone: string = 'AUSTRALIA/MELBOURNE') =>
    moment().tz(zone)

// eslint-disable-next-line import/prefer-default-export
export { timestamp, datetimeDisplay, today, datetimeObject }
