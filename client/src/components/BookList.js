import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getBooksQuery, addBookMutation } from '../queries/queries';
import AddBook from './AddBook';
import BookDetails from './BookDetails';

function BookList() {
  const [currentBookId, setCurrentBookId] = useState(null);
  const { loading: queryLoading, error: queryError, data } = useQuery(getBooksQuery);
  const [addBook, { loading: mutationLoading, error: mutationError }] = useMutation(addBookMutation, 
    {
    update(cache, { data: { addBook } }) {
      const { books } = cache.readQuery({ query: getBooksQuery });
      cache.writeQuery({
        query: getBooksQuery,
        data: { books: books.concat([addBook]) },
      });
    }
  }
  );

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :( {queryError.message}</p>;
  return (
    <div>
      <ul id="book-list">
        {data.books.map(({ name, id }) => (
          <li key={id} onClick={(e) => setCurrentBookId(id)}>
            {name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={currentBookId}/>
      <AddBook addBook={addBook} />
    </div>
  );
}

export default BookList;
