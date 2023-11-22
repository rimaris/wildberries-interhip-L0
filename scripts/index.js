import View from "./view.js";
import Model from "./model.js"
import Controller from "./controller.js";

function run() { 
    const model = new Model();
    const view = new View(model);
    const controller = new Controller(model, view);
}

run();
