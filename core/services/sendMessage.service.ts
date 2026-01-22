const spreadsheetUrl =
  'https://script.google.com/macros/s/AKfycbznDXmsvCJCR0wYjsjYc2O33g2WFmmIfl4Fs90gkq7jqdSCueoe8lMgoM-JWCLDyr6ITQ/exec'

import { Message } from '../models/Message.interface'

export const sendMessage = async (message: Message): Promise<boolean> => {
  const formData = new FormData()
  const date = new Date().toLocaleString()
  formData.append('Date', date)
  formData.append('Name', message.name)
  formData.append('Email', message.email)
  formData.append('Phone', message.phone ? message.phone : '')
  formData.append('Messahe', message.message ? message.message : '')
  try {
    await fetch(spreadsheetUrl, {
      method: 'POST',
      body: formData,
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
