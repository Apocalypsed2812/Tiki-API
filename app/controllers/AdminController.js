const Account = require('../models/Account');
const Staff = require('../models/Staff');
const bcrypt = require("bcrypt");
const checkLogin = require('../models/CheckLogin')
const Transaction = require('../models/Transaction')

class AdminController {

    // [GET] /admin/home
    async renderHome(req, res, next) {
        const account = await Account.find({role: 'user'}).lean()
        console.log(account)
        res.render('./admin/home', {account});
    }

    async renderStaff(req, res){
        const staff = await Staff.find({}).lean()
        console.log(staff)
        res.render('./admin/staff', {staff})
    }

    deleteUser(req, res){
        let {id} = req.params
        if(!id){
            return res.json({code: 1, message: "Thiếu tham số id"})
        }
        Account.findByIdAndDelete(id)
        .then(result => {
            if(result){
                return res.json({code: 0, message: "Xóa user thành công"})
            }
            else{
                return res.json({code: 2, message: "Không tìm thấy user để xóa"})
            }
        
        })
        .catch(e => {
            return res.json({code: 3, message: e.message})
        })
    }

    addStaff(req, res){
        let {name, phone, email, address} = req.body;
        let data_staff = {
            email,
            name,
            phone,
            address, 
        };
        let password = '123456789'
        let hashed = bcrypt.hashSync(password, 10)
        let data_account = {
            email,
            password: hashed,
            role: 'staff',
        };
        const staff = new Staff(data_staff);
        staff.save();
        const account = new Account(data_account);
        account.save();
        console.log("Thành công")
        res.redirect("/admin/staff");
    }

    editStaff(req, res){
        let {id} = req.params
        let {email, name, phone, address} = req.body
        console.log(id)
        if(!id){
            return res.json({code: 1, message: "Thiếu tham số id"})
        }
        Staff.findByIdAndUpdate(id, {name, phone, address, email}, {
            new: true
        })
        .then(result => {
            if(result){
                return res.json({code: 0, message: "Cập nhật nhân viên thành công"})
            }
            else{
                return res.json({code: 2, message: "Không tìm thấy nhân viên để cập nhật"})
            }  
        })
        .catch(e => {
            return res.json({code: 3, message: e.message})
        })
    }
}

module.exports = new AdminController;