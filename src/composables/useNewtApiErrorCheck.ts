/**
 * NewtのAPIリクエストで問題が発生した場合のエラーをチェックを行う
 */
export const useNewtApiErrorCheck = (status: string, code: string) => {
  if (status === '400' && code === 'BadRequest') {
    return {
      error: true,
      code: code,
      message: 'リクエストの形式に異常がみられた為'
    }
  } else if (status === '400' && code === 'InvalidFieldName') {
    return {
      error: true,
      code: code,
      message: '使用できないフィールドが含まれている為'
    }
  } else if (status === '400' && code === 'InvalidEmailAddress') {
    return {
      error: true,
      code: code,
      message: '正しくemail情報が送信されていない為'
    }
  } else if (status === '400' && code === 'InvalidGoogleRecaptchaSecret') {
    return {
      error: true,
      code: code,
      message: 'シークレットキーが登録されていない為'
    }
  } else if (status === '400' && code === 'InvalidGoogleRecaptchaToken') {
    return {
      error: true,
      code: code,
      message: '正しくトークンが送信されなかった為'
    }
  } else if (status === '400' && code === 'SpamDetected') {
    return {
      error: true,
      code: code,
      message: 'トークンに不正がみられた為'
    }
  } else if (status === '403' && code === 'QuotaExceeded') {
    return {
      error: true,
      code: code,
      message: 'メッセージ数が超過している為'
    }
  } else if (status === '404' && code === 'NotFound') {
    return {
      error: true,
      code: code,
      message: 'リクエスト対象が見つからない為'
    }
  } else if (status === '405' && code === 'MethodNotAllowed') {
    return {
      error: true,
      code: code,
      message: '対象外のリクエストメソッドを利用している為'
    }
  } else if (status === '413' && code === 'UploadedFileTooLarge') {
    return {
      error: true,
      code: code,
      message: 'アップロードされたファイルのサイズが大きすぎる為'
    }
  } else if (status === '429' && code === 'TooManyRequests') {
    return {
      error: true,
      code: code,
      message: 'リクエストの送信頻度が多すぎる為'
    }
  } else if (status === '500' && code === 'InternalServerError') {
    return {
      error: true,
      code: code,
      message: 'Newtのサーバエラーが発生した為'
    }
  } else {
    return {
      error: false,
      code: '',
      message: ''
    }
  }
}
