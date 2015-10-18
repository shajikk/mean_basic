'use strict';

// Tables controller
var mod = angular.module('tables');

  mod.directive('tableControls', function() {
      return {
          restrict: 'E',
          scope: { obj: '=' },
          templateUrl: 'modules/tables/directives/templates/tableControls.html',
      };
  });
               
  mod.directive('tablePager', function() {
      return {
          restrict: 'E',
          scope: { obj: '=' },
          templateUrl: 'modules/tables/directives/templates/tablePager.html',
      };
  });
  
  
  mod.directive('tableSort', function() {
      return {
          restrict: 'E',
          scope: { 
                    obj : '=', 
                    field : '@', 
                    text : '@', 
                    link : '@', 
                 },
          templateUrl: 'modules/tables/directives/templates/tableSort.html',
      };
  });

