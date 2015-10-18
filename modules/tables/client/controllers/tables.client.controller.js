'use strict';

// Tables controller
var mod = angular.module('tables');

mod.controller('TablesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tables',
  function ($scope, $stateParams, $location, Authentication, Tables) {
    $scope.authentication = Authentication;

    /*
    // Create new Table
    $scope.create = function () {
      // Create new Table object
      var table = new Tables({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      table.$save(function (response) {
        $location.path('tables/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Table
    $scope.remove = function (table) {
      if (table) {
        table.$remove();

        for (var i in $scope.tables) {
          if ($scope.tables[i] === table) {
            $scope.tables.splice(i, 1);
          }
        }
      } else {
        $scope.table.$remove(function () {
          $location.path('tables');
        });
      }
    };

    // Update existing Table
    $scope.update = function () {
      var table = $scope.table;

      table.$update(function () {
        $location.path('tables/' + table._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    */
    this.currentPage  = 1; // Initial value : current page

    this.maxSize      = 3; // Initial value : pagination max size 
                           // (static - bottom selection)

    this.entryLimit   = 5; // Initial value : Rows to show 
                           // (set by user, not data dependent)

    this.length       = 20; // Initial value : max rows for data table

    this.query_str        = '*';
    this.orderByField = 'name';
    this.reverseSort  = false;

    $scope.$watch(

      // First argument : watch these variables.
      angular.bind(this, function () {
         return (this.currentPage.toString()+this.entryLimit.toString()+this.query_str+this.reverseSort); // `this` IS the `this` above!!
      }),

      // Second argument : Do this when the variable changes.
      angular.bind(this, function () {
        this.find();
      })

    );

    // Find a list of Tables
    this.find = function () {

      var entryLimit = parseInt(this.entryLimit, 10); // Int conversion
      var start = (this.currentPage-1)*entryLimit;
      var srt = 1;
      if (this.reverseSort) {
        srt = -1;
      }

      var self = this;
      
      Tables.query({
        cmd:'get_count', 
	query_str:this.query_str
      }).$promise.then(function (result) {
       self.length = result[0].count;
      });

      Tables.query({
                               skip  : start,
                               limit : entryLimit,
                               query_str : this.query_str, 
                               sort  : srt,
      }).$promise.then(function (result) {
       self.tables = result;
     });

    };

    this.find();

    /*
    // Find existing Table
    $scope.findOne = function () {
      $scope.table = Tables.get({
        tableId: $stateParams.tableId
      });
    };
    */
  }


]);


