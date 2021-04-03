import './App.css';

import { Thumbnail } from './components/Thumbnail';
import React from 'react';

function App() {
  const [subtitle, setSubtitle] = React.useState('');

  const handleChange = (e) => {
    const text = e.target.value;
    setSubtitle(text);
  }

  return (
    <div>
      <header>
          <Thumbnail theme="dark" subtitle={subtitle}/>
          <br/>
          <input value={subtitle} onChange={handleChange} type="text"/>
      </header>
    </div>
  );
}

export default App;
