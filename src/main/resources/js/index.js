import React from 'react';
import ReactDOM from 'react-dom'
import EMP from './Employee.js'

const App = () => {
  return (
      <React.StrictMode>
        <div>
          <EMP />
        </div>
      </React.StrictMode>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
