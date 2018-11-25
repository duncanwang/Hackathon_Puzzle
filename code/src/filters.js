import dayjs from 'dayjs'

export default {
  dateTimeConvert (time) {
    return 'time'
  },
  dateConvert (time) {
    return time && dayjs(time).format('YYYY-MM-DD')
  }
}
