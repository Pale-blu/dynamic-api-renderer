import React from 'react';
import ApiBlock from './components/ApiBlock';
import schema from './schemas/googleSheetsAddRow.json';

function App() {
  return (
    <div className="p-8">
      <ApiBlock schema={schema} />
    </div>
  );
}

export default App;