require('dotenv').config()
if (process.env.MONGO_DB_HOST == undefined) {
    console.log("Error, you have to set MONGO_DB_HOST environment variable first")
} else {
    console.log(process.env.MONGO_DB_HOST)
}