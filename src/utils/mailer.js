const nodeMailer = require("nodemailer");
const config = require("../config/email");

class Mailer {
    async transporter() {
        return nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });
    }

    async sendConfirmCode(username, email, newPass) {
        const transporter = await this.transporter();
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'Confirm code',
            html: '<p> Đây là mã xác nhận được cấp lại cho tài khoản ' + username + ' là <strong>' + newPass + '</strong> </p><br>'
                + '(<span style="color:red;">*</span>) Lưu ý: Vui lòng nhập chính xác để chúng toai cấp lại mật khẩu cho bạn, nếu không phải bạn vui lòng bỏ vào thùng rác.Thanks you so much!!!'
        }
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent:- ", info.response);
            }
        })
    }

    async resetPassword(username, email, newPass) {
        const transporter = await this.transporter();
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'For reset password',
            html: '<p> Đây là mật khẩu mới được cấp lại cho tài khoản ' + username + ' là <strong>' + newPass + '</strong> </p><br>'
                + '(<span style="color:red;">*</span>) Lưu ý: không được chia sẻ thông tin tài khoản và mật khẩu cho người khác.Vui lòng tiến hàng đổi mật khẩu.Please!!'
        }
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent:- ", info.response);
            }
        })
    }

    async activeAccount(username, email, token) {
        const transporter = await this.transporter();
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'For reset password',
            html: '<p>Vui lòng nhấn vào link để kích hoạt tài khoản <a href="http://localhost:8080/api/v1/users/active-account?token=' + token + '">' + username + '</a></p>'
        }
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Mail has been sent:- ", info.response);
            }
        })
    }
}

module.exports = new Mailer;