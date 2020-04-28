const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const ActivitySchema = new Schema({

    usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    nomeDemanda: {
        type: String,
        trim: true,
        required: true,
    },
    projeto: {type: mongoose.Schema.Types.ObjectId, ref: 'Projeto'},
    tipoAtividade: {type: mongoose.Schema.Types.ObjectId, ref: 'TipoAtividade'},
    dataAtividade: {
        type: String,
        trim: true,
        required: true,
    },
    minutosTrabalhados: {
        type: Number,
        trim: true,
        required: true,
    },
    descricaoAtividade: {
        type: String,
        trim: true,
        required: true,
    },
    centroCusto: {
        type: String,
        trim: true,
        required: true
    }
});


module.exports = mongoose.model('Activity', ActivitySchema);