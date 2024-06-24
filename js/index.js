// Danh sách nhân viên
let employees = [];

// Đối tượng Nhân viên
class NhanVien {
    constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCB = luongCB;
        this.chucVu = chucVu;
        this.gioLam = gioLam;
        this.tongLuong = this.tinhTongLuong();
        this.xepLoai = this.xepLoaiNV();
    }

    // Phương thức tính tổng lương
    tinhTongLuong() {
        let luong = parseInt(this.luongCB);
        let gioLam = parseInt(this.gioLam);
        let heSoLuong = 1; // Mặc định cho nhân viên

        switch (this.chucVu) {
            case 'Giám đốc':
                heSoLuong = 3;
                break;
            case 'Trưởng phòng':
                heSoLuong = 2;
                break;
            case 'Nhân viên':
                heSoLuong = 1;
                break;
            default:
                break;
        }

        return luong * gioLam * heSoLuong;
    }

    // Phương thức xếp loại nhân viên
    xepLoaiNV() {
        let gioLam = parseInt(this.gioLam);
        if (gioLam >= 192) {
            return 'Xuất sắc';
        } else if (gioLam >= 176) {
            return 'Giỏi';
        } else if (gioLam >= 160) {
            return 'Khá';
        } else {
            return 'Trung bình';
        }
    }
}

// Hàm hiển thị danh sách nhân viên lên bảng
function hienThiDanhSachNV() {
    let tableDanhSach = document.getElementById('tableDanhSach');
    tableDanhSach.innerHTML = '';

    for (let nv of employees) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="suaNhanVien('${nv.taiKhoan}')">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
            </td>
        `;
        tableDanhSach.appendChild(tr);
    }
}

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Hàm kiểm tra định dạng ngày tháng
function isValidDate(dateString) {
    // Định dạng mm/dd/yyyy
    let regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;
    let parts = dateString.split('/');
    let day = parseInt(parts[1], 10);
    let month = parseInt(parts[0], 10);
    let year = parseInt(parts[2], 10);
    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;
    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;
    return day > 0 && day <= monthLength[month - 1];
}

// Hàm kiểm tra mật khẩu
function isValidPassword(password) {
    // Mật khẩu từ 6-10 ký tự, ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt
    let regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{6,10}$/;
    return regex.test(password);
}

// Hàm kiểm tra chức vụ hợp lệ
function isValidChucVu(chucVu) {
    return chucVu === 'Giám đốc' || chucVu === 'Trưởng phòng' || chucVu === 'Nhân viên';
}

// Hàm validation
function validateForm() {
    let taiKhoan = document.getElementById('tknv').value.trim();
    let hoTen = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let matKhau = document.getElementById('password').value;
    let ngayLam = document.getElementById('datepicker').value.trim();
    let luongCB = document.getElementById('luongCB').value.trim();
    let chucVu = document.getElementById('chucvu').value.trim();
    let gioLam = document.getElementById('gioLam').value.trim();

    // Validation
    if (taiKhoan.length < 4 || taiKhoan.length > 6) {
        alert('Tài khoản phải từ 4 đến 6 ký tự.');
        return false;
    }

    if (!hoTen.match(/^[a-zA-Z\s]*$/) || hoTen.length === 0) {
        alert('Họ tên phải là chữ và không để trống.');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Email không hợp lệ.');
        return false;
    }

    if (!isValidPassword(matKhau)) {
        alert('Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 số, 1 ký tự in hoa và 1 ký tự đặc biệt.');
        return false;
    }

    if (!isValidDate(ngayLam)) {
        alert('Ngày làm không hợp lệ, định dạng mm/dd/yyyy.');
        return false;
    }

    if (parseInt(luongCB) < 1000000 || parseInt(luongCB) > 20000000) {
        alert('Lương cơ bản phải từ 1,000,000 đến 20,000,000.');
        return false;
    }

    if (!isValidChucVu(chucVu)) {
        alert('Chưa chọn chức vụ hợp lệ.');
        return false;
    }

    if (parseInt(gioLam) < 80 || parseInt(gioLam) > 200) {
        alert('Số giờ làm trong tháng phải từ 80 đến 200 giờ.');
        return false;
    }

    return true;
}

// Hàm thêm nhân viên
function themNhanVien() {
    if (!validateForm()) {
        return;
    }

    let taiKhoan = document.getElementById('tknv').value.trim();
    let hoTen = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let matKhau = document.getElementById('password').value;
    let ngayLam = document.getElementById('datepicker').value.trim();
    let luongCB = document.getElementById('luongCB').value.trim();
    let chucVu = document.getElementById('chucvu').value.trim();
    let gioLam = document.getElementById('gioLam').value.trim();

    // Tạo đối tượng nhân viên mới
    let nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam);

    // Thêm vào danh sách nhân viên
    employees.push(nv);

    // Hiển thị lại danh sách nhân viên
    hienThiDanhSachNV();

    // Đóng modal sau khi thêm
    $('#myModal').modal('hide');

    // Reset form
    document.getElementById('myForm').reset();
}

// Hàm sửa nhân viên
function suaNhanVien(taiKhoan) {
    // Tìm nhân viên cần sửa
    let nv = employees.find(function(item) {
        return item.taiKhoan === taiKhoan;
    });

    // Đổ dữ liệu vào form sửa
    if (nv) {
        document.getElementById('tknv').value = nv.taiKhoan;
        document.getElementById('name').value = nv.hoTen;
        document.getElementById('email').value = nv.email;
        document.getElementById('password').value = nv.matKhau;
        document.getElementById('datepicker').value = nv.ngayLam;
        document.getElementById('luongCB').value = nv.luongCB;
        document.getElementById('chucvu').value = nv.chucVu;
        document.getElementById('gioLam').value = nv.gioLam;

        // Hiển thị modal sửa
        $('#myModal').modal('show');

        // Ẩn button Thêm, hiện button Cập nhật
        document.getElementById('btnThemNV').style.display = 'none';
        document.getElementById('btnCapNhat').style.display = 'inline';
    }
}

// Hàm cập nhật nhân viên
function capNhatNhanVien() {
    if (!validateForm()) {
        return;
    }

    let taiKhoan = document.getElementById('tknv').value.trim();
    let hoTen = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let matKhau = document.getElementById('password').value;
    let ngayLam = document.getElementById('datepicker').value.trim();
    let luongCB = document.getElementById('luongCB').value.trim();
    let chucVu = document.getElementById('chucvu').value.trim();
    let gioLam = document.getElementById('gioLam').value.trim();

    // Cập nhật thông tin nhân viên trong danh sách
    for (let nv of employees) {
        if (nv.taiKhoan === taiKhoan) {
            nv.hoTen = hoTen;
            nv.email = email;
            nv.matKhau = matKhau;
            nv.ngayLam = ngayLam;
            nv.luongCB = luongCB;
            nv.chucVu = chucVu;
            nv.gioLam = gioLam;
            nv.tongLuong = nv.tinhTongLuong();
            nv.xepLoai = nv.xepLoaiNV();
            break;
        }
    }

    // Hiển thị lại danh sách nhân viên
    hienThiDanhSachNV();

    // Đóng modal sau khi cập nhật
    $('#myModal').modal('hide');

    // Hiện button Thêm, ẩn button Cập nhật
    document.getElementById('btnThemNV').style.display = 'inline';
    document.getElementById('btnCapNhat').style.display = 'none';

    // Reset form
    document.getElementById('myForm').reset();
}

// Hàm xóa nhân viên
function xoaNhanVien(taiKhoan) {
    // Lọc nhân viên cần xóa khỏi danh sách
    employees = employees.filter(function(nv) {
        return nv.taiKhoan !== taiKhoan;
    });

    // Hiển thị lại danh sách nhân viên
    hienThiDanhSachNV();
}

// Hàm tìm nhân viên theo loại
function timNhanVienTheoLoai(xepLoai) {
    let result = employees.filter(function(nv) {
        return nv.xepLoai === xepLoai;
    });

    // Hiển thị kết quả tìm được lên bảng
    let tableDanhSach = document.getElementById('tableDanhSach');
    tableDanhSach.innerHTML = '';

    for (let nv of result) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="suaNhanVien('${nv.taiKhoan}')">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
            </td>
        `;
        tableDanhSach.appendChild(tr);
    }
}

// Sự kiện khi tài khoản nhập vào
document.getElementById('tknv').addEventListener('blur', function() {
    let taiKhoan = this.value.trim();
    if (taiKhoan.length < 4 || taiKhoan.length > 6) {
        document.getElementById('tbTKNV').innerHTML = 'Tài khoản phải từ 4 đến 6 ký tự.';
    } else {
        document.getElementById('tbTKNV').innerHTML = '';
    }
});

// Sự kiện khi tên nhập vào
document.getElementById('name').addEventListener('blur', function() {
    let hoTen = this.value.trim();
    if (!hoTen.match(/^[a-zA-Z\s]*$/) || hoTen.length === 0) {
        document.getElementById('tbTen').innerHTML = 'Họ tên phải là chữ và không để trống.';
    } else {
        document.getElementById('tbTen').innerHTML = '';
    }
});

// Sự kiện khi email nhập vào
document.getElementById('email').addEventListener('blur', function() {
    let email = this.value.trim();
    if (!isValidEmail(email)) {
        document.getElementById('tbEmail').innerHTML = 'Email không hợp lệ.';
    } else {
        document.getElementById('tbEmail').innerHTML = '';
    }
});

// Sự kiện khi mật khẩu nhập vào
document.getElementById('password').addEventListener('blur', function() {
    let matKhau = this.value;
    if (!isValidPassword(matKhau)) {
        document.getElementById('tbMatKhau').innerHTML = 'Mật khẩu phải từ 6-10 ký tự, chứa ít nhất 1 số, 1 ký tự in hoa và 1 ký tự đặc biệt.';
    } else {
        document.getElementById('tbMatKhau').innerHTML = '';
    }
});

// Sự kiện khi ngày làm nhập vào
document.getElementById('datepicker').addEventListener('blur', function() {
    let ngayLam = this.value.trim();
    if (!isValidDate(ngayLam)) {
        document.getElementById('tbNgay').innerHTML = 'Ngày làm không hợp lệ, định dạng mm/dd/yyyy.';
    } else {
        document.getElementById('tbNgay').innerHTML = '';
    }
});

// Sự kiện khi lương cơ bản nhập vào
document.getElementById('luongCB').addEventListener('blur', function() {
    let luongCB = this.value.trim();
    if (parseInt(luongCB) < 1000000 || parseInt(luongCB) > 20000000) {
        document.getElementById('tbLuongCB').innerHTML = 'Lương cơ bản phải từ 1,000,000 đến 20,000,000.';
    } else {
        document.getElementById('tbLuongCB').innerHTML = '';
    }
});

// Sự kiện khi chọn chức vụ
document.getElementById('chucvu').addEventListener('change', function() {
    let chucVu = this.value.trim();
    if (!isValidChucVu(chucVu)) {
        document.getElementById('tbChucVu').innerHTML = 'Chưa chọn chức vụ hợp lệ.';
    } else {
        document.getElementById('tbChucVu').innerHTML = '';
    }
});

// Sự kiện khi giờ làm nhập vào
document.getElementById('gioLam').addEventListener('blur', function() {
    let gioLam = this.value.trim();
    if (parseInt(gioLam) < 80 || parseInt(gioLam) > 200) {
        document.getElementById('tbGiolam').innerHTML = 'Số giờ làm trong tháng phải từ 80 đến 200 giờ.';
    } else {
        document.getElementById('tbGiolam').innerHTML = '';
    }
});

// Sự kiện khi click nút Thêm nhân viên
document.getElementById('btnThemNV').addEventListener('click', themNhanVien);

// Sự kiện khi click nút Cập nhật nhân viên
document.getElementById('btnCapNhat').addEventListener('click', capNhatNhanVien);

// Sự kiện khi click nút Đóng modal
document.getElementById('btnDong').addEventListener('click', function() {
    document.getElementById('myForm').reset();
    document.getElementById('tbTKNV').innerHTML = '';
    document.getElementById('tbTen').innerHTML = '';
    document.getElementById('tbEmail').innerHTML = '';
    document.getElementById('tbMatKhau').innerHTML = '';
    document.getElementById('tbNgay').innerHTML = '';
    document.getElementById('tbLuongCB').innerHTML = '';
    document.getElementById('tbChucVu').innerHTML = '';
    document.getElementById('tbGiolam').innerHTML = '';

    // Hiện button Thêm, ẩn button Cập nhật
    document.getElementById('btnThemNV').style.display = 'inline';
    document.getElementById('btnCapNhat').style.display = 'none';
});

// Khởi tạo dữ liệu mẫu
employees.push(new NhanVien('nv1', 'Nguyễn Văn A', 'nv1@gmail.com', 'Abc@123', '05/15/2023', '15000000', 'Giám đốc', '200'));
employees.push(new NhanVien('nv2', 'Trần Thị B', 'nv2@gmail.com', 'Xyz@456', '06/20/2023', '12000000', 'Trưởng phòng', '180'));
employees.push(new NhanVien('nv3', 'Phạm Văn C', 'nv3@gmail.com', 'Def@789', '07/25/2023', '10000000', 'Nhân viên', '160'));

// Hiển thị danh sách nhân viên khi trang web được load
document.addEventListener('DOMContentLoaded', function() {
    hienThiDanhSachNV();
});
