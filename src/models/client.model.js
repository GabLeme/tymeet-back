const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const ClientSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Cliente', ClientSchema);