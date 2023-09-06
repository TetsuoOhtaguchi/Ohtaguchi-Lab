import dayjs from 'dayjs'

/**
 * 日付をYYYY/MM/DDに自動成形する
 */
export const formatDate = (beforeDate: string) => {
  const afterDate = dayjs(beforeDate).format('YYYY/MM/DD')
  return afterDate
}
