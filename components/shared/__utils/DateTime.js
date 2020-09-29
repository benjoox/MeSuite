import moment from 'moment-timezone'

const timestamp = (
    datetime: string,
    dateFormat: string = 'YYYY-MM-DDTHH:mm:ss',
    zone: string = 'AUSTRALIA/MELBOURNE'
) => moment(datetime.trim(), dateFormat).tz(zone).unix()

// eslint-disable-next-line import/prefer-default-export
export { timestamp }
