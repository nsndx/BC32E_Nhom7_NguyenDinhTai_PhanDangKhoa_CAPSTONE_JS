const dom = (selector) => document.querySelector(selector)
const doms = (selector) => document.querySelectorAll(selector)

//tạo class User
class User {
    constructor() { }
    email = ''
    password = ''
    name = ''
    gender = ''
    phone = ''
}
// tạo đối tượng user từ dữ liệu người dùng nhập để gửi lên API
const user = () => {
    let user = new User()
    const inputsId = doms('input[id]')
    inputsId.forEach(input => {
        const { id, value } = input
        user[id] = value
    })
    const inputsGender = doms('input[name]')
    inputsGender.forEach(input => {
        if (input.checked === true) {
            user.gender = Boolean(input.value)
        }
    })
    return user
}

// gửi dữ liệu lên API
dom('#btnSubmit').onclick = () => {
    dom('.title h1').innerHTML = 'Register'
    dom('.title h1').style.color = 'black'
    let valid = true
    valid &= kiemTraEmail() & kiemTraGioiTinh() & kiemTraName() & kiemTraPassword() & kiemTraPhone() & kiemTraPasswordConfirm()
    if (!valid) {
        return
    }
    let userPost = user()
    const url = 'https://shop.cyberlearn.vn/api/Users/signup'
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPost),
    })
        .then(response => response.json())
        .then(data => {
            dom('.title h1').innerHTML = data.message
            dom('.title h1').style.color = 'red'
            if (data.message === 'Đăng ký tài khoản thành công!') {
                dom('.title h1').style.color = 'blue'
                clearForm()
            }
        })
        .catch(err => alert(err))
}

const inputs = doms('.input input')
const spans = doms('.input span')
const inputsGender = doms('input[name]')
// ẩn thông báo (*) khi ấn vào input
for (let i = 0; i < inputs.length; i++) {
    inputs[i].oninput = () => {
        spans[i].style.display = 'none'
        if (inputs[i].value === '') {
            spans[i].style.display = 'block'
        }
    }
}
// clear form
const clearForm = () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }
    for (let i = 0; i < inputsGender.length; i++) {
        inputsGender[i].checked = ''
    }
}

// kiểm tra chọn giới tính
const kiemTraGioiTinh = () => {
    const tb = dom('#tbGender')
    if (inputsGender[0].checked === false && inputsGender[1].checked === false) {
        tb.style.display = 'block'
        tb.innerHTML = 'chưa chọn giới tính'
        return false
    } else {
        tb.style.display = 'none'
        return true
    }
}

// kiểm tra email
const kiemTraEmail = () => {
    const email = dom('#email').value
    const tb = dom('#tbEmail')
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email)) {
        tb.style.display = 'block'
        tb.style.fontSize = '13px'
        tb.innerHTML = 'email không đúng định dạng'
        return false
    } else {
        tb.style.display = 'none'
        return true
    }
}

// kiểm tra name
const kiemTraName = () => {
    const name = dom('#name').value
    const tb = dom('#tbName')
    const regex = /^[a-zA-Z ]{1,}$/g
    if (!regex.test(removeAscent(name))) {
        tb.style.display = 'block'
        tb.style.fontSize = '13px'
        tb.innerHTML = 'tên phải là chữ'
        return false
    } else {
        tb.style.display = 'none'
        return true
    }
}
function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

// kiểm tra mật khẩu
const kiemTraPassword = () => {
    const password = dom('#password').value
    const tb = dom('#tbPassword')
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    if (!regex.test(password) || password.length < 6 || password.length > 20) {
        tb.style.display = 'block'
        tb.style.fontSize = '13px'
        tb.style.width = '150px'
        tb.style.lineHeight = 1.1
        tb.style.top = '-10px'
        tb.innerHTML = 'MK từ 6-20 ký tự, có 1 số, 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt'
        return false
    } else {
        tb.style.display = 'none'
        return true
    }
}
// Kiểm tra nhập lại mật khẩu
const kiemTraPasswordConfirm = () => {
    const password = dom('#password').value
    const passwordConfirm = dom('.col-left .input3 input').value
    const tb = dom('#tbPasswordConfirm')
    if (passwordConfirm === '') {
        tb.style.display = 'block'
    } else if (passwordConfirm !== password) {
        tb.style.display = 'block'
        tb.style.fontSize = '13px'
        tb.innerHTML = 'Nhập lại mật khẩu'
        return false
    } else {
        tb.style.display = 'none'
        return true
    }
}

// kiểm tra phone
const kiemTraPhone = () => {
    const phone = dom('#phone').value
    const tb = dom('#tbPhone')
    const regex = /^[0-9]+$/
    if (!regex.test(phone) || phone.length < 10 || phone.length > 11) {
        tb.style.display = 'block'
        tb.innerHTML = 'phone phải 10-11 số'
        tb.style.fontSize = '13px'
        return false
    } else {
        tb.style.display = 'none'
        return true
    }
}





