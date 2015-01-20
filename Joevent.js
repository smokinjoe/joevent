var joevent = (function () {
  // private vars
  var debug = false;
  var hooks = {};

  // private methods
  var _call_hook = function (method, args, context) {
    args.push(context);  // should this be here or in fire_event() ?
    method.apply(window, args);
  };

  // public methods
  return {
    set_hook: function (e, name, method, args) {
      if (debug) console.log('set_hook: ' + name + ' for ' + e);

      hooks[e] = hooks[e] || {};
      hooks[e][name] = hooks[e][name] || [];

      hooks[e][name] = {
        'method' : method,
        'args' : (typeof args === Array) ? args : [args] // this needs to be an array
      };
    },
    remove_hook: function (e, name) {
      if (debug) console.log('remove_hook: ' + arg);

      if (typeof hooks[e][name] !== undefined) {
        delete hooks[e][name];
      }
    },
    fire_event: function (e, context) {
      if (debug) console.log('fire_event: ' + e);

      var context = context || self;

      if (typeof hooks[e] !== undefined) {
        for (var key in hooks[e]) {
          var hook = hooks[e][key];
          _call_hook(hook.method, hook.args, context);
        }
      }
    },
    debug: function () {
      debug = true;
    }
  };
}());

//joevent.set_hook('the_event', 'hook_name', f(), args);