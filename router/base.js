const express = require("express")
const router = express.Router()
const { successify, errorify } = require("../utils")
const fs = require("fs")


router.get("/contents", async (req, res) => {
  let fpath = req.query.fpath
  console.log(fpath)
  if(!!fpath){
    let n = fpath.length
    if(fpath.startsWith("\"") || fpath.startsWith("\'")) fpath = fpath.slice(1, n - 1)
    try{
      let contents = await fs.promises.readFile(fpath)
      return successify(res, { message: contents.toString()})
    }
    catch(e){
      console.log(e)
      return errorify(res, { error: e })
    }
  }
  else{
    return errorify(res, { error: "file not present" })
  }
})



module.exports = {
  baseRouter: router
}
