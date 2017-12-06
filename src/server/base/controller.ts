namespace rm {
    export class Controller {
        private mContext: HttpContext;

        public SetContext(context: HttpContext): void {
            this.mContext = context;
        }

        public View(dataView: any, filename: string) {
            let fs = require("fs");
            filename = filename == undefined ? `${__dirname}/${this.mContext.Route.controller}/${this.mContext.Route.action}.html` : filename;
            let html = fs.readFileSync(filename, "utf8");
            this.mContext.Response.send(html);
        }
    }

    export function ControllerBase(name: string) {
        return function (constructor: Function) {
            ControllerFactory.Register(name, constructor);
        }
    }

    export class ControllerFactory {
        private static mControllers: Array<any> = new Array<any>();

        public static Register(name: string, constructor: Function): void {
            console.log({ func: constructor, name: name });
            this.mControllers.push({ func: constructor, name: name });
        }

        public static GetController(name: string, context: HttpContext) {
            let controller = new (this.mControllers.filter(controller => controller.name == name)[0].func);
            controller.SetContext(context);
            return controller;
        }
    }
}