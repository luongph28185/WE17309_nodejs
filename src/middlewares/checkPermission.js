import jwt from "jsonwebtoken";
import User from "../models/user";
export const checkPermission = async (req, res, next) => {
    try {
        // kiểm tra xem user có đăng nhập không
        if (!req.headers.authorization) {
            throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
        }

        // lấy jwt token từ header
        const token = req.headers.authorization.split(" ")[1];

        // xác thực jwt token
        const { _id } = jwt.verify(token, "banThayDat");

        // lấy thông tin user từ database
        const user = await User.findById(_id);
        // kiểm tra xem user có đủ quyền để thực hiện hành động đó không
        if (user.role != "admin") {
            throw new Error("Bạn không có quyền để thực hiện hành động này");
        }

        console.log("user", user);
        // lưu thông tin user vào request để sử dụng trong các middleware khác
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};