/**
 * 入力チェックを行う
 */
type Field = 'name' | 'mail' | 'message'

export const useValidationCheck = (val: string, field: Field) => {
  // 名前の入力チェックを行う
  if (field === 'name' && !val) {
    return true
  }
  if (field === 'name' && val) {
    return false
  }

  // メールの入力チェックを行う
  if (
    field === 'mail' &&
    (!val ||
      !/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
        val
      ))
  ) {
    return true
  }
  if (
    field === 'mail' &&
    val &&
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(
      val
    )
  ) {
    return false
  }

  // メッセージの入力チェックを行う
  if (field === 'message' && !val) {
    return true
  }
  if (field === 'message' && val) {
    return false
  }
}
