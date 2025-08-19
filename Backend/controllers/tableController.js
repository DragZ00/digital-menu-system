const Table = require('../models/tableModel');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');

const addTable = async (req, res, next) => {
 try {

    const { tableNo} = req.body;
    if(!tableNo){
        const error = createHttpError(400, "Masa numarası gerekli!");
        return next(error);
    }

const isTablePresent = await Table.findOne({ tableNo});   
if(isTablePresent) {
    const error = createHttpError(400, "Bu masa zaten mevcut!");
    return next(error);
    
 }

 const newTable = new Table({tableNo});
    await newTable.save();

    res.status(201).json({
        success: true,
        message: "Masa eklendi",
        data: newTable})

}  catch (error) {
    next(error);
 }
}

const getTables = async (req, res, next) => {
        try {

        const tables = await Table.find();
        res.status(200).json({
            success: true,
            data: tables
        });
            
        } catch (error) {
           next(error); 
        }
}

const updateTables = async (req, res, next) => {

    try {

        const { status, orderId } = req.body;

           const {id} = req.params;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                const error = createHttpError(404, "Sipariş ID'si Hatalı!");
                return next(error);
            }     


        const table = await Table.findByIdAndUpdate(
            id,
            { status, currentOrder: orderId },
            { new: true }
        );

        if(!table) {
            const error = createHttpError(404, "Masa bulunamadı!");
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: "Masa durumu güncellendi",
            data: table
        });
        
    } catch (error) {
        next(error);
    }

}

module.exports = {
    addTable,               
    getTables,
    updateTables
};