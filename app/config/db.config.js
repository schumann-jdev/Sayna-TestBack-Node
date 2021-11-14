module.exports = {
    HOST: "localhost",
    PORT: 27017,
    DB: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@schu.v1nkc.mongodb.net/${proccess.env.DB}?retryWrites=true&w=majority`
}