var db = require('../models');
var customer = db.customer;
var user = db.user;



exports.getall = function (req, res) {
    customer.findAll().then((customer) => {
        res.status(200).json(customer);
    });
}

exports.getCustomerInfo = function (req, res) {
    var uid = req.params.uid;
    customer.findOne({ where: { user_uid: uid } }).then((customer) => {
        console.log()
        if (customer) {
            res.status(200).json({
                success: true,
                message: 'Successfully retrieved customer',
                customer_info: customer
            });
        }
    }).catch(Error, (err) => {
        res.status(409).json({
            success: false,
            message: 'Error getting customer',
            error: err
        });
    });
}

exports.addCustomer = function (req, res) {
    var customerData = req.body;

    user.findOne({ where: { email: customerData.email } }).then((response) => {
        if (response) {
            res.status(200).json({
                success: false,
                message: 'Email exists'
            });
        }
        else {
            user.create({
                email: customerData.email,
                password: customerData.password,
                role: 0,
                creation_date: new Date().toLocaleDateString()
            }).then((new_user) => {
                console.log('Successfully added customer...\n' + JSON.stringify(req.body, null, 2));
                customer.create({
                    firstName: customerData.firstName,
                    lastName: customerData.lastName,
                    user_uid: new_user.uid
                })
            }).then(() => {
                res.status(200).json({
                    success: true,
                    message: 'Successfully added customer!',
                    first_name: customerData.firstName,
                    last_name: customerData.lastName
                });
            }).catch(Error, (err) => {
                res.status(409).json({
                    success: false,
                    message: 'Error adding customer...',
                    error: err
                });
            });

        }

    })
}