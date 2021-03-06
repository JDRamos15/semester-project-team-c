var db = require('../models');
var review = db.review;
var user_review = db.review_for_user;
var tour_review = db.tour_review;


exports.getAllReviews = function (req, res) {
    review.findAll().then((reviews) => {
        res.status(200).json(reviews);
    });
}

exports.getAllUserReviews = function (req, res) {
    user_review.findAll().then((user_reviews) => {
        res.status(200).json(user_reviews);
    })
}

exports.getAllTourReviews = function (req, res) {
    tour_review.findAll().then((tour_reviews) => {
        res.status(200).json(tour_reviews);
    })
}

exports.getReviewByRid = function (req, res) {
    var review_id = req.body.rid;
    review.findOne({where: { review_id : review_id }}).then((found_review) => {
        if (found_review.role == 1) {
            user_review.findOne({ where: { review_rid: review_id }}).then((userReview) => {
                res.status(200).json({
                    success: true,
                    message: 'Succesfully found user review',
                    review: userReview
                });
            }).catch(Error, (err) => {
                res.status(409).json({
                    success: false,
                    message: 'Error finding review',
                    error: err
                });
            });
        } else if(found_review.role == 0) {
            tour_review.findOne({ where: { review_rid: review_id }}).then((tourReview) => {
                res.status(200).json({
                    success: true,
                    message: 'Succesfully found tour review',
                    review: tourReview
                });
            }).catch(Error, (err) => {
                res.status(409).json({
                    success: false,
                    message: 'Error finding review',
                    error: err
                });
            });
        }
    }).catch(Error, (err) => {
        res.status(409).json({
            success: false,
            message: 'Error finding review',
            error: err
        });
    });
}

// exports.getUserReviewByRfuid = function (req, res) {
//     var user_review_id = req.body.rfuid;
//     user_review.findOne({where: {user_review_id : user_review_id}}).then((user_review) => {
//         if (user_review) {
//             res.status(200).json({
//                 success: true,
//                 message: 'Succesfully found user review',
//                 review: review
//             });
//         }
//     }).catch(Error, (err) => {
//         res.status(409).json({
//             success: false,
//             message: 'Error finding user review',
//             error: err
//         });
//     });
// }

// exports.getTourReviewByTrid = function (req, res) {
//     var tour_review_id = req.body.trid;
//     tour_review.findOne({where: {tour_review_id : tour_review_id}}).then((tour_review) => {
//         if (tour_review) {
//             res.status(200).json({
//                 success: true,
//                 message: 'Succesfully found tour review',
//                 review: review
//             });
//         }
//     }).catch(Error, (err) => {
//         res.status(409).json({
//             success: false,
//             message: 'Error finding tour review',
//             error: err
//         });
//     });
// }

exports.createUserReview = function(req, res) {
    var userReviewData = req.body.userReviewData;
    var uid = req.params.user_uid;
    var gid = req.params.reviewee_uid;
    review.create({
        type_of_review: 1,
        user_uid: uid
    }).then((new_review) => {
        console.log('Succesfully added review type...\n' + JSON.stringify(req.body, null, 2));
        user_review.create({
            review_message: userReviewData.review_message,
            stars: userReviewData.stars,
            review_rid: new_review.rid,
            reviewer_user_uid: uid,
            reviewee_uid: gid
        }).then(() => {
            res.status(200).json({
                success: true,
                message: 'Succesfully added user review!',
                review_message: userReviewData.review_message,
                stars: userReviewData.stars
            });
        })
    })
}

exports.createTourReview = function(req, res) {
    var uid = req.params.user_uid;
    var tourReviewData = req.body;
    var tid = red.params.tour_tid;
    review.create({
        type_of_review: 0,
        user_uid: uid
    }).then((new_review) => {
        console.log('Succesfully added review type...\n' + JSON.stringify(req.body, null, 2));
        tour_review.create({
            reviewcreatedAt: tourReviewData.review_message,
            stars: tourReviewData.stars,
            tour_tid: tid,
            review_rid: new_review.rid,
            review_user_uid: uid
        }).then(() => {
            res.status(200).json({
                success: true,
                message: 'Succesfully added tour review!',
                review_message: tourReviewData.review_message,
                stars: tourReviewData.stars
            });
        })
    })
}

exports.deleteReviewByRid = function (rid){
    console.log('Deleting rid with id: ' + rid + '...')
    return review.destroy({ where: { rid: rid } });
}

exports.deleteUserReviewsByRfuid = function (rfuid){
    console.log('Deleting rfuid with id: ' + rfuid + '...')
    return user_review.destroy({ where: { rfuid: rfuid } });
}

exports.deleteTourReviewsByTrid = function (trid){
    console.log('Deleting rfuid with trid: ' + trid + '...')
    return tour_review.destroy({ where: { trid: trid } });
}

