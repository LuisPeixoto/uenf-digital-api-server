const fetch = require("node-fetch")
const config = require("../config/notificationKey")
const { fixTextFormat } = require("../lib/utils")

class NotificationService {
    async sendNotification({ title, description }) {
        var notification = {
            'title': fixTextFormat(title),
            'text': String(fixTextFormat(description).split('.', 1)),
        }

        var notification_body = {
            'to': '/topics/topic',
            'notification': notification
        }

        fetch('https://fcm.googleapis.com/fcm/send', {
            'method': 'POST',
            'headers': {
                'Authorization': 'key=' + config.notification.key,
                'Content-Type': 'application/json'

            },
            'body': JSON.stringify(notification_body)
        })
    }
}

module.exports = new NotificationService()