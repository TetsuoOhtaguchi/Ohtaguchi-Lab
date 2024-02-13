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
  if (field === 'message' && !containsJapanese(val)) {
    return true
  }
  if (field === 'message' && val) {
    return false
  }
}

// 日本語が5文字以上入力されているか判断する
function containsJapanese (text: string) {
  // 日本語文字列を含む正規表現パターン
  const japanesePattern =
    /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uFF66-\uFF9F]/g
  // テキスト中の日本語文字列を取得し、その数をカウント
  const japaneseMatches = text.match(japanesePattern)
  const japaneseCount = japaneseMatches ? japaneseMatches.length : 0
  return japaneseCount >= 5
}
