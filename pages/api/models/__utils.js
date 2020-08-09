import moment from 'moment-timezone'
export const timestamp = (datetime, dateFormat='YYYY-MM-DDTHH:mm:ss', zone='AUSTRALIA/MELBOURNE') => {
    return moment(datetime.trim(), dateFormat).tz(zone).unix()
}