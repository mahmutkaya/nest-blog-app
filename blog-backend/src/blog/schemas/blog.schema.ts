import * as mongoose from 'mongoose';

/*
This definition specifies that all fields will store 
and only accept string values. 
With this in place, the datatype of data that will be stored in the database will be properly controlled.
*/
export const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    author: String,
    datePosted: String,
})