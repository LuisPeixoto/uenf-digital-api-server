const request = require("request")
const { outputFormatPost } = require("../lib/utils")
const database = require("../models/postModel")
const { sendNotification } = require("./NotificationService")

class PostService {
    async checkAndAddPost(urlApi, nameSite) {
        try {
            request(
                urlApi,
                { json: true },
                async (err, response, body
                ) => {
                    if (err) { return }

                    const apiJson = JSON.parse(JSON.stringify(body))
                    const posts = await outputFormatPost(apiJson, nameSite)
                    console.log(nameSite, posts.length)

                    for (var post of posts) {
                        var result = await database.find(post.title)

                        if (typeof(result) != 'undefined' && !result) {
                            await database.insert(post)
                            await sendNotification(post)
                        }
                    }



                })
        } catch (error) {
            if (error) { console.log(error) }
        }
    }

}

module.exports = new PostService()