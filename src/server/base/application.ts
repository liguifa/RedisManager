/// <reference path="../config/config.ts" />

namespace rm {
    export class Applcation {
        private mApp: any;

        constructor() {
            this.mApp = require("express")();
        }

        public Start(): void {
            this.RegisterStatic();
            this.RegisterRoute();
            this.RegisterListen();
        }

        private RegisterStatic(): void {
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
            }
            this.mApp.use(express.static(Config.Static.Path, options));
        }

        private RegisterListen(): void {
            this.mApp.listen(Config.Port, function () { });
        }

        private RegisterRoute(): void {
            Config.Routes.forEach(route => {
                this.mApp.use(route.url, (request, response) => {
                    let httpContext = new HttpContext();
                    httpContext.Response = response;
                    httpContext.Request = request;
                    httpContext.Route = route;
                    let controller = ControllerFactory.GetController(route.controller, httpContext);
                    console.log(controller);
                    controller[route.action]();
                });
            });
        }
    }
}