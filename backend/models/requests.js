const mongoose = require('mongoose');
const { Schema } = mongoose;
const RequestSchema = new Schema({
    username : {type : String, required:true},
    description :  {type : String, required:true},
    date:{type:Date,default: Date.now},
    pdf: { type: Buffer, required: true },  // Add this line to store PDF as binary data
    pdfContentType: { type: String, required: true }  // Add this line to store the PDF file type  
});
module.exports = mongoose.model('requests',RequestSchema)