const userModel = require('../models/userModel')
const booksModel = require('../models/booksModel')
const reviewModel = require("../models/reviewModel")
const moment =require('moment')
const mongoose = require("mongoose")

// let ObjectId = mongoose.Schema.Types.ObjectId



const isValid = function (value) {

    if (!value || typeof value != "string" || value.trim().length == 0) return false;
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createReview = async function (req, res) {

    try {
        const bookId=req.params.bookId
        const data = req.body
        const {reviewedBy, rating } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Request body can not be empty" })
        }

        if (!bookId) {
            return res.status(400).send({ status: false, msg: "Book-Id is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "Invalid Book-Id" });
        }

        const booksDetails =await booksModel.findOne({_id:bookId, isDeleted:false})
        // console.log(booksDetails)
        if(!booksDetails){
            return res.status(404).send({ status: false, msg: "Book-Id is not found in DB" });
        }

        if (!isValid(reviewedBy)) {
           data.reviewedBy="Guest"
        }
        if (!rating || typeof rating != "number" || rating < 1 || rating > 5) {
            return res.status(400).send({ status: false, msg: "rating is required from 1 to 5" });
        }
        data.reviewedAt =  moment().format("DD-MM-YYYY")
        data.bookId=bookId
        // console.log(data)
        const reviewCreated = await reviewModel.create(data)
        return res.status(201).send({ status: true, message: "Success", data: reviewCreated })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}


module.exports={createReview}
