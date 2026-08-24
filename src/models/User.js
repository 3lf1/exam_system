const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a name"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "Please provide an email"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true, "Please provide a password"],
        minlength:[6, "Password must be at least 6 characters long"],
        select:false
    },
    role:{
        type:String,
        enum:["student", "teacher"],
        default:"student"
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, {timestamps:true});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bycrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bycrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", userSchema);
