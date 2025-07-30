"use strict";
exports.__esModule = true;
exports.Navigation = void 0;
require("./Navigation.css");
var search_icon_svg_1 = require("../../../public/search-icon.svg");
var image_1 = require("next/image");
exports.Navigation = function () {
    return (React.createElement("ul", { className: "header__list" },
        React.createElement("li", { className: "header__list-item" },
            React.createElement("span", { className: "item__text" }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F")),
        React.createElement("li", { className: "header__list-item" },
            React.createElement("span", { className: "item__text" }, "\u0416\u0430\u043D\u0440\u044B")),
        React.createElement("li", { className: "header__list-item" },
            React.createElement(image_1["default"], { src: search_icon_svg_1["default"], width: 143, height: 32, className: "header__logo", alt: "Logo VK Marysa" }),
            React.createElement("input", { type: "text", className: "item__search", name: "name", placeholder: "\u041F\u043E\u0438\u0441\u043A" }))));
};
