const Tweet = require('../models/Tweet')

module.exports = {
    async index(req, res){
        const tweets = await Tweet.find({}).sort('-created_at')

        return res.json(tweets)
    },

    async store(req, res){
        const tweet = await Tweet.create(req.body)

        req.io.emit('tweet', tweet)// send aviso via socket

        return res.status(200).json(tweet)
    },
}