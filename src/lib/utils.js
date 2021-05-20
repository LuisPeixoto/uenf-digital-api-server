const axios = require("axios")

exports.outputFormatPost = async (data, site) => {
    var post = []

    for (var element of data) {
        var image = await this.getImage(element)
        post.push(this.insertPosts(element, image, site))
    }
    console.log(site, post.length)

    return post
}

exports.pagination = (Page) => {
    let page = Page

    if (page == "" | page == null | !page) {
        page = 1;
    }

    return (10 * page) - 10
}

exports.getImageJSON = async (imageURLJson) => {
    const imageurl = await axios.get(imageURLJson)
    if (imageurl.data.length > 0) {
        return await imageurl.data[0].guid.rendered
    } else {
        return null
    }
}

exports.insertPosts = (element, image, site) => {
    return {
        title: element.title.rendered,
        date: element.date,
        url: element.guid.rendered,
        categories: element._embedded["wp:term"][0][0].name,
        site: site,
        image: image,
        description: element.excerpt.rendered
    }
}

exports.getImage = async (item, imageURL) => {
    var image = null
    if (item.featured_media != 0) {
        image = item._embedded["wp:featuredmedia"][0].source_url
    } else {
        image = await this.getImageJSON(item._links['wp:attachment'][0].href)
    }

    return image
}

exports.fixTextFormat = (text) => {
    return text
        .replace(/<[^>]*>?|\n|&nbsp;/gm, '')
        .replace(/&#8220;|&#8221;/gm, "“")
        .replace(/\[&hellip;]/gm, "...")
        .replace(/\&#038;|&amp;/gm, "&")
        .replace(/\&#8211;/gm, "-")
        .replace(/\&#8216;/gm, "‘")
        .replace(/\&#8217;/gm, "’")
}

exports.response = (data, page) => {
    return {
        totalResults: data.length,
        page: parseInt(page || 1),
        posts: data.map(post => {
            if (post.categories != '') {
                return {
                    title: this.fixTextFormat(post.title),
                    date: post.date,
                    url: post.url,
                    categories: post.categories,
                    site: post.site,
                    image: post.image,
                    description: this.fixTextFormat(post.description)
                }

            } else {
                return {
                    title: this.fixTextFormat(post.title),
                    description: this.fixTextFormat(post.description),
                    image: post.image,
                    date: post.date,
                    instagram: post.user_instagram,
                    categories: post.categories,
                }
            }
        })
    }
}