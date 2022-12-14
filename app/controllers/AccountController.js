const bcrypt = require('bcrypt');
const Account = require('../models/Account');
const Staff = require('../models/Staff');
const Product = require('../models/Product');
const Category = require('../models/Category');
const multiparty = require('multiparty');
const upload = require('../../upload');
const crypto = require('crypto');
const nodemailer =  require('nodemailer');
const OTP = require('../models/OTP');
const otp = require('../../util/OTP');
const jwt = require("jsonwebtoken");
const credentials = require("../../credentials");
const checkLogin = require('../models/CheckLogin')
const block_account = require('../../util/block_account');

class AccountController{

    async renderHome(req, res){
        const category = await Category.find({}).lean()
        let PAGE_SKIP = 10
        let page = req.query.page || 0
        //console.log(page)
        let skip = PAGE_SKIP * page
        let count = await Product.count({});
        let product = await Product
                .find({})
                .skip(skip)
                .limit(PAGE_SKIP)
                .lean()
        res.render('./index', {product, category, page, count})
    }

    async renderCategoryProduct(req, res){
        let {category_product} = req.params
        const category = await Category.find({}).lean()
        let PAGE_SKIP = 10
        let page = req.query.page || 0
        //console.log(page)
        let skip = PAGE_SKIP * page
        let count = await Product.count({});
        let product = await Product
                .find({category: category_product})
                .skip(skip)
                .limit(PAGE_SKIP)
                .lean()
        res.render('./index', {product, category, page, count})
    }

    async renderSearch(req, res){
        let {name_search} = req.body
        const category = await Category.find({}).lean()
        let PAGE_SKIP = 10
        let page = req.query.page || 0
        //console.log(page)
        let skip = PAGE_SKIP * page
        let count = await Product.count({});
        let product = await Product
                .find({name: name_search})
                .skip(skip)
                .limit(PAGE_SKIP)
                .lean()
        res.render('./index', {product, category, page, count})
    }



    async renderProductDetail(req, res){
        let {id} = req.params
        const product_detail = await Product.find({_id: id}).lean()
        let product_category = product_detail[0].category
        const list_product_category = await Product.find({category: product_category}).lean()
        const product = await Product.find({}).lean()
        res.render('./product_detail', {product, product_detail, list_product_category})
    }

    renderForgotPassword(req, res){
        res.render('./forgot_password')
    }

    async createOTP(req, res, next) {
        const { phone, email, type} = req.body;
        const acc = await Account.findOne({ phone, email }).lean();
        if (!acc) {
            return res.json({ code: 1, message: "T??i kho???n kh??ng t???n t???i!" });
        }

        const otpfind = await OTP.findOne({ phone, type });
        if (otpfind) {
            await OTP.findOneAndDelete({ phone, type });
        }
        const otpCode = otp.createOTP();
        const data = { phone, code: otpCode, type };
        const o = new OTP(data);
        await o.save();
        otp.deleteOTP(o._id);
        console.log("OTP CODE: ", otpCode);
        sendMailOTP(email, otpCode, type);
        return res.json({ code: 0, message: "Create OTP Sucessfully" });
    }


    async forgotPassword(req, res){
        const { phone_forgot, email_forgot, otp_code } = req.body;
        const optFind = await OTP.findOne({ phone: phone_forgot, code: otp_code, type: "forgot_password" });
        if (!optFind) {
            // req.session.flash = {
            //     type: "error",
            //     message: "Otp Code is not correct!",
            //     title: "Error!",
            // };
            console.log("OTP ???? h???t h???n")
            res.redirect("/forgot_password");
            return;
        } else {
            const tokenObj = { phone_forgot };
            const token = jwt.sign(tokenObj, credentials.cookieSecret);
            res.cookie("resetpass", token, {
                maxAge: 900000,
                httpOnly: true,
            });
            res.redirect("/reset_password");
            return;
        }
    }

    renderResetPassword(req, res){
        res.render('./reset_password')
    }

    async resetPassword(req, res){
        const token = req.cookies.resetpass;
        if (!token) {
            console.log("Token c???n thi???t ????? reset password")
            res.redirect("/login");
            return;
        }
        const decoded = jwt.verify(token, credentials.cookieSecret);
        const account = await Account.findOne({
            phone: decoded.phone_forgot,
        }).lean();

        if (!account) {
            console.log("Ta?? kho???n kh??ng t???n t???i")
            res.redirect("/login");
        }
        const newPassword = req.body.password;
        const confirmPassword = req.body.password_confirm;
        if (newPassword !== confirmPassword) {
            //res.send("M???t kh???u kh??ng kh???p");
            console.log("M???t kh???u kh??ng kh???p")
        } else {
            console.log(account)
            const hash = await bcrypt.hash(newPassword, 10);
            await Account.findOneAndUpdate(
                { _id: account._id },
                { password: hash }
            );
            return res.json({code: 0, message: 'Reset m???t kh???u th??nh c??ng'})
        }
    }

    // renderRegister(req, res, next) {
    //     //delete req.session.user_id;
    //     let error = req.flash('error') || ''
    //     res.render("./register", {error});
    // }

    async loginByAccount(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        
        if(!email.includes('@')){
            return res.json({code: 1, message: 'Email kh??ng h???p l???'})
        }

        let account = await Account.findOne({ email });
        if (account) {
            if (bcrypt.compareSync(password, account.password)) {
                req.session.user_id = account._id;
                if (account.role === "admin") {
                    return res.json({code: 0, message: '????ng nh???p th??nh c??ng'})
                } 
                else if(account.role === "user") {
                    return res.json({code: 1, message: '????ng nh???p th??nh c??ng', data: account})
                } 
                else if(account.role === "staff") {
                    return res.json({code: 2, message: '????ng nh???p th??nh c??ng', data: account})
                } 
            } 
            else {
                return res.json({code: 3, message: 'Sai m???t kh???u'})
            }
        } 
        else {
            return res.json({code: 4, message: 'T??i kho???n kh??ng t???n t???i'})
        }
    }

    logOut(req, res, next) {
        delete req.session.user_id;
        // delete req.session.change_password;
        res.redirect('/')
    }

    async register(req, res, next) {
        let {email, password, rePassword} = req.body
        if(password !== rePassword){
            return res.json({code: 1, message: 'M???t kh???u kh??ng kh???p'})
        }
        if(!email.includes('@')){
            return res.json({code: 2, message: 'Email kh??ng h???p l???'})
        }
        const accountExist = await Account.findOne({email})
        console.log(accountExist)
        if(accountExist){
            return res.json({code: 3, message: 'Email ???? t???n t???i'})
        }
        const hashed = bcrypt.hashSync(password, 10)
        let data = {
            email,
            password: hashed,
            role: 'user'
        }
        const account = new Account(data)
        account.save()
        return res.json({code: 0, message: '????ng k?? th??nh c??ng'})
    }

    async checkChangePassword(req, res){
        let account = await Account.find({_id: req.session.user_id})
        if(account.token === 0){
            res.redirect('/change_password')
        }
    }

    async changePassword(req, res){
        let {old_password, new_password, re_new_password} = req.body
        const account = await Account.findOne({ _id: req.session.user_id }).lean();
        
        if(!bcrypt.compareSync(old_password, account.password)){
            return res.json({code: 1, message: 'M???t kh???u c?? kh??ng ????ng'})
        }
        if(new_password !== re_new_password){
            return res.json({code: 2, message: 'M???t kh???u m???i kh??ng kh???p'})
        }
        const hash = await bcrypt.hash(new_password, 10);
        await Account.findByIdAndUpdate(account._id, {password: hash}, {
            new: true
        })
        .then(result => {
            if(result){
                return res.json({code: 0, message: "?????i m???t kh???u th??nh c??ng"})
            }
            else{
                return res.json({code: 3, message: "Kh??g t??m th???y t??i kho???n ????? ?????i m???t kh???u"})
            }  
        })
        .catch(e => {
            return res.json({code: 4, message: e.message})
        })
    }

}

// send Mail
function sendMail(email, username, password) {
    //Ti???n h??nh g???i mail, n???u c?? g?? ???? b???n c?? th??? x??? l?? tr?????c khi g???i mail
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        //secure: true,
        auth: {
            user: 'phamhuynhanhtien123@gmail.com', //T??i kho???n gmail v???a t???o
            pass: 'anhtien2812' //M???t kh???u t??i kho???n gmail v???a t???o
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `Send Email By Nodemailer`
    contentHTML = `<p>Username c???a b???n l?? ${username} </p> 
                    <p>Password c???a b???n l?? ${password} </p> 
                    <p>B???n ???? c?? th??? ti???n h??nh ????ng nh???p v?? ?????i m???t kh???u</p>`;
    var mainOptions = { // thi???t l???p ?????i t?????ng, n???i dung g???i mail
        from: 'phamhuynhanhtien123@gmail.com',
        to: email,
        subject: 'G???i Username v?? Password cho v?? ??i???n t???',
        text: content,
        html: contentHTML, //N???i dung html m??nh ???? t???o tr??n kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            //req.flash('mess', 'L???i g???i mail: '+err); //G???i th??ng b??o ?????n ng?????i d??ng
            //res.redirect('/login');
        } else {
            console.log('Message sent: ' +  info.response);
            //res.redirect('/login');
        }
    });
}

// send Mail
function sendMailOTP(email, code, type) {
    //Ti???n h??nh g???i mail, n???u c?? g?? ???? b???n c?? th??? x??? l?? tr?????c khi g???i mail
    var transporter =  nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'phamhuynhanhtien123@gmail.com', //T??i kho???n gmail v???a t???o
            pass: 'anhtien2812' //M???t kh???u t??i kho???n gmail v???a t???o
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    var content = '';
    content += `Send Email By Nodemailer`
    contentHTML = `<div>
                        <p>M?? OTP c???a b???n l?? ${code} </p>  
                        <p>Th???i h???n nh???p OTP l?? 1 ph??t</p>
                    </div>`;
    var mainOptions = { // thi???t l???p ?????i t?????ng, n???i dung g???i mail
        from: 'phamhuynhanhtien123@gmail.com',
        to: email,
        subject: 'G???i OTP ????? l???y l???i m???t kh???u',
        text: content,
        html: contentHTML, //N???i dung html m??nh ???? t???o tr??n kia :))
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            //req.flash('mess', 'L???i g???i mail: '+err); //G???i th??ng b??o ?????n ng?????i d??ng
            //res.redirect('/login');
        } else {
            console.log('Message sent: ' +  info.response);
            //res.redirect('/login');
        }
    });
}

module.exports = new AccountController
