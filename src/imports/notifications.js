import { Notify } from 'quasar';

Notify.setDefaults({
    position: 'bottom-right',
    timeout: 4000,
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

export function notifySuccess(msg){
  Notify.create({
      color: 'positive',
      message: msg,
      icon: "check"
    })
}