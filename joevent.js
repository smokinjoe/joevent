var j = (function () {
  // private vars
  var debug = false;
  var hooks = {};

  // private methods
  var _callHook = (method, args, context) => {
    args.push(context);  // should this be here or in fire() ?
    method.apply(window, args);
  };

  // public methods
  return {
    set: (e, name, method, args) => {
      if (debug) console.log('set: ' + name + ' for ' + e);

      hooks[e] = hooks[e] || {};
      hooks[e][name] = hooks[e][name] || [];

      hooks[e][name] = {
        'method' : method,
        'args' : (typeof args === Array) ? args : [args] // this needs to be an array
      };
    },
    remove: (e, name) => {
      if (debug) console.log('remove: ' + e + '[' + name + ']');

      if (typeof name === 'undefined') {
        delete hooks[e];
      }
      else if (typeof hooks[e][name] !== 'undefined') {
        delete hooks[e][name];
      }
    },
    fire: (e, context) => {
      if (debug) console.log('fire: ' + e);

      var context = context || self;

      if (typeof hooks[e] !== 'undefined') {
        for (var key in hooks[e]) {
          var hook = hooks[e][key];
          _callHook(hook.method, hook.args, context);
        }
      }
    },
    debug: () => {
      debug = true;
    }
  };
}());

//joevent.set('the_event', 'hook_name', f(), args);