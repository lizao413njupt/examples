/*
  1. Bind the input/select to the states
  2. Change the circle styles based on the states

  tips: circle size and rotate style:
  height: 0px,
  width: 0px,
  lineHeight: 0px,
  transform: `rotate(0deg)`,
*/


function MyApp() {
  const [isPurple, setIsPurple] = React.useState(false);
  const [textColor, setTextColor] = React.useState("");
  const [size, setSize] = React.useState(150);
  const [rotate, setRotate] = React.useState(0);
  
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
          onChange={() => setIsPurple(!isPurple)}
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
