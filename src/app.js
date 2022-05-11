import LANG from './languages/language.js';
import SYMBOLS from './languages/symbols.js';

document.addEventListener('DOMContentLoaded', () => {
  const BODY = document.querySelector('body');
  const WRAPPER = document.createElement('div');
  const TITLE = document.createElement('h1');
  const TEXT_AREA = document.createElement('textarea');
  const KEYBOARD = document.createElement('div');
  const KEYBOARD_KEYS = document.createElement('div');
  const EN_LETTERS = Object.keys(LANG);
  const EN_SYMBOLS = Object.values(SYMBOLS);
  // const RU_LETTERS = Object.values(LANG);
  const DOM_ELEMENTS = [TITLE, TEXT_AREA, KEYBOARD];
  BODY.className = 'body';
  WRAPPER.className = 'wrapper';
  KEYBOARD.className = 'keyboard';
  KEYBOARD_KEYS.className = 'keyboard__keys';
  TITLE.className = 'title';
  TITLE.textContent = 'Virtual Keyboard';
  TEXT_AREA.className = 'text-area';
  TEXT_AREA.style.resize = 'none';
  TEXT_AREA.setAttribute('autofocus', '');
  TEXT_AREA.placeholder = 'Если есть возможность, то проверьте через 2 дня, спасибо';
  BODY.append(WRAPPER);
  DOM_ELEMENTS.forEach((item) => WRAPPER.append(item));
  KEYBOARD.append(KEYBOARD_KEYS);

  function createKeys() {
    EN_LETTERS.forEach((key) => {
      const KEY_ELEMENT = document.createElement('button');
      const LINE_BREAK = ['Backspace', '|', 'Enter', 'Shift-right', '?'];
      const textarea = document.querySelector('textarea');
      KEY_ELEMENT.setAttribute('type', 'button');
      KEY_ELEMENT.classList.add('keyboard__key');
      KEY_ELEMENT.textContent = key;
      let isDown = true;
      const HIDDEN_ELEMENTS = [
        'Shift',
        'Ctrl',
        'Fn',
        'Win',
        'Alt',
        'Backspace',
        'Caps Lock',
        'Enter',
        'Tab',
        'Space',
        String.fromCharCode(9660),
        String.fromCharCode(9650),
        String.fromCharCode(9654),
        String.fromCharCode(9664),
      ];
      KEYBOARD_KEYS.append(KEY_ELEMENT);

      function upperCase() {
        const textBtn = document.querySelectorAll('.keyboard__key');
        textBtn.forEach((item) => {
          if (!HIDDEN_ELEMENTS.includes(item.textContent)) {
            item.innerHTML = item.textContent.toUpperCase();
            isDown = true;
          }
        });
      }

      function lowerCase() {
        const textBtn = document.querySelectorAll('.keyboard__key');
        textBtn.forEach((item) => {
          if (!HIDDEN_ELEMENTS.includes(item.textContent)) {
            item.innerHTML = item.textContent.toLowerCase();
            isDown = false;
          }
        });
      }

      if (LINE_BREAK.includes(key)) {
        const BR = document.createElement('br');
        KEY_ELEMENT.after(BR);
      }

      switch (key) {
        case 'Backspace':
          KEY_ELEMENT.classList.add('keyboard__key-backspace');
          KEY_ELEMENT.addEventListener('click', () => {
            const text = textarea.value;
            const position = textarea.selectionStart;
            textarea.value = text.substring(0, position - 1) + text.substring(position, text.length);
            textarea.setSelectionRange(position - 1, position - 1);
            textarea.focus();
          });
          break;

        case 'Tab':
          KEY_ELEMENT.classList.add('keyboard__key-tab');
          KEY_ELEMENT.addEventListener('click', () => {
            textarea.value += '\t';
            textarea.focus();
          });
          break;

        case 'arrowLeft':
          KEY_ELEMENT.classList.add('keyboard__key-arrleft');
          KEY_ELEMENT.textContent = String.fromCharCode(9664);
          KEY_ELEMENT.addEventListener('click', () => {
            textarea.value += String.fromCharCode(9664);
            textarea.focus();
          });
          break;

        case 'arrowRight':
          KEY_ELEMENT.classList.add('keyboard__key-arright');
          KEY_ELEMENT.textContent = String.fromCharCode(9654);
          KEY_ELEMENT.addEventListener('click', () => {
            textarea.value += String.fromCharCode(9654);
            textarea.focus();
          });
          break;

        case 'arrowUp':
          KEY_ELEMENT.classList.add('keyboard__key-arrup');
          KEY_ELEMENT.textContent = String.fromCharCode(9650);
          KEY_ELEMENT.addEventListener('click', () => {
            textarea.value += String.fromCharCode(9650);
            textarea.focus();
          });
          break;

        case 'arrowDown':
          KEY_ELEMENT.classList.add('keyboard__key-arrdown');
          KEY_ELEMENT.textContent = String.fromCharCode(9660);
          KEY_ELEMENT.addEventListener('click', () => {
            textarea.value += String.fromCharCode(9660);
            textarea.focus();
          });
          break;

        case 'Shift-right':
          KEY_ELEMENT.classList.add('keyboard__key-shift-right');
          KEY_ELEMENT.textContent = 'Shift';
          break;

        case 'Shift-left':
          KEY_ELEMENT.classList.add('keyboard__key-shift-left');
          KEY_ELEMENT.textContent = 'Shift';
          KEY_ELEMENT.addEventListener('mousedown', () => {
            upperCase();
            const textBtn = document.querySelectorAll('.keyboard__key');
            textBtn.forEach((item) => {
              if (isDown === true && Object.keys(SYMBOLS).includes(item.textContent)) {
                item.innerHTML = SYMBOLS[item.textContent];
              }
            });
          });
          KEY_ELEMENT.addEventListener('mouseup', () => {
            lowerCase();
            const textBtn = document.querySelectorAll('.keyboard__key');
            textBtn.forEach((item) => {
              if (isDown === false && Object.values(SYMBOLS).includes(item.textContent)) {
                if (item.textContent === ')') {
                  item.innerHTML = 0;
                } else if (item.textContent === '!') item.innerHTML = 1;
                else if (item.textContent === '@') item.innerHTML = 2;
                else if (item.textContent === '#') item.innerHTML = 3;
                else if (item.textContent === '$') item.innerHTML = 4;
                else if (item.textContent === '%') item.innerHTML = 5;
                else if (item.textContent === '^') item.innerHTML = 6;
                else if (item.textContent === '&') item.innerHTML = 7;
                else if (item.textContent === '*') item.innerHTML = 8;
                else if (item.textContent === '(') item.innerHTML = 9;
                else if (item.textContent === '~') item.innerHTML = '`';
                else if (item.textContent === '>') item.innerHTML = '.';
                else if (item.textContent === '<') item.innerHTML = ',';
                else if (item.textContent === '?') item.innerHTML = '/';
                else if (item.textContent === ':') item.innerHTML = ';';
                else if (item.textContent === '{') item.innerHTML = '[';
                else if (item.textContent === '}') item.innerHTML = ']';
              }
            });
          });
          break;

        case '|':
          KEY_ELEMENT.classList.add('keyboard__key-elem');
          KEY_ELEMENT.textContent = '|';
          KEY_ELEMENT.addEventListener('click', () => {
            textarea.value += '|';
            textarea.focus();
          });
          break;

        case 'Alt-right':
          KEY_ELEMENT.classList.add('keyboard__key-alt');
          KEY_ELEMENT.textContent = 'Alt';
          break;

        case 'Alt-left':
          KEY_ELEMENT.classList.add('keyboard__key-alt');
          KEY_ELEMENT.textContent = 'Alt';
          break;

        case 'Ctrl-left':
          KEY_ELEMENT.classList.add('keyboard__key-alt');
          KEY_ELEMENT.textContent = 'Ctrl';
          break;

        case 'FN':
          KEY_ELEMENT.classList.add('keyboard__key-fn');
          KEY_ELEMENT.textContent = 'Fn';
          break;

        case 'Win':
          KEY_ELEMENT.classList.add('keyboard__key-win');
          KEY_ELEMENT.textContent = 'Win';
          break;

        case 'Ctrl-right':
          KEY_ELEMENT.classList.add('keyboard__key-ctrl-right');
          KEY_ELEMENT.textContent = 'Ctrl';
          break;

        case 'Caps Lock':
          KEY_ELEMENT.classList.add('keyboard__key-caps');
          KEY_ELEMENT.addEventListener('click', () => {
            if (!KEY_ELEMENT.classList.contains('keyboard__key-activatable')) {
              KEY_ELEMENT.classList.add('keyboard__key-activatable');
              upperCase();
            } else {
              KEY_ELEMENT.classList.remove('keyboard__key-activatable');
              lowerCase();
            }
          });
          break;

        case 'Enter':
          KEY_ELEMENT.classList.add('keyboard__key-enter');
          KEY_ELEMENT.addEventListener('click', () => {
            textarea.value += '\n';
            textarea.focus();
          });
          break;

        case 'Space':
          KEY_ELEMENT.classList.add('keyboard__key-space');
          KEY_ELEMENT.addEventListener('click', () => {
            textarea.value += ' ';
            textarea.focus();
          });
          break;

        default:
          KEY_ELEMENT.textContent = key.toLowerCase();
          KEY_ELEMENT.addEventListener('click', () => {
            const out = document.querySelector('textarea').value;
            if (KEY_ELEMENT.textContent === key.toUpperCase()) {
              textarea.value = out + key.toUpperCase();
              textarea.focus();
            } else {
              textarea.value = out + key.toLowerCase();
              textarea.focus();
            }
          });

          break;
      }
    });
  }

  createKeys();
});
