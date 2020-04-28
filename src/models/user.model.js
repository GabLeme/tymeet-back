const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema; 
const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    senha: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        required: true,
    },
    projetos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projetos', default: [], required: true }]
});

UserSchema.pre('save', function (next) {
    this.senha = bcrypt.hashSync(this.senha, saltRounds);
    next();
}); 

module.exports = mongoose.model('User', UserSchema);