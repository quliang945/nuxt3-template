import { createDiscreteApi } from 'naive-ui'

const { message, dialog, loadingBar,notification } = createDiscreteApi(['message', 'dialog', 'loadingBar','notification'])

const utilMsg = {
  $message: message,
  $dialog: dialog,
  $loadingBar: loadingBar,
  $notification:notification
}

export default utilMsg
