const express = require('express');
const router = express.Router();
const aws = require("aws-sdk")


const { createBooks, GetFilteredBook, getBooksById, updateByBookId, deleteBooksBYId } = require("../controllers/booksController")
const { createUser, loginUser } = require("../controllers/userController")
const { authentication, authorization } = require("../middleWare/userAuth")
const { createReview, updateReview, deleteReviewByBookIdAndReviewById } = require('../controllers/reviewController');


// User routes
router.post('/register', createUser);
router.post('/login', loginUser);

//book routes
router.post('/books', authentication, createBooks);
router.get('/books', authentication, GetFilteredBook);
router.get('/books/:bookId', authentication, getBooksById);
router.put('/books/:bookId', authentication, authorization, updateByBookId);
router.delete('/books/:bookId', authentication, authorization, deleteBooksBYId);

// Review routes
router.post('/books/:bookId/review', createReview)
router.put('/books/:bookId/review/:reviewId', updateReview);
router.delete('/books/:bookId/review/:reviewId', deleteReviewByBookIdAndReviewById);

//aws.........................................................
aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile = async(file) => {
    return new Promise(function(resolve, reject) {

        let s3 = new aws.S3({ apiVersion: "2006-03-01" })

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "Himanshu/" + file.originalname,
            Body: file.buffer
        }

        s3.upload(uploadParams, function(err, data) {
            if (err) {
                return reject({ "error": err })
            }

            console.log(data)
            console.log(" file uploaded succesfully ")
            return resolve(data.Location)
        })


    })
}

router.post("/write-file-aws", async function(req, res) {
    try {
        let files = req.files
        if (files && files.length > 0) {

            let uploadedFileURL = await uploadFile(files[0])
            res.status(201).send({ msg: "file uploaded succesfully", data: uploadedFileURL })
        } else {
            res.status(400).send({ msg: "No file found" })
        }
    } catch (err) {
        res.status(500).send({ msg: err })
    }
})


module.exports = router;