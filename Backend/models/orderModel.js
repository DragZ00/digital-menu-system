const mongoose  = require('mongoose');
const orderSchema = new mongoose.Schema({
    customerDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        guests: { type: Number, required: true },
    },

    orderStatus:{
        type: String,
        required: true
    },

    orderDate:{
        type: Date,
        default: Date.now
    },

    bills:{
        total :{ type: Number, required: true },
        tax :{ type: Number, required: true },
        totalwithtax :{ type: Number, required: true }
    },

    items : [

    ],
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' }
}, {timestaps : true} );

module.exports = mongoose.model("Order", orderSchema);
