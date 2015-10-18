'use strict';

// Configuring the Tables module
angular.module('tables').run(['Menus',
  function (Menus) {
    // Add the tables dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Tables',
      state: 'tables',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'tables', {
      title: 'List Tables',
      state: 'tables.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'tables', {
      title: 'Create Tables',
      state: 'tables.create'
    });
  }
]);
