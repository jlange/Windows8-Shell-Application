// Author: Jon Lange <jlange@vretina.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// This file only needs to be modified if we are adding
// more external libraries. I can help with this
// when it becomes an issue.
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    text: 'libs/require/text',
  }

});

require([

  // Load our app module and pass it to our definition function
  'application/ShellApplicationView',

], function (application) {
    var appView = new application();
});
