import * as ace from '../../node_modules/ace-builds/src-min-noconflict/ace.js';
import * as python_mode from '../../node_modules/ace-builds/src-min-noconflict/mode-python.js';

const editorState = {
  fontSize: 20,
};

export const setFontSize = (size: number) => {
  document.getElementById('editor').style.fontSize = `${size}px`;
};

export const fontPlus = () => {
  editorState.fontSize += 2;
  setFontSize(editorState.fontSize);
};

export const fontMinus = () => {
  editorState.fontSize = Math.max(8, editorState.fontSize - 2);
  setFontSize(editorState.fontSize);
};

const Range4 = ace.require('ace/range').Range;

export const editor = ace.edit('editor');

// editor.setTheme(solarized_light);
editor.getSession().setMode(new python_mode.Mode());
// editor.getSession().setMode(new js_mode.Mode());
editor.getSession().setUseWrapMode(true); /* 折り返しあり */
setFontSize(20);

let markers = [];

export const checkZenkaku = () => {
  const lines: [string] = editor.getSession().getDocument().getAllLines();
  if (markers.length > 0) {
    for (const m of markers) {
      editor.session.removeMarker(m);
    }
    markers = [];
  }
  for (let i = 0; i < lines.length; i++) {
    const s = lines[i];
    for (let c = 0; c < s.length; c++) {
      const ch = s.charCodeAt(c);
      if (ch > 127) {
        console.log(`${s}: ${i},${c}, ${ch}`);
        const m = editor.session.addMarker(new Range4(i, c, i + 1, c), 'utf8', 'text');
        markers.push(m);
      }
    }
  }
};

// document.getElementsByClassName('ace_gutter')[0].setAttribute('style', 'background: rgb(49, 48, 47); color: white;');

export const terminal = ace.edit('terminal');
terminal.setReadOnly(true);
terminal.renderer.setShowGutter(false);
terminal.renderer.setOption('showLineNumbers', false);

/**
function resizeAce() {
  return $('#editor').height($(window).height());
};
//listen for changes
$(window).resize(resizeAce);
//set initially
resizeAce(); */

/*
var annotations = [
        {
            row: 2,
            type: "error",
            text: "error message"
        }
];

var editor = ace.edit("editor");
editor.getSession().setAnnotations(annotations);
*/