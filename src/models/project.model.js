const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const ProjectSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Projetos', ProjectSchema);