'use strict';

let I;

module.exports = {
    _init() {
        I = require('../steps_file.js')();
    },
    buttons: {
        search: "//i[@class='anticon anticon-search']",
        perfectMatch: "//a[@href='/']",
        whatIHave: "//a[@href='/filterHas']",
        whatIWant: "//a[@href='/filterWants']",
    },
    showButtons() {
        I.seeElement(this.buttons.search);
        I.moveCursorTo(this.buttons.search);
        I.seeElement(this.buttons.perfectMatch);
    },
    clickPerfectMatch() {
        I.seeElement(this.buttons.perfectMatch);
        I.click(this.buttons.perfectMatch);
        I.seeCurrentUrlEquals('/');
    },
    clickWhatIHave() {
        I.seeElement(this.buttons.whatIHave);
        I.click(this.buttons.whatIHave);
        I.seeCurrentUrlEquals('/filterHas');
    },
    clickWhatIWant() {
        I.seeElement(this.buttons.whatIWant);
        I.click(this.buttons.whatIWant);
        I.seeCurrentUrlEquals('/filterWants');
    }
}
