import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './components/uploadComponent';
import UploadComponent from './components/uploadComponent';
import FetchComponent from './components/fetchComponent';

function App() {
  return (
    <div className='App'>
      <div className='centre'>
        <div className='container' style={{ padding: '20px 0 20px 115px' }}>
          <UploadComponent />
          <FetchComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
