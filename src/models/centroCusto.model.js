const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const CentroCustoSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('CentroCusto', CentroCustoSchema);