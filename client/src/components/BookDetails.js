import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookId }) {
  const { loading: queryLoading, error: queryError, data } = useQuery(
    getBookQuery,
    {
      variables: { id: bookId },
    },
  );
  if (queryLoading) return <div>Loading...</div>
  if (queryError) return <div>Error! {queryError}</div>
  if (data && bookId !== null) return (
    <div id="book-details">
      <p>{data.book.name}</p>
      <p>By {data.book.author.name}</p>
      <p> Also by this author:</p>
      <ul>
        {data.book.author.books.map(({ name }) => <li>{name}</li>)}
      </ul>
    </div>
  )
  return <>No book selected...</>
}

export default BookDetails;
