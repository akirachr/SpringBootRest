import React from 'react';
import ReactDOM from 'react-dom'
import App from './App.js'

const Home = () => {
  return (
      <React.StrictMode>
        <div>
          <App />
        </div>
      </React.StrictMode>
  );
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
)
