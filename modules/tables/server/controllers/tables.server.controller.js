'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Table = mongoose.model('Table'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a table
 */
exports.create = function (req, res) {
  var table  = new Table(req.body);
  table.user = req.user;

  // TEST
  /*
  console.log(JSON.stringify(table));
  var test = req.param('test');
  console.log("test : %s", test);
  */

  table.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(table);
    }
  });
};

/**
 * Show the current table
 */
exports.read = function (req, res) {
  res.json(req.table);
};

/**
 * Update a table
 */
exports.update = function (req, res) {
  var table = req.table;

  table.title = req.body.title;
  table.content = req.body.content;

  table.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(table);
    }
  });
};

/**
 * Delete an table
 */
exports.delete = function (req, res) {
  var table = req.table;

  table.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(table);
    }
  });
};

/**
 * List of Tables
 */
exports.list = function (req, res) {

  var cmd = req.param('cmd');
  var str = req.param('query_str');
  var sk = req.param('skip');
  var li = req.param('limit');
  var srt = req.param('sort');


  if (cmd === 'get_count') {
    if (str === '*') { str = '.*'; }
    var regex = new RegExp(str, 'g');
    var q = Table.find({ name : regex});

    q.count(function(err, count) {
      if (err) { 
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        //res.end(JSON.stringify(count));
        res.json([{'count':count}]);
      }
    });
  } else {

    if (str === '*') { str = '.*'; }
    var regex = new RegExp(str, 'g');

    var q = Table.find({ name : regex})
                    .skip(sk)
                    .limit(li)
                    .sort({name : srt});

    q.exec(function(err, tables) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        //console.log(JSON.stringify(tables));
        res.json(tables);
      }
    });

  }
};

/**
 * Table middleware
 */
exports.tableByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Table is invalid'
    });
  }

  Table.findById(id).populate('user', 'displayName').exec(function (err, table) {
    if (err) {
      return next(err);
    } else if (!table) {
      return res.status(404).send({
        message: 'No table with that identifier has been found'
      });
    }
    req.table = table;
    next();
  });
};
