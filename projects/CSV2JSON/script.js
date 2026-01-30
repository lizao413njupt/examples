var csvInput = document.querySelector("#csvInput");
var jsonInput = document.querySelector("#jsonInput");
var button = document.querySelector("#transferButton");

var convertTypes = document.querySelectorAll('input[name="convertType"]');

// 判断输入是否合法的JSON字符串
function isJson(str) {
  try {
    JSON.parse(str);
    
    return true;
  } catch (e) {
    return false;
  }
}
function isCsv(str) {
  try {
    // 简单判断，只要有逗号且不为空就行
    return str !== "" && /,/g.test(str);
  } catch (e) {
    return false;
  }
}

// 当选定一个转换方式，另一个转换方式的输入框只读
function updateInputs() {
  var selected = document.querySelector('input[name="convertType"]:checked');
  // 如果选中的方法是二转十
  if (selected.id === "CSV-JSON") {
    csvInput.disabled = false;
    jsonInput.disabled = true;
  } else {
    jsonInput.disabled = false;
    csvInput.disabled = true;
  }
  // 同时也要将两边的都清空，以免影响后续运算，防止旧数据干扰
  csvInput.value = "";
  jsonInput.value = "";
}

convertTypes.forEach(function (radio) {
  // updateInputs方法没有加括号，意思是等到这个时间被触发的时候再执行
  // 如果加括号不管有没有触发都会直接执行
  radio.addEventListener("change", updateInputs);
});
// 初始化，刚进入的时候，因为默认选中csv转json，要把json输入disable
updateInputs();

// 处理抖动并自动消失
// 这里的el是传入的输入框元素，大家约定用它来代表一个DOM元素
function triggerError(el) {
  el.value = ""; // 清空错误输入
  el.classList.add("shake-error"); // 穿上外衣（开始抖动+变红）

  // 800毫秒后自动移除
  setTimeout(function () {
    el.classList.remove("shake-error");
  }, 800);
}

// 通过按钮点击事件监听函数
button.addEventListener("click", function () {
  var csv = csvInput.value;
  var json = jsonInput.value;
  var selectedtype = document.querySelector(
    'input[name="convertType"]:checked',
  );
  if (selectedtype.id === "CSV-JSON") {
    if (!isCsv(csv)) {
      triggerError(csvInput);
    } else {

      // var csvValue = parseInt(csv, 2);
      // jsonInput.value = csvValue;
    }
  } else {
    if (selectedtype.id === "JSON-CSV") {
      if (!isJson(json)) {
        triggerError(jsonInput);
      } else {
        
        // var jsonValue = parseInt(json, 10).toString(2);
        // csvInput.value = jsonValue;
      }
    }
  }
});

function csv2json(str1) {
  str1.split("\n");
}

function json2csv(str1) {}
