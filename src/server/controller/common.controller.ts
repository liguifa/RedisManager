namespace rm {
    @ControllerBase("common")
    export class CommonController extends Controller {

        public Index(): void {
            this.View(null, `${__dirname}/public/index.html`);
        }
    }
}