// client/src/components/ApiBlock.jsx
import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import axios from 'axios';

const ApiBlock = ({ schema }) => {
  const [formState, setFormState] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  const renderField = (field) => {
    const { type, name, key, options } = field;

    switch (type) {
      case 'text':
      case 'number':
      case 'password':
      case 'date':
        return (
          <input
            key={key}
            type={type}
            placeholder={name}
            onChange={e => handleChange(key, e.target.value)}
            className="mb-2 p-2 border w-full"
          />
        );
      case 'dropdown':
        return (
          <select key={key} onChange={e => handleChange(key, e.target.value)} className="mb-2 p-2 border w-full">
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        );
      case 'json':
        return (
          <div key={key} className="mb-2">
            <label>{name}</label>
            <ReactJson
              src={formState[key] || {}}
              onEdit={edit => handleChange(key, edit.updated_src)}
              onAdd={add => handleChange(key, add.updated_src)}
              onDelete={del => handleChange(key, del.updated_src)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/proxy', {
        schemaId: schema.id,
        inputData: formState
      });
      setResult(res.data);
    } catch (err) {
      setError('Failed to call API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{schema.name}</h2>
      {schema.inputs.map(renderField)}
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2">Run</button>

      {loading && <p className="text-yellow-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div className="mt-4">
          <h4 className="font-semibold">Output:</h4>
          <ReactJson src={result} />
        </div>
      )}
    </div>
  );
};

export default ApiBlock;