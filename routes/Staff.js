const express = require('express');
const router = express.Router()
const StaffController = require('../app/controllers/StaffController');
const checkStaff = require("../app/middleware/checkStaff");
//const flash = require("../app/middleware/flashMessage");

//router.use(checkStaff);
router.get('/home', StaffController.renderHome)
router.get('/category', StaffController.renderCategory)
router.get('/notification', StaffController.renderNotification)
router.get('/product', StaffController.renderProduct)
router.get('/add_product', StaffController.renderAddProduct)
router.get('/product_detail', StaffController.renderProductDetail)
router.get('/getProductList/:quantityProduct', StaffController.getProductList)
router.get('/getProduct/:id&:quantityProduct', StaffController.getProduct)
router.get('/addQuantityProduct/:id', StaffController.addQuantityProduct)
router.post('/addCategory', StaffController.addCategory)
router.put('/editCategory/:id', StaffController.editCategory)
router.post('/addProduct', StaffController.addProduct)
router.put('/editProduct/:id', StaffController.editProduct)
router.post('/addNotify', StaffController.addNotify)
router.put('/editNotify/:id', StaffController.editNotify)
router.delete('/deleteNotify/:id', StaffController.deleteNotify)

module.exports = router;