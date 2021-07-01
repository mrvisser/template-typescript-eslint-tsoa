"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_option_1 = require("ts-option");
const typescript_ioc_1 = require("typescript-ioc");
const app_1 = require("./app");
const Logger_1 = require("./service/Logger");
const port = ts_option_1.option(process.env.PORT).getOrElseValue('3000');
app_1.app.listen(port, () => {
    typescript_ioc_1.Container.get(Logger_1.Logger).info(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlDQUFtQztBQUNuQyxtREFBMkM7QUFFM0MsK0JBQTRCO0FBQzVCLDZDQUEwQztBQUUxQyxNQUFNLElBQUksR0FBRyxrQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdELFNBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNwQiwwQkFBUyxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsQ0FBQyxJQUFJLENBQ3hCLDZDQUE2QyxJQUFJLEVBQUUsQ0FDcEQsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIn0=