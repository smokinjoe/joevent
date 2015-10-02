var j = (function () {
  // private vars
  var debug = false;
  var hooks = {};

  // private methods
  var _callHhook = function (method, args, context) {
    args.push(context);  // should this be here or in fire() ?
    method.apply(window, args);
  };

  // public methods
  return {
    set: function (e, name, method, args) {
      if (debug) console.log('set: ' + name + ' for ' + e);

      hooks[e] = hooks[e] || {};
      hooks[e][name] = hooks[e][name] || [];

      hooks[e][name] = {
        'method' : method,
        'args' : (typeof args === Array) ? args : [args] // this needs to be an array
      };
    },
    remove: function (e, name) {
      if (debug) console.log('remove: ' + arg);

      if (typeof hooks[e][name] !== undefined) {
        delete hooks[e][name];
      }
    },
    fire: function (e, context) {
      if (debug) console.log('fire: ' + e);

      var context = context || self;

      if (typeof hooks[e] !== undefined) {
        for (var key in hooks[e]) {
          var hook = hooks[e][key];
          _callHook(hook.method, hook.args, context);
        }
      }
    },
    debug: function () {
      debug = true;
    }
  };
}());

//joevent.set('the_event', 'hook_name', f(), args);