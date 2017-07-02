"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var table = "\n.one-column-emphasis{\n\tfont-size: 16px;\n\twidth: 1024PX;\n\ttext-align: left;\n\tborder: 1px solid #dddddd;\n\tborder-collapse: collapse;\n\tmargin: 20px;\n}\n\n.one-column-emphasis th{\n\tfont-size: 15px;\n\tfont-weight: bold;\n\tcolor: #039;\n\tpadding: 12px 15px;\n}\n\n.one-column-emphasis th.sortable{\n\tposition: relative;\n  cursor: pointer;\n  user-select: none;\n  padding-right: 2rem;\n}\n.one-column-emphasis th span.sortable::after{\n\t position: absolute;\n\t  content: '';\n\t  width: 20px;\n\t  height: 20px;\n\t  top: 50%;\n\t  right: 10px;\n\t  margin-top: -10px;\n\t  background: url('/static/sort_sprite.png') no-repeat 0 0;\n\t  overflow: hidden;\n}\n.one-column-emphasis th span.sortable.sort-asc::after{\n\t background-position: -20px 0;\n}\n.one-column-emphasis th span.sortable.sort-dsc::after{\n\t background-position: -40px 0;\n}\n\n\n.one-column-emphasis td{\n\tcolor: #000000;\n\tborder-top: 1px solid #e8edff;\n\tpadding: 10px 15px;\n}\n\n.one-column-emphasis tbody tr:first-child{\n\tborder-top: 5px solid #e8edff;\n}\n\n.one-column-emphasis tbody tr:nth-child(even){\n\tbackground-color: #efe8ff;\n}";

exports.default = table;