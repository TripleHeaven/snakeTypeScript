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
})({"scripts/Item.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;
var Item;

(function (Item) {
  Item[Item["BORDER"] = 0] = "BORDER";
  Item[Item["FOOD"] = 1] = "FOOD";
  Item[Item["SNAKEHEAD"] = 2] = "SNAKEHEAD";
  Item[Item["SNAKETAIL"] = 3] = "SNAKETAIL";
  Item[Item["FIELD"] = 4] = "FIELD";
})(Item || (Item = {}));

exports.Item = Item;
},{}],"scripts/Drawing.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawing = void 0;

var Item_1 = require("./Item");

var Drawing =
/** @class */
function () {
  function Drawing(canvas, grid) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.grid = grid;
    this.squareSize = canvas.width / grid.grid.length;
  }

  Drawing.prototype.DrawFrame = function () {
    // Running thru Grid 
    var width = 15;
    var height = 15;
    this.ctx.fillStyle = "#111111";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.grid.mapWidth; i++) {
      for (var j = 0; j < this.grid.mapHeight; j++) {
        if (this.grid.grid[i][j].sym == Item_1.Item.FIELD) {
          this.ctx.fillStyle = "#111111";
          this.ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize, this.squareSize);
        } else if (this.grid.grid[i][j].sym == Item_1.Item.FOOD) {
          this.ctx.fillStyle = "#5CB54A";
          this.ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize, this.squareSize);
        } else if (this.grid.grid[i][j].sym == Item_1.Item.BORDER) {
          this.ctx.fillStyle = "#1899FF";
          this.ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize, this.squareSize);
        } else if (this.grid.grid[i][j].sym == Item_1.Item.SNAKETAIL) {
          this.ctx.fillStyle = "yellow";
          this.ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize, this.squareSize);
        }
      }
    }
  };

  return Drawing;
}();

exports.Drawing = Drawing;
},{"./Item":"scripts/Item.ts"}],"scripts/Direction.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Direction = void 0;
var Direction;

(function (Direction) {
  Direction[Direction["UP"] = 0] = "UP";
  Direction[Direction["DOWN"] = 1] = "DOWN";
  Direction[Direction["LEFT"] = 2] = "LEFT";
  Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction = exports.Direction || (exports.Direction = {}));
},{}],"scripts/Point.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

var Direction_1 = require("./Direction");

var Point =
/** @class */
function () {
  function Point(x, y, sym, p) {
    if (typeof x === "number") {
      this.x = x;
      this.y = y;
      this.sym = sym;
    } else {
      this.sym = x.sym;
      this.x = x.x;
      this.y = x.y;
    }
  }

  Point.prototype.Move = function (offset, dir) {
    if (dir == Direction_1.Direction.UP) {
      this.y -= offset;
    }

    if (dir == Direction_1.Direction.DOWN) {
      this.y += offset;
    }

    if (dir == Direction_1.Direction.LEFT) {
      this.x -= offset;
    }

    if (dir == Direction_1.Direction.RIGHT) {
      this.x += offset;
    }
  };

  Point.prototype.isHit = function (p) {
    return p.x == this.x && p.y == this.y;
  };

  return Point;
}();

exports.Point = Point;
},{"./Direction":"scripts/Direction.ts"}],"scripts/Grid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Grid = void 0;

var Item_1 = require("./Item");

var Point_1 = require("./Point");

var Grid =
/** @class */
function () {
  function Grid(mapWidth, mapHeight) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.grid = [];

    for (var i = 0; i < mapWidth; i++) {
      this.grid[i] = [];

      for (var j = 0; j < mapHeight; j++) {
        this.grid[i][j] = new Point_1.Point(i, j, Item_1.Item.FIELD);
      }
    }
  }

  Grid.prototype.forDrawFrame = function () {
    for (var i = 0; i < this.mapWidth; i++) {
      this.grid[i] = [];

      for (var j = 0; j < this.mapHeight; j++) {
        this.grid[i][j] = new Point_1.Point(i, j, Item_1.Item.FIELD);
      }
    }
  };

  Grid.prototype.getInfo = function (list) {
    for (var i = 0; i < this.mapWidth; i++) {
      for (var j = 0; j < this.mapHeight; j++) {
        for (var listi = 0; listi < list.length; listi++) {
          if (list[listi].x == this.grid[i][j].x && list[listi].y == this.grid[i][j].y) {
            this.grid[i][j].sym = list[listi].sym;
          }
        }
      }
    }
  };

  return Grid;
}();

exports.Grid = Grid;
},{"./Item":"scripts/Item.ts","./Point":"scripts/Point.ts"}],"scripts/Figure.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Figure = void 0;

var Figure =
/** @class */
function () {
  function Figure() {}

  Figure.prototype.IsHitP = function (p) {
    this.pointList.forEach(function (l) {
      if (l.isHit(p)) {
        return true;
      }
    });
    return false;
  };

  Figure.prototype.IsHitF = function (f) {
    this.pointList.forEach(function (l) {
      if (f.IsHitP(l)) {
        return true;
      }
    });
    return false;
  };

  return Figure;
}();

exports.Figure = Figure;
},{}],"scripts/Wall.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wall = void 0;

var Point_1 = require("./Point");

var Item_1 = require("./Item");

var Figure_1 = require("./Figure");

var Wall =
/** @class */
function (_super) {
  __extends(Wall, _super);

  function Wall(mapWidth, mapHeight) {
    var _this = //vertical lines
    _super.call(this) || this;

    _this.pointList = [];

    for (var i = 0; i < mapWidth; i++) {
      _this.pointList.push(new Point_1.Point(i, 0, Item_1.Item.BORDER));
    }

    for (var i = 0; i < mapWidth; i++) {
      _this.pointList.push(new Point_1.Point(i, mapHeight - 1, Item_1.Item.BORDER));
    } //horizontal lines


    for (var i = 0; i < mapHeight; i++) {
      _this.pointList.push(new Point_1.Point(0, i, Item_1.Item.BORDER));
    }

    for (var i = 0; i < mapHeight; i++) {
      _this.pointList.push(new Point_1.Point(mapWidth - 1, i, Item_1.Item.BORDER));
    }

    return _this;
  }

  return Wall;
}(Figure_1.Figure);

exports.Wall = Wall;
},{"./Point":"scripts/Point.ts","./Item":"scripts/Item.ts","./Figure":"scripts/Figure.ts"}],"scripts/Snake.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Snake = void 0;

var Point_1 = require("./Point");

var Figure_1 = require("./Figure");

var Item_1 = require("./Item");

var Snake =
/** @class */
function (_super) {
  __extends(Snake, _super);

  function Snake(tail, lenght, _direction) {
    var _this = _super.call(this) || this;

    _this.pointList = [];
    _this.direction = _direction;

    for (var i = 0; i < lenght; i++) {
      var p = new Point_1.Point(tail);
      p.Move(i, _this.direction);

      _this.pointList.push(p);
    }

    return _this;
  }

  Snake.prototype.Move = function () {
    var tail = this.pointList.shift();
    var head = this.GetNextPoint();
    this.pointList.push(head);
  };

  Snake.prototype.GetNextPoint = function () {
    var head = this.pointList[this.pointList.length - 1];
    var nextP = new Point_1.Point(head);
    nextP.Move(1, this.direction);
    return nextP;
  };

  Snake.prototype.Eat = function (food) {
    var head = this.GetNextPoint();

    if (head.isHit(food)) {
      food.sym = Item_1.Item.SNAKETAIL;
      this.pointList.push(food);
      return true;
    }

    return false;
  };

  Snake.prototype.IsHitTail = function () {
    var head = this.pointList[this.pointList.length - 1];

    for (var i = 0; i < this.pointList.length - 2; i++) {
      if (head.isHit(this.pointList[i])) {
        return true;
      }
    }

    return false;
  };

  Snake.prototype.IsHitWall = function (w) {
    var head = this.pointList[this.pointList.length - 1];

    for (var i = 0; i < w.pointList.length - 1; i++) {
      if (head.isHit(w.pointList[i])) {
        return true;
      }
    }

    return false;
  };

  return Snake;
}(Figure_1.Figure);

exports.Snake = Snake;
},{"./Point":"scripts/Point.ts","./Figure":"scripts/Figure.ts","./Item":"scripts/Item.ts"}],"scripts/Food.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Food = void 0;

var Figure_1 = require("./Figure");

var Point_1 = require("./Point");

var Item_1 = require("./Item");

var Food =
/** @class */
function (_super) {
  __extends(Food, _super);

  function Food(mapWidth, mapHeight) {
    var _this = _super.call(this) || this;

    _this.pointList = [];
    _this.mapWidth = mapWidth;
    _this.mapHeight = mapHeight;
    return _this;
  }

  Food.prototype.CreateFood = function (snake) {
    var x = this.getRandomInt(1, this.mapWidth - 1);
    var y = this.getRandomInt(1, this.mapHeight - 1);

    if (snake.IsHitP(new Point_1.Point(x, y, Item_1.Item.FOOD))) {
      this.CreateFood(snake);
    } else {
      if (this.pointList.length != 0) {
        this.pointList.shift();
      }

      this.pointList.push(new Point_1.Point(x, y, Item_1.Item.FOOD));
    }
  };

  Food.prototype.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  };

  return Food;
}(Figure_1.Figure);

exports.Food = Food;
},{"./Figure":"scripts/Figure.ts","./Point":"scripts/Point.ts","./Item":"scripts/Item.ts"}],"scripts/Program.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Drawing_1 = require("./Drawing");

var Grid_1 = require("./Grid");

var Wall_1 = require("./Wall");

var Snake_1 = require("./Snake");

var Item_1 = require("./Item");

var Direction_1 = require("./Direction");

var Point_1 = require("./Point");

var Food_1 = require("./Food");

window.onload = function () {
  var width;
  var height;
  var canvas;
  var ctx;
  var grid;
  grid = new Grid_1.Grid(30, 30);
  var wall = new Wall_1.Wall(30, 30);
  grid.getInfo(wall.pointList);
  var drawThing;
  var snake = new Snake_1.Snake(new Point_1.Point(4, 4, Item_1.Item.SNAKETAIL), 5, Direction_1.Direction.RIGHT);
  grid.getInfo(snake.pointList);
  var food = new Food_1.Food(30, 30);
  food.CreateFood(snake);
  grid.getInfo(food.pointList); //button Click

  document.addEventListener('keydown', keyDownHandler, false);

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      snake.direction = Direction_1.Direction.RIGHT;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      snake.direction = Direction_1.Direction.LEFT;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
      snake.direction = Direction_1.Direction.DOWN;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
      snake.direction = Direction_1.Direction.UP;
    }
  }

  document.getElementById("testButton").onclick = function () {
    canvas = document.getElementById("gameWindow");
    ctx = canvas.getContext("2d");
    drawThing = new Drawing_1.Drawing(canvas, grid);
    drawThing.DrawFrame();
    var gameLoop = setInterval(function () {
      if (snake.IsHitTail() || snake.IsHitWall(wall)) {
        clearInterval(gameLoop);
      }

      if (snake.Eat(food.pointList[0])) {
        food.CreateFood(snake);
      }

      snake.Move();
      grid.forDrawFrame();
      grid.getInfo(wall.pointList);
      grid.getInfo(snake.pointList);
      grid.getInfo(food.pointList);
      drawThing.DrawFrame();
    }, 500);
  };
};
},{"./Drawing":"scripts/Drawing.ts","./Grid":"scripts/Grid.ts","./Wall":"scripts/Wall.ts","./Snake":"scripts/Snake.ts","./Item":"scripts/Item.ts","./Direction":"scripts/Direction.ts","./Point":"scripts/Point.ts","./Food":"scripts/Food.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33413" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/Program.ts"], null)
//# sourceMappingURL=/Program.1f30c575.js.map