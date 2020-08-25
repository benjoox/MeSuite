import moment from 'moment-timezone'

const timestamp = (
    datetime,
    dateFormat = 'YYYY-MM-DDTHH:mm:ss',
    zone = 'AUSTRALIA/MELBOURNE'
) => {
    return moment(datetime.trim(), dateFormat).tz(zone).unix()
}

// eslint-disable-next-line import/prefer-default-export
export { timestamp }
