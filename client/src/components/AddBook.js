import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAuthorsQuery } from '../queries/queries';

function AddBook({ addBook }) {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const submit = (e) => {
    e.preventDefault();
    
    addBook({ variables: { name, genre, authorId: authorId || data.authors[0].id  } });
    clearInput();
  };

  const clearInput = () => {
    setAuthorId('');
    setGenre('');
    setName('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;
  return (
    <div>
      <form id="add-book" onSubmit={submit}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => setAuthorId(e.target.value)}>
            {data.authors.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default AddBook;