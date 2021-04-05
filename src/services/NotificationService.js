const fetch = require("node-fetch")
const config = require("../config/notificationKey")
const { fixTextFormat } = require("../lib/utils")

class NotificationService {
    async sendNotification({ title, description, url }) {
        var notification = {
            'title': fixTextFormat(title),
            'body': fixTextFormat(description),
            'click_action': url,
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