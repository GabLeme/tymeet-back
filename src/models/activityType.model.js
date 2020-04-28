const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const ActivityTypeSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('TipoAtividade', ActivityTypeSchema);