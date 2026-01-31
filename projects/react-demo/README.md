# [普通的html文件使用react所必须的语句](https://mikkelofficial7.medium.com/react-cdn-first-choice-for-building-simple-web-app-9feb62198b5c)

只有18版本的，但是对于学习问题不大

```html
<!-- React and ReactDOM from CDN -->
<script
  src="https://unpkg.com/react@18/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
  crossorigin
></script>
<!-- Babel (to use JSX in the browser) -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

使用实例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React with CDN</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <!-- React and ReactDOM from CDN -->
  <script
    src="https://unpkg.com/react@18/umd/react.development.js"
    crossorigin
  ></script>
  <script
    src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
    crossorigin
  ></script>
  <!-- Babel (to use JSX in the browser) -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <!-- Your React Code -->
  <script type="text/babel">
    function Header() {
      return <h2>Welcome to My React App</h2>;
    }
    function App() {
      return (
        <div>
          {" "}
          <Header /> <p>Welcome fellas..</p>{" "}
        </div>
      );
    }
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
  </script>
</html>
```

## 备忘录

### 状态与事件

如果你需要某个组件来“记住”一些信息并展示，在react中，正确的做法是声明一个“state”，即状态变量
比如你要记录并展示点击一个按钮的次数

```Javascript
function MyButton() {
  // setCount为改变count的方法注意useState传入参数是0，意思是count的初值为0
  const [count, setCount] = useState(0);
  // handle...
  function handleClick() {
    setCount(count + 1);
  }

  return (
    //button的属性onClick与handleClick结合
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

这个例子也为我们介绍了react对事件的响应，都是基于这种on...的属性。把这个属性插入元素中，辅以外面定义的handle...函数，即可达到类似于js事件处理器的效果

### 表单

react中，form的一个重要的特有响应属性：onSubmit

### 样式

与标准的html的类class不同，react使用的是className。还有一点，引入.css文件的新方式是

```Javascript
import "./style.css"
```

本人实际测试如果用cdn，上面的方法不知为何不可用，但是原本html用link引入css的方式仍然可用

### 动态校验
比如，我要对输入框中输入的值进行实时校验，字符长度小于3，大于0就提示错误。试着用这种简单的逻辑判断语句来实现
``` Javascript
<input
  type="userName"
  className={
    userName.length < 3 && userName.length > 0 ? "input-error":""
  }
  value={userName}
  onChange={(event) => setuserName(event.target.value)}
/>
```
太挤了，我们试着单独定义一个函数实现类似功能
``` Javascript
function judgeClassError() {
  return userName.length < 3 && userName.length > 0 ? "input-error":""
}

<input
  type="userName"
  className={() => judgeClassError()}
  value={userName}
  onChange={(event) => setuserName(event.target.value)}
/>
```
发现反而不管用了。因为在react中，如果我们想要基于当前的状态变量来得到和它相关的计算值，我们不能以函数的方式来写。要用一种特殊的derived state的方式来写，具体方式是用一个普通的javascript变量来接受
``` Javascript
const userNameClass = 
  userName.length < 3 && userName.length > 0 ? "input-error":""

<input
  type="userName"
  className={userNameClass}
  value={userName}
  onChange={(event) => setuserName(event.target.value)}
/>
```
说实话，确实挺诡异