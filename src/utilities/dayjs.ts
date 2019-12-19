import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const createDayjs = (date?: string) => {
  return dayjs(date).utcOffset(9)
}
