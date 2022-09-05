// Toast message
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

function format_number(num) {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    let number = dollarUSLocale.format(parseInt(num));
    return number;
}

// Bật tắt modal login/register
let login_click = document.querySelector('#header-login')
let register_click = document.querySelector('#header-register')
let modal__overlay_login = document.querySelector('.modal__overlay-login')
let modal__overlay_register = document.querySelector('.modal__overlay-register')
let btn_back_login = document.querySelector('.btn-back-login')
let btn_back_register = document.querySelector('.btn-back-register')
let switch_register = document.querySelector('.switch-register')
let switch_login = document.querySelector('.switch-login')

//Bật modal login
if(login_click){
    login_click.onclick = () => {
        document.querySelector('.modal.modal-login').style.display = 'flex'
    }
}

//Bật modal register
if(register_click){
    register_click.onclick = () => {
        document.querySelector('.modal.modal-register').style.display = 'flex'
    }
}

//Khi click ra ngoài
if(modal__overlay_login){
    modal__overlay_login.onclick = () => {
        document.querySelector('.modal.modal-login').style.display = 'none'
    }
}

if(modal__overlay_register){
    modal__overlay_register.onclick = () => {
        document.querySelector('.modal.modal-register').style.display = 'none'
    }
}

//Khi click trở lại
if(btn_back_login){
    btn_back_login.onclick = () => {
        document.querySelector('.modal.modal-login').style.display = 'none'
    }
}

if(btn_back_register){
    btn_back_register.onclick = () => {
        document.querySelector('.modal.modal-register').style.display = 'none'
    }
}

//Chuyển đổi giữa login và register
if(switch_register){
    switch_register.onclick = () => {
        document.querySelector('.modal.modal-register').style.display = 'flex'
        document.querySelector('.modal.modal-login').style.display = 'none'
    }
}

if(switch_login){
    switch_login.onclick = () => {
        document.querySelector('.modal.modal-login').style.display = 'flex'
        document.querySelector('.modal.modal-register').style.display = 'none'
    }
}

// Click position for header staff
let header__staff_parent = document.querySelector('.header__staff-parent')
if(header__staff_parent){
    header__staff_parent.onclick = () => {
        document.querySelector('.header__staff-children').style.display = 'block'
    }
    // document.querySelector('.header__staff').onclick = () => {
    //     document.querySelector('.header__staff-children').style.display = 'none'
    // }
    // document.querySelector('.product-detail').onclick = () => {
    //     document.querySelector('.header__staff-children').style.display = 'none'
    // }
    // document.querySelector('.footer__admin').onclick = () => {
    //     document.querySelector('.header__staff-children').style.display = 'none'
    // }
}

// Xử lý đăng kí tài khoản
function handleRegister(email, password, rePassword){
    if(email === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập email",
        });
        return false
    }
    if(!email.includes('@')){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email không hợp lệ",
        });
        return false
    }
    if(password === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập mật khẩu",
        });
        return false
    }
    if(password.length < 6){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Mật khẩu phải có ít nhất 6 kí tự",
        });
        return false
    }
    if(rePassword === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập lại mật khẩu",
        });
        return false
    }
    if(password !== rePassword){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Mật khẩu không khớp",
        });
        return false
    }
    return true
}

const btn_register = document.querySelector('.btn-register')
btn_register.onclick = () => {
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    let rePassword = document.querySelector('#rePassword').value

    console.log(password, rePassword)

    if(!handleRegister(email, password, rePassword)){
        console.log('Có lỗi')
        return
    }

    fetch('/register', {
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}, 
		method: 'POST',
		body:'email=' + email + '&password=' + password + '&rePassword=' + rePassword,
	})
	.then(res => res.json())
	.then(json => {
		console.log(json)
		if(json.code === 0){
			Swal.fire({
                icon: "success",
                title: "Oops...",
                text: "Đăng kí thành công",
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.href = '/'
                }
            })	
		}
		else{
            console.log('Có lỗi xảy ra')
			Swal.fire({
                icon: "error",
                title: "Oops...",
                text: json.message,
            });
		}
	})
	.catch(e => console.log(e))
}

// Xử lý đăng nhập
function handleLogin(email, password){
    if(email === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập email",
        });
        return false
    }
    if(!email.includes('@')){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email không hợp lệ",
        });
        return false
    }
    if(password === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập mật khẩu",
        });
        return false
    }
    if(password.length < 6){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Mật khẩu phải có ít nhất 6 kí tự",
        });
        return false
    }
    return true
}

const btn_login = document.querySelector('.btn-login')
btn_login.onclick = () => {
    let email = document.querySelector('#email-login').value
    let password = document.querySelector('#password-login').value

    if(!handleLogin(email, password)){
        console.log('Có lỗi')
        return
    }

    fetch('/login', {
		headers:{
			'Content-Type':'application/x-www-form-urlencoded'
		}, 
		method: 'POST',
		body:'email=' + email + '&password=' + password,
	})
	.then(res => res.json())
	.then(json => {
		console.log(json)
        if(json.code === 0){
			Swal.fire({
                icon: "success",
                title: "Oops...",
                text: "Đăng nhập thành công",
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.href = '/admin/home'
                }
            })	
		}
		else if(json.code === 1){
			Swal.fire({
                icon: "success",
                title: "Oops...",
                text: "Đăng nhập thành công",
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.href = '/user/home'
                }
            })	
		}
        else if(json.code === 2){
			Swal.fire({
                icon: "success",
                title: "Oops...",
                text: "Đăng nhập thành công",
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.href = '/staff/product'
                }
            })	
		}
		else{
            console.log('Có lỗi xảy ra')
			Swal.fire({
                icon: "error",
                title: "Oops...",
                text: json.message,
            });
		}
	})
	.catch(e => console.log(e))
}

// View user
let admin_view_user = document.querySelectorAll('.admin_view_user')
admin_view_user.forEach(item => {
    item.onclick = () => {
        let email = item.getAttribute("data-username")
        let password = item.getAttribute("data-password")

        document.getElementById('username-view-user').innerHTML = email
        document.getElementById('password-view-user').innerHTML = password

        document.querySelector('.modal.modal-view-user').style.display = 'block'
    }
})

let btn_close_view_user = document.querySelector('.btn-close-view-user')
if(btn_close_view_user){
    btn_close_view_user.onclick = () => {
        document.querySelector('.modal.modal-view-user').style.display = 'none'
    }
}

let modal__overlay_view_user = document.querySelector('.modal__overlay-view')
if(modal__overlay_view_user){
    modal__overlay_view_user.onclick = () => {
        document.querySelector('.modal.modal-view-user').style.display = 'none'
    }
}

// Delete user
let btn_close_delete_user = document.querySelector('.btn-close-delete-user')
if(btn_close_delete_user){
    btn_close_delete_user.onclick = () => {
        document.querySelector('.modal.modal-delete-user').style.display = 'none'
    }
}

let admin_delete_user = document.querySelectorAll('.admin_delete_user')
admin_delete_user.forEach(item => {
    item.onclick = () => {
        let email = item.getAttribute("data-username")
        let id = item.getAttribute("data-id")

        document.getElementById('username-delete').innerHTML = email

        document.querySelector('.btn-delete-user').setAttribute("data-id", id)

        document.querySelector('.modal.modal-delete-user').style.display = 'block'
    }
})

let btn_delete_user = document.querySelector('.btn-delete-user')
if(btn_delete_user){
    btn_delete_user.onclick = () => {
        let id = btn_delete_user.getAttribute("data-id")
    
        fetch('/admin/deleteUser/' + id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Xóa người dùng thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/admin/home'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
    }    
}

// Add staff
let btn_add_staff = document.querySelector('.btn-add-staff')
if(btn_add_staff){
    btn_add_staff.onclick = () => {
        document.querySelector('.modal.modal-add-staff').style.display = 'block'
    }
}

let btn_close_add_staff = document.querySelector('.btn-close-add-staff')
if(btn_close_add_staff){
    btn_close_add_staff.onclick = () => {
        document.querySelector('.modal.modal-add-staff').style.display = 'none'
    }
}

// View staff
let admin_view_staff = document.querySelectorAll('.admin_view_staff')
admin_view_staff.forEach(item => {
    item.onclick = () => {
        let email = item.getAttribute("data-username")
        let name = item.getAttribute("data-name")
        let phone = item.getAttribute("data-phone")
        let address = item.getAttribute("data-address")
        
        document.getElementById('email-view-staff').innerHTML = email
        document.getElementById('name-view-staff').innerHTML = name
        document.getElementById('phone-view-staff').innerHTML = phone
        document.getElementById('address-view-staff').innerHTML = address

        document.querySelector('.modal.modal-view-staff').style.display = 'block'
    }
})

let btn_close_view_staff = document.querySelector('.btn-close-view-staff')
if(btn_close_view_staff){
    btn_close_view_staff.onclick = () => {
        document.querySelector('.modal.modal-view-staff').style.display = 'none'
    }
}

// Edit staff
let admin_edit_staff = document.querySelectorAll('.admin_edit_staff')
admin_edit_staff.forEach(item => {
    item.onclick = () => {
        let id = item.getAttribute("data-id")
        let email = item.getAttribute("data-username")
        let name = item.getAttribute("data-name")
        let phone = item.getAttribute("data-phone")
        let address = item.getAttribute("data-address")
        
        document.getElementById('email-edit-staff').value = email
        document.getElementById('name-edit-staff').value = name
        document.getElementById('phone-edit-staff').value = phone
        document.getElementById('address-edit-staff').value = address

        document.querySelector('.btn-edit-staff').setAttribute("data-id", id)

        document.querySelector('.modal.modal-edit-staff').style.display = 'block'
    }
})

let btn_close_edit_staff = document.querySelector('.btn-close-edit-staff')
if(btn_close_edit_staff){
    btn_close_edit_staff.onclick = () => {
        document.querySelector('.modal.modal-edit-staff').style.display = 'none'
    }
}

let btn_edit_staff = document.querySelector('.btn-edit-staff')
if(btn_edit_staff){
    btn_edit_staff.onclick = () => {
        let id = btn_edit_staff.getAttribute("data-id")
        let name = document.querySelector('#name-edit-staff').value
        let email = document.querySelector('#email-edit-staff').value
        let phone = document.querySelector('#phone-edit-staff').value
        let address = document.querySelector('#address-edit-staff').value

        console.log(id)
    
        fetch('/admin/editStaff/' + id, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }, 
            method: 'PUT',
            body:'name=' + name + '&phone=' + phone + '&address=' + address + '&email=' + email ,
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Sửa nhân viên thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/admin/staff'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
    }    
}

// View category
let admin_view_category = document.querySelectorAll('.admin_view_category')
admin_view_category.forEach(item => {
    item.onclick = () => {
        let name = item.getAttribute("data-name")
        
        document.getElementById('name-view-category').innerHTML = name

        document.querySelector('.modal.modal-view-category').style.display = 'block'
    }
})

let btn_close_view_category = document.querySelector('.btn-close-view-category')
if(btn_close_view_category){
    btn_close_view_category.onclick = () => {
        document.querySelector('.modal.modal-view-category').style.display = 'none'
    }
}

// Add Category
let btn_add_category = document.querySelector('.btn-add-category')
if(btn_add_category){
    btn_add_category.onclick = () => {
        document.querySelector('.modal.modal-add-category').style.display = 'block'
    }
}

let btn_close_add_category = document.querySelector('.btn-close-add-category')
if(btn_close_add_category){
    btn_close_add_category.onclick = () => {
        document.querySelector('.modal.modal-add-category').style.display = 'none'
    }
}

// Edit staff
let admin_edit_category = document.querySelectorAll('.admin_edit_category')
admin_edit_category.forEach(item => {
    item.onclick = () => {
        let id = item.getAttribute("data-id")
        let name = item.getAttribute("data-name")
        
        document.getElementById('name-edit-category').value = name

        document.querySelector('.btn-edit-category').setAttribute("data-id", id)

        document.querySelector('.modal.modal-edit-category').style.display = 'block'
    }
})

let btn_close_edit_category = document.querySelector('.btn-close-edit-category')
if(btn_close_edit_category){
    btn_close_edit_category.onclick = () => {
        document.querySelector('.modal.modal-edit-category').style.display = 'none'
    }
}

let btn_edit_category = document.querySelector('.btn-edit-category')
if(btn_edit_category){
    btn_edit_category.onclick = () => {
        let id = btn_edit_category.getAttribute("data-id")
        let name = document.querySelector('#name-edit-category').value
        console.log(id)
    
        fetch('/staff/editCategory/' + id, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }, 
            method: 'PUT',
            body:'name=' + name,
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Sửa danh mục thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/staff/category'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
    }    
}

// View Product
let staff_view_product = document.querySelectorAll('.view-product')
staff_view_product.forEach(item => {
    item.onclick = () => {
        let name = item.getAttribute("data-name")
        let description = item.getAttribute("data-description")
        let category = item.getAttribute("data-category")
        let image = item.getAttribute("data-image")
        
        document.getElementById('view-name-product').innerHTML = name
        document.getElementById('view-description-product').innerHTML = description
        document.getElementById('view-category-product').innerHTML = category
        document.getElementById('view-image-product').src = '/assets/img/' + image

        document.querySelector('.modal.modal-view-product').style.display = 'block'
    }
})

let btn_close_view_product = document.querySelector('.btn-close-view-product')
if(btn_close_view_product){
    btn_close_view_product.onclick = () => {
        document.querySelector('.modal.modal-view-product').style.display = 'none'
    }
}

// Edit product
let staff_edit_product = document.querySelectorAll('.edit-product')
staff_edit_product.forEach(item => {
    item.onclick = () => {
        let id = item.getAttribute("data-id")
        let name = item.getAttribute("data-name")
        let description = item.getAttribute("data-description")
        let category = item.getAttribute("data-category")
        let quantity = item.getAttribute("data-quantity")
        let old_price = item.getAttribute("data-old_price")
        let new_price = item.getAttribute("data-new_price")
        let image = item.getAttribute("data-image")
        
        document.getElementById('name-edit-product').value = name
        document.getElementById('description-edit-product').value = description
        document.getElementById('category-edit-product').value = category
        document.getElementById('quantity-edit-product').value = quantity
        document.getElementById('old_price-edit-product').value = old_price
        document.getElementById('new_price-edit-product').value = new_price

        document.querySelector('.btn-edit-product').setAttribute("data-id", id)

        document.querySelector('.modal.modal-edit-product').style.display = 'block'
    }
})

let btn_close_edit_product = document.querySelector('.btn-close-edit-product')
if(btn_close_edit_product){
    btn_close_edit_product.onclick = () => {
        document.querySelector('.modal.modal-edit-product').style.display = 'none'
    }
}

let btn_edit_product = document.querySelector('.btn-edit-product')
if(btn_edit_product){
    btn_edit_product.onclick = () => {
        let id = btn_edit_product.getAttribute("data-id")
        let name = document.querySelector('#name-edit-product').value
        let quantity = document.querySelector('#quantity-edit-product').value
        let description = document.querySelector('#description-edit-product').value
        let old_price = document.querySelector('#old_price-edit-product').value
        let new_price = document.querySelector('#new_price-edit-product').value
        let category = document.querySelector('#category-edit-product').value

        console.log(id)
    
        fetch('/staff/editProduct/' + id, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }, 
            method: 'PUT',
            body:'name=' + name + '&quantity=' + quantity + '&description=' + description + '&old_price=' + old_price  + '&new_price=' + new_price + '&category=' + category,
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Sửa sản phẩm thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/staff/product'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
    }    
}

// Add Notification
let btn_add_notify = document.querySelector('.btn-add-notify')
if(btn_add_notify){
    btn_add_notify.onclick = () => {
        document.querySelector('.modal.modal-add-notify').style.display = 'block'
    }
}

let btn_close_add_notify = document.querySelector('.btn-close-add-notify')
if(btn_close_add_notify){
    btn_close_add_notify.onclick = () => {
        document.querySelector('.modal.modal-add-notify').style.display = 'none'
    }
}

// Edit Notification
let staff_edit_notify = document.querySelectorAll('.edit-notify')
staff_edit_notify.forEach(item => {
    item.onclick = () => {
        let id = item.getAttribute("data-id")
        let title = item.getAttribute("data-title")
        let content = item.getAttribute("data-content")
        
        document.getElementById('title-edit-notify').value = title
        document.getElementById('content-edit-notify').value = content

        document.querySelector('.btn-edit-notify').setAttribute("data-id", id)

        document.querySelector('.modal.modal-edit-notify').style.display = 'block'
    }
})

let btn_close_edit_notify = document.querySelector('.btn-close-edit-notify')
if(btn_close_edit_notify){
    btn_close_edit_notify.onclick = () => {
        document.querySelector('.modal.modal-edit-notify').style.display = 'none'
    }
}

let btn_edit_notify = document.querySelector('.btn-edit-notify')
if(btn_edit_notify){
    btn_edit_notify.onclick = () => {
        let id = btn_edit_notify.getAttribute("data-id")
        let title = document.querySelector('#title-edit-notify').value
        let content = document.querySelector('#content-edit-notify').value

        console.log(id)
    
        fetch('/staff/editNotify/' + id, {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }, 
            method: 'PUT',
            body:'title=' + title + '&content=' + content,
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Sửa thông báo thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/staff/notification'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
    }    
}

// Delete Notification
let btn_close_delete_notify = document.querySelector('.btn-close-delete-notify')
if(btn_close_delete_notify){
    btn_close_delete_notify.onclick = () => {
        document.querySelector('.modal.modal-delete-notify').style.display = 'none'
    }
}

let staff_delete_notify = document.querySelectorAll('.delete-notify')
staff_delete_notify.forEach(item => {
    item.onclick = () => {
        let id = item.getAttribute("data-id")

        document.querySelector('.btn-delete-notify').setAttribute("data-id", id)

        document.querySelector('.modal.modal-delete-notify').style.display = 'block'
    }
})

let btn_delete_notify = document.querySelector('.btn-delete-notify')
if(btn_delete_notify){
    btn_delete_notify.onclick = () => {
        let id = btn_delete_notify.getAttribute("data-id")
    
        fetch('/staff/deleteNotify/' + id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Xóa thông báo thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/staff/notification'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
    }    
}

// View Notify
let staff_view_notify = document.querySelectorAll('.view-notify')
staff_view_notify.forEach(item => {
    item.onclick = () => {
        let title = item.getAttribute("data-title")
        let content = item.getAttribute("data-content")
        let image = item.getAttribute("data-image")
        
        document.getElementById('view-title-notify').innerHTML = title
        document.getElementById('view-content-notify').innerHTML = content
        document.getElementById('view-image-notify').src = '/assets/img/' + image

        document.querySelector('.modal.modal-view-notify').style.display = 'block'
    }
})

let btn_close_view_notify = document.querySelector('.btn-close-view-notify')
if(btn_close_view_notify){
    btn_close_view_notify.onclick = () => {
        document.querySelector('.modal.modal-view-notify').style.display = 'none'
    }
}

// Check login for add to cart
let btn_add_to_cart = document.querySelector('.btn-add-to-cart')
if(btn_add_to_cart){
    btn_add_to_cart.onclick = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Bạn cần đăng nhập để thực hiện chức năng này',
        })
    }   
}

// Check login for buy product
let btn_buy = document.querySelector('.btn-buy')
if(btn_buy){
    btn_buy.onclick = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Bạn cần đăng nhập để thực hiện chức năng này',
        }) 
    }   
}

//Add quantity product from cart
let add_quantity_product_detail = document.querySelectorAll('.add-quantity-product-detail')
if(add_quantity_product_detail){
    add_quantity_product_detail.forEach((item, index) => {
        item.onclick = () => {
            console.log("Đã vào")
            let current_quantity_product_detail = document.querySelectorAll('.current-quantity-product-detail')
            //Hiển thị số lượng thay đổi
            let current_quantity_display = current_quantity_product_detail[index].textContent
            let new_quantity_display = parseInt(current_quantity_display) + 1
            current_quantity_product_detail[index].innerHTML = new_quantity_display
        }
    })   
}

//Subtract quantity product from cart
let sub_quantity_product_detail = document.querySelectorAll('.sub-quantity-product-detail')
if(sub_quantity_product_detail){
    sub_quantity_product_detail.forEach((item, index) => {
        item.onclick = () => {
            console.log("Đã vào")
            let current_quantity_product_detail = document.querySelectorAll('.current-quantity-product-detail')
            //Hiển thị số lượng thay đổi
            let current_quantity_display = current_quantity_product_detail[index].textContent
            let new_quantity_display = parseInt(current_quantity_display) - 1
            if(new_quantity_display < 0){
                new_quantity_display = 0
            }
            current_quantity_product_detail[index].innerHTML = new_quantity_display
        }
    })   
}


// Add product to cart
let btn_user_add_to_cart = document.querySelector('.btn-user-add-to-cart')
if(btn_user_add_to_cart){
    btn_user_add_to_cart.onclick = () => {
        let id = btn_user_add_to_cart.getAttribute("data-id")
        let quantity_product = btn_user_add_to_cart.getAttribute("data-quantity")
        let quantity = document.querySelector('.current-quantity-product-detail').textContent

        console.log(quantity_product, quantity)
        // if(quantity_product < quantity){
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Số lượng sản phẩm không đủ",
        //     }).then((result) => {
        //         if(result.isConfirmed){
        //             window.location.href = '/user/product_detail'
        //         }
        //     })	
        // }

        fetch('/user/addToCart', {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }, 
            method: 'POST',
            body:'id=' + id + '&quantity=' + quantity + '&quantity_product=' + quantity_product,
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Thêm sản phẩm vào giỏ hàng thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        document.querySelector('.header__cart-list').classList.add('header__cart-list--has-cart')
                        window.location.href = '/user/cart'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                })
            }
        })
        .catch(e => console.log(e))
    }   
}

let user_view_cart = document.querySelector('.user-view-cart')
if(user_view_cart){
    user_view_cart.onclick = () => {
        window.location.href = '/user/cart'
    }
}

// Check login for view cart
let view_cart_icon = document.querySelector('.view-cart-icon')
if(view_cart_icon){
    view_cart_icon.onclick = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Bạn cần đăng nhập để thực hiện chức năng này',
        }) 
    }   
}

let view_cart = document.querySelector('.view-cart')
if(view_cart){
    view_cart.onclick = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'Bạn cần đăng nhập để thực hiện chức năng này',
        }) 
    }   
}

// Delete product from cart
let delete_product_cart = document.querySelectorAll('.delete-product-cart')
delete_product_cart.forEach(item => {
    item.onclick = () => {
        let id = item.getAttribute("data-id")

        fetch('/user/deleteProductCart/' + id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Xóa sản phẩm thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/user/cart'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
        
    }
})

// Delete product from cart header
let delete_product_cart_header = document.querySelectorAll('.delete-product-cart-header')
delete_product_cart_header.forEach(item => {
    item.onclick = () => {
        let id = item.getAttribute("data-id")

        fetch('/user/deleteProductCartHeader/' + id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => {
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Xóa sản phẩm thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/user/cart'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
        
    }
})

//Calculate total price
let check_product_cart = document.querySelectorAll('.check_product_cart')
if(check_product_cart){
    let total_price_cart = 0
    let total_quantity_cart = 0
    check_product_cart.forEach((item, index) => {
        item.onclick = function(){
            if(this.checked){
                let quantity = item.getAttribute("data-quantity_user")
                let price = item.getAttribute("data-price")
                total_quantity_cart += parseInt(quantity)
                total_price_cart += (parseInt(quantity) * parseInt(price))
                console.log("Check", quantity, price)
                document.querySelector('.total_quantity_cart').innerHTML = total_quantity_cart
                document.querySelector('.total_price_cart').innerHTML = format_number(total_price_cart)
                document.querySelectorAll('.add-quantity-product-cart')[index].disabled = true
                document.querySelectorAll('.sub-quantity-product-cart')[index].disabled = true
            }
            else if(!this.checked){
                let quantity = item.getAttribute("data-quantity_user")
                let price = item.getAttribute("data-price")
                console.log(quantity, price)
                total_quantity_cart -= parseInt(quantity)
                total_price_cart -= (parseInt(quantity) * parseInt(price))
                document.querySelector('.total_quantity_cart').innerHTML = total_quantity_cart
                document.querySelector('.total_price_cart').innerHTML = format_number(total_price_cart)
                document.querySelectorAll('.add-quantity-product-cart')[index].disabled = false
                document.querySelectorAll('.sub-quantity-product-cart')[index].disabled = false
            }
        }
    })  
}

//Add quantity product from cart
let add_quantity_product_cart = document.querySelectorAll('.add-quantity-product-cart')
if(add_quantity_product_cart){
    add_quantity_product_cart.forEach((item, index) => {
        item.onclick = () => {
            console.log("Đã vào")
            let current_quantity_product_cart = document.querySelectorAll('.current-quantity-product-cart')
            //Hiển thị số lượng thay đổi
            let current_quantity_display = current_quantity_product_cart[index].textContent
            let new_quantity_display = parseInt(current_quantity_display) + 1
            current_quantity_product_cart[index].innerHTML = new_quantity_display
            //Lưu vào data-price để tính toán
            let check_product_cart = document.querySelectorAll('.check_product_cart')
            if(new_quantity_display > check_product_cart[index].getAttribute("data-quantity")){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Số lượng sản phẩm không đủ",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/user/cart'
                    }
                })	
            }
            let current_quantity = check_product_cart[index].getAttribute("data-quantity_user")
            let new_quantity = parseInt(current_quantity) + 1
            check_product_cart[index].setAttribute("data-quantity_user", new_quantity)
            //Lưu quantity_user vào store_data_product
            document.querySelectorAll('.store-data-product')[index].setAttribute("data-quantity_user", new_quantity)
        }
    })
    
}

//Subtract quantity product from cart
let sub_quantity_product_cart = document.querySelectorAll('.sub-quantity-product-cart')
if(sub_quantity_product_cart){
    sub_quantity_product_cart.forEach((item, index) => {
        item.onclick = () => {
            console.log("Đã vào")
            let current_quantity_product_cart = document.querySelectorAll('.current-quantity-product-cart')
            //Hiển thị số lượng thay đổi
            let current_quantity_display = current_quantity_product_cart[index].textContent
            let new_quantity_display = parseInt(current_quantity_display) - 1
            if(new_quantity_display < 0){
                new_quantity_display = 0
            }
            current_quantity_product_cart[index].innerHTML = new_quantity_display
            //Lưu vào data-price để tính toán
            let check_product_cart = document.querySelectorAll('.check_product_cart')
            let current_quantity = check_product_cart[index].getAttribute("data-quantity_user")
            let new_quantity = parseInt(current_quantity) - 1
            if(new_quantity < 0){
                new_quantity = 0
            }
            check_product_cart[index].setAttribute("data-quantity_user", new_quantity)
            //Lưu quantity_user vào store_data_product
            document.querySelectorAll('.store-data-product')[index].setAttribute("data-quantity_user", new_quantity)
        }
    })   
}

//Change password
let change_password = document.querySelector('.change_password')
if(change_password){
    change_password.onclick = () => {
        document.querySelector('.modal.modal-change-password').style.display = 'flex'
    }
}

let btn_back_change_password = document.querySelector('.btn-back-change-password')
if(btn_back_change_password){
    btn_back_change_password.onclick = () => {
        document.querySelector('.modal.modal-change-password').style.display = 'none'
    }
}

// Xử lý đổi mật khẩu
function handleChangePassword(old_pass, new_pass, re_new_pass){
    if(old_pass === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập mật khẩu cũ",
        });
        return false
    }
    if(new_pass === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập mật khẩu mới",
        });
        return false
    }
    if(re_new_pass.length < 6 || new_pass.length < 6 || old_pass.length < 6){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Mật khẩu phải có ít nhất 6 kí tự",
        });
        return false
    }
    if(re_new_pass === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vui lòng nhập lại mật khẩu mới",
        });
        return false
    }
    if(new_pass !== re_new_pass){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Mật khẩu mới không khớp",
        });
        return false
    }
    return true
}

const btn_change_password = document.querySelector('.btn-change-password')
if(btn_change_password){
    btn_change_password.onclick = () => {
        let old_password = document.querySelector('#old_password').value
        let new_password = document.querySelector('#new_password').value
        let re_new_password = document.querySelector('#re_new_password').value
    
        if(!handleChangePassword(old_password, new_password, re_new_password)){
            return
        }
    
        fetch('/change_password', {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }, 
            method: 'POST',
            body:'old_password=' + old_password + '&new_password=' + new_password + '&re_new_password=' + re_new_password,
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Đổi mật khẩu thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/user/user_infor'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
    }    
}

function checkElementArray(object, array){
    let check = false
    array.forEach(item => {
        if(JSON.stringify(item) == JSON.stringify(object)){
            check = true
        }
    })
    if(check){
        return false
    }
    return true
}

//Order product
let btn_order_product = document.querySelector('.btn-order-product')
let array_product = []
if(btn_order_product){
    btn_order_product.onclick = () => {
        if(document.querySelector('.total_quantity_cart').textContent == 0 || document.querySelector('.total_price_cart').textContent == 0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Vui lòng chọn sản phẩm để đặt hàng',
            });
        }
        else{
            document.querySelector('.modal.modal-order').style.display = 'flex'
            let total = document.querySelector('.total_price_cart').textContent
            console.log("Total:", total)
            document.querySelector('.btn-order-confirm').setAttribute('data-total', total)
        } 
        let store_data_product = document.querySelectorAll('.store-data-product')
        let check_product_carts = document.querySelectorAll('.check_product_cart')
        if(store_data_product){

            store_data_product.forEach((item, index) => {
                let id = item.getAttribute("data-id")
                let name = item.getAttribute("data-name")
                let old_price = item.getAttribute("data-old_price")
                let new_price = item.getAttribute("data-new_price")
                let image = item.getAttribute("data-image")
                let quantity = item.getAttribute("data-quantity")
                let quantity_user = item.getAttribute("data-quantity_user")

                let data = {
                    id,
                    name,
                    image,
                    old_price,
                    new_price,
                    quantity,
                    quantity_user
                }

                if(check_product_carts[index].checked){
                    if(checkElementArray(data, array_product)){
                        console.log(checkElementArray(data, array_product))
                        array_product.push(data)
                    }  
                }
                else if(!check_product_carts[index].checked){
                    array_product.splice(index, 1)
                }
            })
        }  
    }
}

console.log(array_product)

let btn_back_order = document.querySelector('.btn-back-order')
if(btn_back_order){
    btn_back_order.onclick = () => {
        document.querySelector('.modal.modal-order').style.display = 'none'
    }
}

let btn_order_confirm = document.querySelector('.btn-order-confirm')
if(btn_order_confirm){
    btn_order_confirm.onclick = () => {
        let name = document.querySelector('#name-order').value
        let phone = document.querySelector('#phone-order').value
        let address = document.querySelector('#address-order').value
        let total = btn_order_confirm.getAttribute("data-total")
        console.log('Total gửi:', total)

        fetch('/user/addOrder', {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }, 
            method: 'POST',
            body:'name=' + name + '&phone=' + phone + '&address=' + address + '&total=' + total + '&array_product=' + JSON.stringify(array_product),
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if(json.code === 0){
                console.log("Order thành công")
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Đặt hàng thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/user/order'
                    }
                })	
            }
            else{
                console.log('Có lỗi xảy ra')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))  
        
        array_product.forEach(item => {
            fetch('/user/changeQuantityProduct', {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
                method: 'POST',
                body:'id=' + item.id + '&quantity=' + item.quantity + '&quantity_user=' + item.quantity_user,
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if(json.code === 0){
                    console.log("Thành công")
                    // Swal.fire({
                    //     icon: "success",
                    //     title: "Oops...",
                    //     text: "Cập nhật số lượng thành công",
                    // }).then((result) => {
                    //     if(result.isConfirmed){
                    //         window.location.href = '/user/home'
                    //     }
                    // })	
                }
                else{
                    console.log('Có lỗi xảy ra')
                    // Swal.fire({
                    //     icon: "error",
                    //     title: "Oops...",
                    //     text: json.message,
                    // });
                }
            })
            .catch(e => console.log(e))
        })
        
        for(let i = 0; i < array_product.length; i++){
            fetch('/user/deleteProductCartOrder/' + array_product[i].id, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if(json.code === 0){
                    // Swal.fire({
                    //     icon: "success",
                    //     title: "Oops...",
                    //     text: "Xóa sản phẩm thành công",
                    // }).then((result) => {
                    //     if(result.isConfirmed){
                    //         window.location.href = '/user/cart'
                    //     }
                    // })
                    console.log("Xóa thành công khỏi giỏ hàng")	
                }
                else{
                    console.log('Có lỗi xảy ra')
                    // Swal.fire({
                    //     icon: "error",
                    //     title: "Oops...",
                    //     text: json.message,
                    // });
                }
            })
            .catch(e => console.log(e))
        }
        
        array_product = [] 
    }
}

//Get infor user
let date_infor = document.querySelector('#date-infor')
if(date_infor){
    let options = ``
    for(let i = 1; i <= 30; i++){
        options += `<option value="${i}">${i}</option>`
    }
    date_infor.innerHTML = options
}

let month_infor = document.querySelector('#month-infor')
if(month_infor){
    let options = ``
    for(let i = 1; i <= 12; i++){
        options += `<option value="${i}">${i}</option>`
    }
    month_infor.innerHTML =options
}

let year_infor = document.querySelector('#year-infor')
if(year_infor){
    let options = ``
    for(let i = 1950; i <= 2022; i++){
        options += `<option value="${i}">${i}</option>`
    }
    year_infor.innerHTML = options
}

//User change infor
let btn_save_infor = document.querySelector('.btn-save-infor')
if(btn_save_infor){
    btn_save_infor.onclick = () => {
        let username = document.querySelector('#username-infor').value
        let name = document.querySelector('#name-infor').value
        let email = document.querySelector('#email-infor').value
        let phone = document.querySelector('#phone-infor').value
        let sex
        if(document.querySelector('#sex-male-infor').checked){
            sex = document.querySelector('#sex-male-infor').value
        }
        else if(document.querySelector('#sex-female-infor').checked){
            sex = document.querySelector('#sex-female-infor').value
        }
        else if(document.querySelector('#sex-other-infor').checked){
            sex = document.querySelector('#sex-other-infor').value
        }
        let date = document.querySelector('#date-infor').value + '/' + document.querySelector('#month-infor').value + '/' + document.querySelector('#year-infor').value
        console.log(date)

        fetch('/user/changeInfor', {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }, 
            method: 'POST',
            body:'username=' + username + '&name=' + name + '&email=' + email + '&phone=' + phone + '&sex=' + sex + '&date=' + date,
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if(json.code === 0){
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: "Cập nhật thông tin thành công",
                }).then((result) => {
                    if(result.isConfirmed){
                        window.location.href = '/user/user_infor'
                    }
                })	
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: json.message,
                });
            }
        })
        .catch(e => console.log(e))
    }
}

//Logout
// let logout_user = document.querySelector('.logout_user')
// if(logout_user){
//     logout_user.onclick = () => {
//         window.location.href = '/'
//     }
// }

//Change avatar
let infor_user_avatar_btn = document.querySelector('.infor-user__avatar-btn')
if(infor_user_avatar_btn){
    infor_user_avatar_btn.onclick = () => {
        document.querySelector('.modal.modal-change-avatar').style.display = 'flex'
    }
}

let btn_back_change_avatar = document.querySelector('.btn-back-change-avatar')
if(btn_back_change_avatar){
    btn_back_change_avatar.onclick = () => {
        document.querySelector('.modal.modal-change-avatar').style.display = 'none'
    }
}

// const btn_change_avatar = document.querySelector('.btn-change-avatar')
// if(btn_change_avatar){
//     btn_change_avatar.onclick = () => {
//         let image = document.querySelector('#image-avatar')
//         console.log(image)
//         let formData = new FormData()
//         formData.append('image', image)
//         formData.append('name', image.name)
    
//         fetch('/user/changeAvatar', {
//             // headers:{
//             //     'Content-Type':'multipart/form-data'
//             // }, 
//             method: 'POST',
//             body: formData,
//         })
//         .then(res => res.json())
//         .then(json => {
//             console.log(json)
//             if(json.code === 0){
//                 Swal.fire({
//                     icon: "success",
//                     title: "Oops...",
//                     text: "Đổi ảnh đại diện thành công",
//                 }).then((result) => {
//                     if(result.isConfirmed){
//                         window.location.href = '/user/user_infor'
//                     }
//                 })	
//             }
//             else{
//                 console.log('Có lỗi xảy ra')
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: json.message,
//                 });
//             }
//         })
//         .catch(e => console.log(e))
//     }    
// }

// View order
let user_view_order = document.querySelectorAll('.btn-view-order')
user_view_order.forEach(item => {
    item.onclick = () => {
        let total = item.getAttribute("data-total")
        let name = item.getAttribute("data-name_customer")
        let phone = item.getAttribute("data-phone_customer")
        let address = item.getAttribute("data-address")
        let status = item.getAttribute("data-status")
        
        document.getElementById('total-view-order').innerHTML = total
        document.getElementById('name-view-order').innerHTML = name
        document.getElementById('phone-view-order').innerHTML = phone
        document.getElementById('address-view-order').innerHTML = address
        document.getElementById('status-view-order').innerHTML = status

        document.querySelector('.modal.modal-view-order').style.display = 'block'
    }
})

let btn_close_view_order = document.querySelector('.btn-close-view-order')
if(btn_close_view_order){
    btn_close_view_order.onclick = () => {
        document.querySelector('.modal.modal-view-order').style.display = 'none'
    }
}

let btn_view_shop = document.querySelector('.btn-view-shop')
if(btn_view_shop){
    btn_view_shop.onclick = () => {
        Swal.fire({
            icon: "warning",
            title: "Sorry...",
            text: "Chức năng này vẫn đang được phát triển, Xin lỗi vì sự bất tiện này",
        })
    }
}

let btn_buy_immediately = document.querySelector('.btn-buy-immediately')
if(btn_buy_immediately){
    btn_buy_immediately.onclick = () => {
        Swal.fire({
            icon: "warning",
            title: "Sorry...",
            text: "Chức năng này vẫn đang được phát triển, Xin lỗi vì sự bất tiện này",
        })
    }
}

