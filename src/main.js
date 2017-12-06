var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Routes = [
    { url: "/$", controller: "common", action: "Index" }
];
/// <reference path="../route/route.ts" />
var Config = {
    Static: {
        Path: __dirname + "/public",
        Extensions: ["html", "js", "css"]
    },
    Port: 8022,
    Routes: Routes
};
/// <reference path="../config/config.ts" />
var rm;
/// <reference path="../config/config.ts" />
(function (rm) {
    var Applcation = /** @class */ (function () {
        function Applcation() {
            this.mApp = require("express")();
        }
        Applcation.prototype.Start = function () {
            this.RegisterStatic();
            this.RegisterRoute();
            this.RegisterListen();
        };
        Applcation.prototype.RegisterStatic = function () {
            var express = require('express');
            var app = express();
            var options = {
                dotfiles: 'ignore',
                etag: false,
                extensions: Config.Static.Extensions,
                index: false,
                maxAge: '1d',
                redirect: false,
                setHeaders: function (res, path, stat) {
                    res.set('x-timestamp', Date.now());
                }
            };
            this.mApp.use(express.static(Config.Static.Path, options));
        };
        Applcation.prototype.RegisterListen = function () {
            this.mApp.listen(Config.Port, function () { });
        };
        Applcation.prototype.RegisterRoute = function () {
            var _this = this;
            Config.Routes.forEach(function (route) {
                _this.mApp.use(route.url, function (request, response) {
                    var httpContext = new rm.HttpContext();
                    httpContext.Response = response;
                    httpContext.Request = request;
                    httpContext.Route = route;
                    var controller = rm.ControllerFactory.GetController(route.controller, httpContext);
                    console.log(controller);
                    controller[route.action]();
                });
            });
        };
        return Applcation;
    }());
    rm.Applcation = Applcation;
})(rm || (rm = {}));
/// <reference path="./base/application.ts" />
var app = new rm.Applcation();
app.Start();
var rm;
(function (rm) {
    var Controller = /** @class */ (function () {
        function Controller() {
        }
        Controller.prototype.SetContext = function (context) {
            this.mContext = context;
        };
        Controller.prototype.View = function (dataView, filename) {
            var fs = require("fs");
            filename = filename == undefined ? __dirname + "/" + this.mContext.Route.controller + "/" + this.mContext.Route.action + ".html" : filename;
            var html = fs.readFileSync(filename, "utf8");
            this.mContext.Response.send(html);
        };
        return Controller;
    }());
    rm.Controller = Controller;
    function ControllerBase(name) {
        return function (constructor) {
            ControllerFactory.Register(name, constructor);
        };
    }
    rm.ControllerBase = ControllerBase;
    var ControllerFactory = /** @class */ (function () {
        function ControllerFactory() {
        }
        ControllerFactory.Register = function (name, constructor) {
            console.log({ func: constructor, name: name });
            this.mControllers.push({ func: constructor, name: name });
        };
        ControllerFactory.GetController = function (name, context) {
            var controller = new (this.mControllers.filter(function (controller) { return controller.name == name; })[0].func);
            controller.SetContext(context);
            return controller;
        };
        ControllerFactory.mControllers = new Array();
        return ControllerFactory;
    }());
    rm.ControllerFactory = ControllerFactory;
})(rm || (rm = {}));
var rm;
(function (rm) {
    var HttpContext = /** @class */ (function () {
        function HttpContext() {
        }
        return HttpContext;
    }());
    rm.HttpContext = HttpContext;
})(rm || (rm = {}));
var rm;
(function (rm) {
    var CommonController = /** @class */ (function (_super) {
        __extends(CommonController, _super);
        function CommonController() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CommonController.prototype.Index = function () {
            this.View(null, __dirname + "/public/index.html");
        };
        CommonController = __decorate([
            rm.ControllerBase("common")
        ], CommonController);
        return CommonController;
    }(rm.Controller));
    rm.CommonController = CommonController;
})(rm || (rm = {}));
