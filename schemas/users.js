let mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "email khong duoc trung"],
        required: true
    },
    phone: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://i.pravatar.cc/150'
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('user', userSchema)
