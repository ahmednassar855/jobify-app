import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    lastName : {
        type: String,
        default: 'lastname'
    },
    location : {
        type: String,
        default: 'my city'
    },
    role: {
        type: String,
        enum: ['user' , 'admin'],
        default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
},
    { timestamps: true }
);

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model('User' , UserSchema)