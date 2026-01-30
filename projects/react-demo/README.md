# [普通的html中使用react所必须的语句](https://mikkelofficial7.medium.com/react-cdn-first-choice-for-building-simple-web-app-9feb62198b5c)
~~~ html
<!-- React and ReactDOM from CDN --> 
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script> 
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script> 
<!-- Babel (to use JSX in the browser) -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
~~~
使用实例：
~~~ html
<!DOCTYPE html> 
<html lang="en"> 
  <head>
      <meta charset="UTF-8"> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
      <title>React with CDN</title> 
  </head> 
  <body> 
      <div id="root"></div> 
  </body> 
  <!-- React and ReactDOM from CDN --> 
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script> 
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script> 
  <!-- Babel (to use JSX in the browser) --> <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script> <!-- Your React Code --> 
  <script type="text/babel"> 
      function Header() { 
         return <h2>Welcome to My React App</h2>; 
      } 
      function App() { 
         return (<div> <Header /> <p>Welcome fellas..</p> </div> );
      } 
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
  </script>
</html>
~~~

