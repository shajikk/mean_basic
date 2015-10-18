'use strict';

// Setting up route
angular.module('tables').config(['$stateProvider',
  function ($stateProvider) {
    // Tables state routing
    $stateProvider
      .state('tables', {
        abstract: true,
        url: '/tables',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('tables.list', {
        url: '',
        templateUrl: 'modules/tables/views/list-tables.client.view.html'
      })
      .state('tables.create', {
        url: '/create',
        templateUrl: 'modules/tables/views/create-table.client.view.html'
      })
      .state('tables.view', {
        url: '/:tableId',
        templateUrl: 'modules/tables/views/view-table.client.view.html'
      })
      .state('tables.edit', {
        url: '/:tableId/edit',
        templateUrl: 'modules/tables/views/edit-table.client.view.html'
      });
  }
]);
