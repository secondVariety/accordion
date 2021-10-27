/*
 ****
 **** Utility Functions - author @garydavison
 ****
 */

/*
 * Check if is HTML Element/Object
 * @param input {object}
 * @returns {boolean}
 */
function isElem(input = null) {
  if (input) {
    return input instanceof HTMLElement;
  }
}

/*
 * Check if is Function
 * @param {function}
 * @returns {boolean}
 */
function isFunc(input = null) {
  if (input) {
    return typeof input === "function";
  }
}

/*
 * Check if is String
 * @param {string}
 * @returns {boolean}
 */
function isStr(input = null) {
  if (input) {
    return typeof input;
  }
}

/*
 * Check if is Array
 * @desc - Arrays are objects in JS, this uses built in methods to confirm the object is an array.
 * @param {object}
 * @returns {boolean}
 */
function isArr(input = null) {
  if (input) {
    return Array.isArray(input);
  }
}

/*
 * Create Array
 * @desc - Used to covert NodeLists (an object in JS) to Arrays
 * @param {string, object}
 * @returns {array}
 */
function createArr(input = null) {
  if (input) {
    return Array.from(input);
  }
}

/*
 * Has Class
 * @desc - Takes an object or a string, if it is given a string it converts it to an object
 * @param {string, object}
 * @returns {boolean}
 */
function hasCls(input = null, clsName = null) {
  if (isElem(input) && isStr(clsName)) {
    return input.classList.contains(clsName);
  }
  if (input && isStr(clsName)) {
    return document.querySelector(input).classList.contains(clsName);
  }
}

/*
 * Remove Class
 * @desc - Takes an object or a string, if it is given a string it converts it to an object
 * @param {string, object/array, object}, {string}
 * @returns {string}
 */
function removeCls(input = [], clsName = null) {
  // HTML Object?
  if (isElem(input)) {
    input.classList.remove(isStr(clsName) ? clsName : "");
    return;
  }
  // Array?
  if (input == null || input.length == 0) return;
  const $input = isArr(input)
    ? input
    : createArr(document.querySelectorAll(input));
  $input[0].classList.remove(isStr(clsName) ? clsName : "");
  return removeCls($input.splice(1), clsName);
}

/*
 * Add Class
 * @desc - Takes an object or a string, if it is given a string it converts it to an object
 * @param {string, object/array, object}, {string}
 * @returns {string}
 */
function addCls(input = [], clsName = null) {
  // HTML Object?
  if (isElem(input)) {
    input.classList.add(isStr(clsName) ? clsName : "");
    return;
  }
  // Array?
  if (input == null || input.length == 0) return;
  const $input = isArr(input)
    ? input
    : createArr(document.querySelectorAll(input));
  $input[0].classList.add(isStr(clsName) ? clsName : "");
  return addCls($input.splice(1), clsName);
}

/*
 * Toggle Class
 * @desc - Takes an object or a string, if it is given a string it converts it to an object
 * @param {string, object/array, object}, {string}
 * @returns {string}
 */
function toggleCls(input = null, clsName = null) {
  // HTML Object?
  if (isElem(input)) {
    input.classList.toggle(isStr(clsName) ? clsName : "");
    return;
  }
  // Array?
  if (input == null || input.length == 0) return;
  const $input = isArr(input)
    ? input
    : createArr(document.querySelectorAll(input));
  $input[0].classList.toggle(isStr(clsName) ? clsName : "");
  return toggleCls($input.splice(1), clsName);
}

/*
 * Click Event Listener
 * @desc - Creates an event listener, with a callback function
 * @param {object}, {function}
 * @returns {function}
 */
function clickLstr(input = null, callback = null) {
  if (isElem(input) && isFunc(callback)) {
    input.addEventListener("click", (e) => {
      callback(e);
    });
  }
}

/*
 ****
 **** App Functions - author @garydavison
 ****
 */

/*
 * Removing no-js from html object
 */
removeCls((input = "html"), (clsName = "no-js"));

/*
 * Accordion
 */
let $accordion = createArr(document.querySelectorAll(".accordion h3"));
if (isArr($accordion)) {
  $accordion.forEach((item) => {
    clickLstr(item, (e) => {
      // Accordion 1?
      if (hasCls("body", "body--accordion-1")) {
        toggleCls((input = e.currentTarget), (clsName = "selected"));
        toggleCls(
          (input = e.currentTarget.nextElementSibling),
          (clsName = "selected")
        );
        return;
      }
      // Accordion 2?
      if (
        hasCls(
          (input = e.currentTarget.nextElementSibling),
          (clsName = "selected")
        )
      ) {
        removeCls((input = ".accordion li h3"), (clsName = "selected"));
        removeCls((input = ".accordion li div"), (clsName = "selected"));
      } else {
        removeCls((input = ".accordion li h3"), (clsName = "selected"));
        removeCls((input = ".accordion li div"), (clsName = "selected"));
        addCls((input = e.currentTarget), (clsName = "selected"));
        addCls(
          (input = e.currentTarget.nextElementSibling),
          (clsName = "selected")
        );
      }
    });
  });
}

/*
 * Accordion Buttons
 * @desc - These control which accordion functionality is seen by removing & adding classes to the DOM
 */

let removeArr = {
  ".accordion-btn": "selected",
  ".accordion li h3": "selected",
  ".accordion li div": "selected",
  ".accordion": "accordion-2",
  body: "body--accordion-2",
};
let removeArr2 = Object.assign({}, removeArr);
removeArr2[".accordion"] = "accordion-1";
removeArr2["body"] = "body--accordion-1";

let addArr = {
  ".accordion li:first-of-type h3": "selected",
  ".accordion li:first-of-type div": "selected",
  body: "body--accordion-1",
  ".accordion": "accordion--1",
};
let addArr2 = Object.assign({}, addArr);
addArr2["body"] = "body--accordion-2";
addArr2[".accordion"] = "accordion--2";

clickLstr(document.querySelector(".accordion-btn--1"), (e) => {
  for (var key in removeArr) {
    removeCls((input = key), (clsName = removeArr[key]));
  }
  for (var key in addArr) {
    addCls((input = key), (clsName = addArr[key]));
  }
  addCls((input = e.currentTarget), (clsName = "selected"));
});

clickLstr(document.querySelector(".accordion-btn--2"), (e) => {
  for (var key in removeArr2) {
    removeCls((input = key), (clsName = removeArr2[key]));
  }
  for (var key in addArr2) {
    addCls((input = key), (clsName = addArr2[key]));
  }
  addCls((input = e.currentTarget), (clsName = "selected"));
});
