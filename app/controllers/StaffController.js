const Account = require('../models/Account');
const Category = require('../models/Category');
const bcrypt = require("bcrypt");
const upload = require('../../upload');
// const upload_file = require('../../upload_file');
const fs = require('fs');
const multiparty = require('multiparty');
const Product = require('../models/Product');
const Notification = require('../models/Notification');
// const Link = require('../models/Link');

class StaffController {
    
    // [GET] /staff/home
    async renderHome(req, res, next) {
        res.render('./staff/home', {book, count_material, loan, loanM});
    }  

    async renderCategory(req, res, next){
        const category = await Category.find({}).lean()
        res.render('./staff/category', {category})
    }

    async renderNotification(req, res, next){
        const notification = await Notification.find({}).lean()
        res.render('./staff/notification', {notification})
    }

    async renderProduct(req, res, next){
        const product = await Product.find({}).lean()
        res.render('./staff/product', {product})
    }

    renderProductDetail(req, res, next){
        res.render('./staff/product_detail')
    }

    async renderAddProduct(req, res){
        const account = req.account
        console.log("Account là",account)
        const category = await Category.find({}).lean()
        res.render('./staff/add_product', {category, account})
    }

    addCategory(req, res){
        let {name} = req.body;
        let data = {
           name,
        };
        const category = new Category(data);
        category.save();
        console.log("Thành công")
        res.redirect("/staff/category");
    }

    editCategory(req, res){
        let {id} = req.params
        let {name} = req.body
        console.log(id)
        if(!id){
            return res.json({code: 1, message: "Thiếu tham số id"})
        }
        Category.findByIdAndUpdate(id, {name}, {
            new: true
        })
        .then(result => {
            if(result){
                return res.json({code: 0, message: "Cập nhật danh mục thành công"})
            }
            else{
                return res.json({code: 2, message: "Không tìm thấy danh mục để cập nhật"})
            }  
        })
        .catch(e => {
            return res.json({code: 3, message: e.message})
        })
    }
	
	async getProductList(req, res){
		const {quantityProduct} = req.params
		let product = await Product.find({}).limit(quantityProduct).lean()
		console.log(product)
		if(!product){
			return res.json({code: 1, message: 'Có lỗi xảy ra'})
		}
		return res.json({code: 0, message: 'Lấy danh sách sản phẩm thành công', data: product})
	}
	
	async getProduct(req, res){
		const {id} = req.params
		let product = await Product.find({_id:id}).lean()
		console.log(product)
		if(!product){
			return res.json({code: 1, message: 'Có lỗi xảy ra'})
		}
		return res.json({code: 0, message: 'Lấy danh sách sản phẩm thành công', data: product})
	}

    addProduct(req, res){
        const form = new multiparty.Form()
        form.parse(req, (err, fields, files) => {
            if (err) console.log(err)
            var oldPath = files.image[0].path
            upload(oldPath, files.image[0].originalFilename)
            let product = new Product({
                name: fields.name[0], 
                quantity: fields.quantity[0], 
                description: fields.description[0],
                image: files.image[0].originalFilename,
                category: fields.category[0],
                old_price:fields.old_price[0],
                new_price:fields.new_price[0],
            })
            product.save()
            .then(() => {
                console.log("Thêm sản phẩm thành công")
                return res.json({code: 0, message: 'Thêm sản phẩm thành công'})
            })
            .catch(e => {
                console.log("Thêm sản phẩm thất bại" + e.message)
                return res.json({code: 1, message: 'Thêm sản phẩm thất bại'})
            })
        })
    }

    editProduct(req, res){
        let {id} = req.params
        let {name, quantity, description, old_price, new_price, category} = req.body
        console.log(id)
        if(!id){
            return res.json({code: 1, message: "Thiếu tham số id"})
        }
        Product.findByIdAndUpdate(id, {name, quantity, description, old_price, new_price, category}, {
            new: true
        })
        .then(result => {
            if(result){
                return res.json({code: 0, message: "Cập nhật sản phẩm thành công"})
            }
            else{
                return res.json({code: 2, message: "Không tìm thấy sản phẩm để cập nhật"})
            }  
        })
        .catch(e => {
            return res.json({code: 3, message: e.message})
        })
    }

    addNotify(req, res){
        const form = new multiparty.Form()
        form.parse(req, (err, fields, files) => {
            if (err) console.log(err)
            var oldPath = files.image[0].path
            upload(oldPath, files.image[0].originalFilename)
            let notify = new Notification({
                title: fields.title[0], 
                content: fields.content[0], 
                image: files.image[0].originalFilename,
            })
            notify.save()
            .then(() => {
                console.log("Thêm tin tức thành công")
                res.redirect('/staff/notification')
            })
            .catch(e => {
                console.log("Thêm tin tức thất bại" + e.message)
                res.redirect('/staff/notification')
            })
        })
    }

    editNotify(req, res){
        let {id} = req.params
        let {title, content} = req.body
        console.log(id)
        if(!id){
            return res.json({code: 1, message: "Thiếu tham số id"})
        }
        Notification.findByIdAndUpdate(id, {title, content}, {
            new: true
        })
        .then(result => {
            if(result){
                return res.json({code: 0, message: "Cập nhật thông báo thành công"})
            }
            else{
                return res.json({code: 2, message: "Không tìm thấy thông báo để cập nhật"})
            }  
        })
        .catch(e => {
            return res.json({code: 3, message: e.message})
        })
    }

    deleteNotify(req, res){
        let {id} = req.params
        if(!id){
            return res.json({code: 1, message: "Thiếu tham số id"})
        }
        Notification.findByIdAndDelete(id)
        .then(result => {
            if(result){
                return res.json({code: 0, message: "Xóa thông báo thành công"})
            }
            else{
                return res.json({code: 2, message: "Không tìm thấy thông báo để xóa"})
            }
        
        })
        .catch(e => {
            return res.json({code: 3, message: e.message})
        })
    }
}

module.exports = new StaffController;