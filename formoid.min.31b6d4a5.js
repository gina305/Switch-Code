// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/formoid/formoid.min.js":[function(require,module,exports) {
var Formoid = function () {
  var API_URL = 'https://formoid.net/api/push';
  function $ajax(url, settings) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(settings.type, url);
      xhr.onload = function () {
        if (xhr.status !== 200) {
          return reject(new Error('Incorrect server response.'));
        }
        resolve(xhr.responseText);
      };
      xhr.onerror = function () {
        var message = 'Failed to query the server. ';
        if ('onLine' in navigator && !navigator.onLine) {
          message += 'No connection to the Internet.';
        } else {
          message += 'Check the connection and try again.';
        }
        reject(new Error(message));
      };
      xhr.send(settings.data);
    });
  }
  ;
  var prop = function prop(name, args) {
    name = '__' + name + '__';
    if (args.length) {
      this[name] = args[0];
      return this;
    }
    return this[name];
  };
  var _Form = function Form(settings) {
    settings = settings || {};
    this.__email__ = settings.email || '';
    this.__title__ = settings.title || '';
    this.__data__ = settings.data || [];
  };
  _Form.prototype.email = function (value) {
    return prop.call(this, 'email', arguments);
  };
  _Form.prototype.title = function (value) {
    return prop.call(this, 'title', arguments);
  };
  _Form.prototype.data = function (value) {
    return prop.call(this, 'data', arguments);
  };
  _Form.prototype.send = function (data) {
    return $ajax(API_URL, {
      type: 'POST',
      data: JSON.stringify({
        email: this.__email__,
        form: {
          title: this.__title__,
          data: arguments.length ? data : this.__data__
        }
      })
    }).then(function (responseText) {
      var data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Incorrect server response.');
      }
      if (data.error) {
        throw new Error(data.error);
      }
      return data.response;
    });
  };
  return {
    Form: function Form(settings) {
      return new _Form(settings);
    }
  };
}();
var formModalDOM = document.createElement('div');
var formModal;
formModalDOM.classList.add('modal');
formModalDOM.setAttribute('tabindex', -1);
formModalDOM.style.overflow = 'hidden';
if (typeof bootstrap !== 'undefined') {
  if (bootstrap.Tooltip.VERSION.startsWith(5)) {
    //bs5
    formModalDOM.innerHTML = "\n            <div class=\"modal-dialog d-flex align-items-center\" style=\"\">\n                <div class=\"modal-content\" style=\"height:auto;border-radius:0;border:none;box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);\">\n                    <div class=\"modal-body d-flex justify-content-end flex-column align-items-end\">\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                        <p class=\"display-7\" style=\"text-align:center;width:100%;\">Modal body text goes here.</p>\n                    </div>\n                </div>\n            </div>";
  } else {
    // bs4
    formModalDOM.innerHTML = "\n            <div class=\"modal-dialog d-flex align-items-center\" style=\"\">\n                <div class=\"modal-content\" style=\"height:auto;border-radius:0;border:none;box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);\">\n                    <div class=\"modal-body d-flex justify-content-end flex-column align-items-end\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                        <p class=\"display-7\" style=\"text-align:center;width:100%;\">Modal body text goes here.</p>\n                    </div>\n                </div>\n            </div>";
  }
} else if ($.fn.Tooltip) {
  // bs3
  formModalDOM.innerHTML = "\n        <div class=\"modal-dialog d-flex align-items-center\" style=\"\">\n            <div class=\"modal-content\" style=\"height:auto;border-radius:0;border:none;box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);\">\n                <div class=\"modal-body d-flex justify-content-end flex-column align-items-end\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <p class=\"display-7\" style=\"text-align:center;width:100%;\">Modal body text goes here.</p>\n                </div>\n            </div>\n        </div>";
}
if (bootstrap) {
  formModal = new bootstrap.Modal(formModalDOM);
}
var isValidEmail = function isValidEmail(input) {
  return input.value ? /^([^@]+?)@(([a-z0-9]-*)*[a-z0-9]+\.)+([a-z0-9]+)$/i.test(input.value) : true;
};
var formComponents = document.querySelectorAll('[data-form-type="formoid"]');
formComponents.forEach(function (component) {
  var formData,
    form = component.tagName === 'FORM' ? component : component.querySelector('form'),
    alert = component.querySelector('[data-form-alert]'),
    title = component.getAttribute('data-form-title') ? component : component.querySelector('[data-form-title]'),
    submit = component.querySelector('[type="submit"]'),
    inputArr = component.querySelectorAll('[data-form-field]'),
    alertSuccess = alert.innerHTML;
  form.addEventListener('change', function (event) {
    if (event.target.type === 'file') {
      if (event.target.files[0].size > 1000000) {
        formModal._element.querySelector('.modal-body p').innerText = 'File size must be less than 1mb';
        formModal._element.querySelector('.modal-content').classList.add('alert-danger');
        formModal._element.querySelector('.modal-content').style.backgroundColor = '#ff9966';
        formModal.show();
        submit.classList.add('btn-loading');
        submit.setAttribute('disabled', true);
      }
    }
  });
  form.addEventListener('submit', function (event) {
    event.stopPropagation();
    event.preventDefault();
    if (submit.classList.contains('btn-loading')) return;
    var inputs = inputArr;
    form.classList.add('form-active');
    submit.classList.add('btn-loading');
    submit.setAttribute('disabled', true);
    alert.innerHTML = '';
    formData = formData || Formoid.Form({
      email: component.querySelector('[data-form-email]').value,
      title: title.getAttribute('data-form-title') || title.innerText
    });
    function parseInput(input) {
      return new Promise(function (resolve, reject) {
        // valide email
        if (input.getAttribute('name') === 'email' && !isValidEmail(input)) {
          return reject(new Error('Form is not valid'));
        }
        var name = input.getAttribute('data-form-field') || input.getAttribute('name');
        switch (input.getAttribute('type')) {
          case 'file':
            var file = input.files[0];
            if (!file) return resolve();
            var reader = new FileReader();
            reader.onloadend = function () {
              resolve([name, reader.result]);
            };
            reader.onerror = function () {
              reject(reader.error);
            };
            reader.readAsDataURL(file);
            break;
          case 'checkbox':
            resolve([name, input.checked ? input.value : 'No']);
            break;
          case 'radio':
            resolve(input.checked && [name, input.value]);
            break;
          default:
            resolve([name, input.value]);
        }
      });
    }
    Promise.all(Array.prototype.map.call(inputs, function (input) {
      return parseInput(input);
    })).then(function (data) {
      return formData.send(data.filter(function (v) {
        return v;
      }));
    }).then(function (message) {
      form.reset();
      form.classList.remove('form-active');
      formModal._element.querySelector('.modal-body p').innerText = alertSuccess || message;
      formModal._element.querySelector('.modal-content').classList.add('alert-success');
      formModal._element.querySelector('.modal-content').style.backgroundColor = '#70c770';
      formModal.show();
    }, function (err) {
      formModal._element.querySelector('.modal-body p').innerText = err.message;
      formModal._element.querySelector('.modal-content').classList.add('alert-danger');
      formModal._element.querySelector('.modal-content').style.backgroundColor = '#ff9966';
    }).then(function () {
      submit.classList.remove('btn-loading');
      submit.removeAttribute('disabled');
    });
  });
  inputArr.forEach(function (elem) {
    elem.addEventListener('focus', function () {
      submit.classList.remove('btn-loading');
      submit.removeAttribute('disabled');
    });
  });
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41327" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/formoid/formoid.min.js"], null)
//# sourceMappingURL=/formoid.min.31b6d4a5.js.map