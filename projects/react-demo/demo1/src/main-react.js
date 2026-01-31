function App() {
  const [inputText, setInputText] = React.useState();
  function handleChange(event){
    setInputText(event.target.value);
  }

  return(
    <>
      <p>Title</p>
      <input type="text" onChange={handleChange}></input>
      <p className="input">{inputText}</p>
    
    </>
  )

}

const root =  ReactDom.createRoot(document.getElementById())
// 在页面中渲染APP这一函数
root.render(<App />)