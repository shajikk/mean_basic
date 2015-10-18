'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var collection = 'chips';

/**
 * Table Schema
 */

var TableSchema = new Schema({
    name     : String,
    owner    : String,
    type     : String,

    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }

});

mongoose.model('Table', TableSchema, collection);
