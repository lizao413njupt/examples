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

```Javascript
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

```Javascript
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

发现反而不管用了。因为在react中，如果我们想要基于当前的状态变量来得到和它相关的计算值，我们不能以函数的方式来写。要用一种特殊的derived state（衍生状态）的方式来写，具体方式是用一个普通的javascript变量来接受

```Javascript
const userNameClass =
  userName.length < 3 && userName.length > 0 ? "input-error":""

<input
  type="userName"
  className={userNameClass}
  value={userName}
  onChange={(event) => setuserName(event.target.value)}
/>
```

实际开发中处处都需要动态检验和derived state结合。例如这个项目[./react-concise-course/challenge-01](./react-concise-course/challenge-01)

```Javascript
function MyApp() {
  // 对于isPurple这个状态，我们需要多次使用
  const [isPurple, setIsPurple] = React.useState(false);
  const [textColor, setTextColor] = React.useState("");
  const [size, setSize] = React.useState(150);
  const [rotate, setRotate] = React.useState(0);
  // 基于isPurple这一状态变量的值，我们需要得到和它相关的计算值（即衍生状态）
  const className = `${isPurple?"purple":""} ${textColor} `
  const circleStyle = {
    height: `${size}px`,
    width: `${size}px`,
    lineHeight: `${size}px`,
    transform: `rotate(${rotate}deg)`
  }

  return (
    <main>
      <label>
        Purple
        <input
          type="checkbox"
          // 当改变时，将isPurple取反
          onChange={() => setIsPurple(!isPurple)}
          // 如果isPurple为true则被标记
          checked={isPurple}
        />
      </label>

      <label>
        text color
        <select
          value={textColor}
          onChange={(event) => setTextColor(event.target.value)}
        >
          <option value="" selected>
            White
          </option>
          <option value="text-black">Black</option>
          <option value="text-orange">Orange</option>
        </select>
      </label>

      <label>
        Circle Size
        <input
          value={size}
          onChange={(event) => setSize(event.target.value)}
          type="number"
        />
      </label>

      <label>
        Circle Rotate
        <input
          onChange={(event) => setRotate(event.target.value)}
          value={rotate}
          type="number"
        />
      </label>

      <div style={circleStyle} className={`circle ${className}`}>Hi!</div>
    </main>
  );
}

const appEl = document.querySelector("#app");
const root = ReactDOM.createRoot(appEl);

root.render(<MyApp />);
```

## 列表渲染 && 条件渲染

渲染指的是用for循环和map()函数来表示一连串结构相同的内容。以列表渲染为例。main中有四个结构相同的section，其中，无序表那一部分又可以单独作为一个渲染列表。

```Javascript
return (
    <main>
      <section className="city">
        <h2>UK</h2>
        <h3>London</h3>

        <ul>
          <li>
            {new Date().toLocaleDateString()}
            <span> temperature: 20℃(Sunny)</span>
          </li>
          <li>
            {new Date().toLocaleDateString()}
            <span> temperature: 19℃(Cloudy)</span>
          </li>
          <li>
            {new Date().toLocaleDateString()}
            <span> temperature: 12℃(Rain)</span>
          </li>
        </ul>
      </section>
      <section className="city">
        <h2>UK</h2>
        <h3>London</h3>

        <ul>
          <li>
            {new Date().toLocaleDateString()}
            <span> temperature: 20℃(Sunny)</span>
          </li>
          <li>
            {new Date().toLocaleDateString()}
            <span> temperature: 19℃(Cloudy)</span>
          </li>
          <li>
            {new Date().toLocaleDateString()}
            <span> temperature: 12℃(Rain)</span>
          </li>
        </ul>
      </section>
      <section className="city">
        <h2>CN</h2>
        <h3>Beijing</h3>

        <p>Can't find any data</p>
      </section>
    </main>
  );
```

具体实现如下。分析forecast的结构，一个无序表里面嵌入若干个li,每个li里又有固定结构。观察cities对象，发现北京没有forecast这一属性，这里我们就要用到条件渲染，对于没有这一属性的，不予渲染

```Javascript
function MyApp() {
  //
  function renderForecastList(forecastList) {
    return forecastList.map((forecast) => (

        <li>
          {forecast.date}
          <span> temperature: {forecast.temperature}℃({forecast.weather})</span>
        </li>

    ));
  }


  return (
    <main>
      {cities.map((city) => (
        <section className="city">
          <h2>{city.country}</h2>
          <h3>{city.name}</h3>
          <ul>{city.forecast?renderForecastList(city.forecast):""}</ul>
        </section>
      ))}
    </main>
  );
}
```
像前面我们判断是否要对forecast进行渲染，运用了三元运算符，但是其实有更简洁的写法，比如使用 && 
``` Javascript

// city.forecast?renderForecastList(city.forecast):""
forecastExits(city.forecast) && renderForecastList(city.forecast)
!forecastExits(city.forecast) && <span>No forecast</span>
```
这里我们先调用forecastExits()判断forecast是否合法，用逻辑短路的方法决定是否渲染
在列表渲染中，是否有标识每一个项的属性(key)也很重要，比如说对于下面的每一个city，其实都应该加上一个id属性，来唯一标识这一项。这是一个好习惯，因为如果你不给他编号，当某一项数据需要删除的时候，这个数据后面的数据项，react就无法识别哪个是哪个了。
``` Javascript
const cities = [
  {
    name: "New York",
    country: "USA",
    forecast: [
      { date: "2024-04-03", temperature: 15, weather: "Partly cloudy" },
      { date: "2024-04-04", temperature: 17, weather: "Sunny" },
      { date: "2024-04-05", temperature: 18, weather: "Partly cloudy" },
      { date: "2024-04-06", temperature: 20, weather: "Rain" },
      { date: "2024-04-07", temperature: 16, weather: "Thunderstorms" },
      { date: "2024-04-08", temperature: 14, weather: "Cloudy" },
      { date: "2024-04-09", temperature: 13, weather: "Partly cloudy" },
    ],
  },
  {
    name: "London",
    country: "UK",
    forecast: [
      { date: "2024-04-03", temperature: 12, weather: "Cloudy" },
      { date: "2024-04-04", temperature: 14, weather: "Rain" },
      { date: "2024-04-05", temperature: 15, weather: "Partly cloudy" },
      { date: "2024-04-06", temperature: 13, weather: "Sunny" },
      { date: "2024-04-07", temperature: 11, weather: "Cloudy" },
      { date: "2024-04-08", temperature: 10, weather: "Rain" },
      { date: "2024-04-09", temperature: 12, weather: "Partly cloudy" },
    ],
  },
  {
    name: "Tokyo",
    country: "Japan",
    forecast: [
      { date: "2024-04-03", temperature: 20, weather: "Sunny" },
      { date: "2024-04-04", temperature: 21, weather: "Partly cloudy" },
      { date: "2024-04-05", temperature: 22, weather: "Cloudy" },
      { date: "2024-04-06", temperature: 19, weather: "Rain" },
      { date: "2024-04-07", temperature: 18, weather: "Partly cloudy" },
      { date: "2024-04-08", temperature: 17, weather: "Sunny" },
      { date: "2024-04-09", temperature: 20, weather: "Cloudy" },
    ],
  },

  {
    name: "Sydney",
    country: "Australia",
    forecast: [],
  },

  {
    name: "Beijing",
    country: "China",
  },
];
```
## 数组操作
react中，所有