
function App() {
  const [userName, setuserName] = React.useState('')
  const [passWord, setPassWord] = React.useState('')
  function handleSubmit(event) {
    event.preventDefault()
    console.log(`userName:${userName} passWord:${passWord}`)
    alert(`userName:${userName} passWord:${passWord}`)
  }
  const userNameClass = 
    userName.length < 3 && userName.length > 0 ? "input-error":""
  const passWordClass = 
    passWord.length < 3 && passWord.length > 0 ? "input-error":""

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <input 
        type="userName" 
        className={userNameClass} 
        value={userName} 
        onChange={(event) => setuserName(event.target.value)}
        />
        <br />
        <input
        type="password"
        className={passWordClass}
        value={passWord}
        onChange={(event) => setPassWord(event.target.value)}/>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
