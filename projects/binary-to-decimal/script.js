var binaryInput = document.querySelector('#binaryInput');
var decimalInput = document.querySelector('#decimalInput');
var button = document.querySelector('#transferButton');
// 这里如果使用querySelector的话，只会选中第一个被选中的radio
// 所以要用quetySelectorAll来获取一组属性
// 这里之前犯了一个错，直接将convertTypes放到39行那个函数里面去用来判断了
// 但是它没有id这个属性，如果用querySelector才有
// 会导致整个if判断的东西不起作用（因为得到的是undefined）
var convertTypes = document.querySelectorAll('input[name="convertType"]');
function isBinary(str) {
  // 正则：只能包含 0 或 1，且不能为空
  return /^[01]+$/.test(str);
}
function isDecimal(str) {
  // 正则：只能包含数字，且不能为空
  return /^\d+$/.test(str);
}

// 当选定一个转换方式，另一个转换方式的输入框只读
function updateInputs() {
  
  var selected = document.querySelector('input[name="convertType"]:checked')
  // 如果选中的方法是二转十
  if (selected.id === 'binary-decimal') {
    binaryInput.disabled = false;
    decimalInput.disabled = true;
  } else {
    decimalInput.disabled = false;
    binaryInput.disabled = true;
  }
  // 同时也要将两边的都清空，以免影响后续运算，防止旧数据干扰
  binaryInput.value = '';
  decimalInput.value = '';
}


convertTypes.forEach(function (radio) {
  // updateInputs方法没有加括号，意思是等到这个时间被触发的时候再执行
  // 如果加括号不管有没有触发都会直接执行
  radio.addEventListener('change', updateInputs);
});
// 初始化，刚进入的时候，因为默认选中二转十，要把十进制输入disable
updateInputs();

// 处理抖动并自动消失
// 这里的el是传入的输入框元素，大家约定用它来代表一个DOM元素
function triggerError(el) {
  el.value = ''; // 清空错误输入
  el.classList.add('shake-error'); // 穿上外衣（开始抖动+变红）
  
  // 800毫秒后自动移除
  setTimeout(function() {
    el.classList.remove('shake-error');
  }, 800);
}

// 通过按钮点击事件监听函数
button.addEventListener('click', function () {
  var binary = binaryInput.value;
  var decimal = decimalInput.value;
  var selectedtype = document.querySelector('input[name="convertType"]:checked')
  if (selectedtype.id === 'binary-decimal') {
    if (!isBinary(binary)) {
      triggerError(binaryInput);
    } else {
      var decimalValue = parseInt(binary, 2);
      decimalInput.value = decimalValue;
    }
  } else {
    if (selectedtype.id === 'decimal-binary') {
      if (!isDecimal(decimal)) {
        triggerError(decimalInput);
      } else {
        var binaryValue = parseInt(decimal, 10).toString(2);
        binaryInput.value = binaryValue;
      }
    }
  }

})
