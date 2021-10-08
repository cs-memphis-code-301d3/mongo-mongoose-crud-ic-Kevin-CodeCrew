let mongoose = require('mongoose');
let Schema = mongoose.Schema; /// access mongoose schema

// Define a new schema for an entry item
let EntrySchema = new Schema(
    {
        entryTitle : String,
        entryAuthor:String,
        entryReadTime: Number
    }
);

module.exports = mongoose.model('entrycollection', EntrySchema);