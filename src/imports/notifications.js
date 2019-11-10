import { Notify } from 'quasar';

Notify.setDefaults({
    position: 'bottom-right',
    timeout: 0,
    textColor: 'white',
    html: false,
    actions: [{ icon: 'close', color: 'white' }]
  })

export function notifyError(msg){
    Notify.create({
        color: 'negative',
        message: msg,
        icon: "error_outline"
      })
}