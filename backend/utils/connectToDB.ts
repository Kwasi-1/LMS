import {connect}from "mongoose"

export const connectToDB = async() => {
 await connect(process.env.MONGO_DB_CONNECTION_STRING || "").then(() => {
    console.log("Connected to Database")
  }).catch((err) => {
    console.log(err)
  })
}