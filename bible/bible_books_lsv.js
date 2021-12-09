import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import bible_testaments_books from './bible_testaments_books.js';
export default bible_books_lsv;
async function bible_books_lsv(data, cache) {
  arguments_assert(arguments, is_defined, is_defined);
  let testaments_books = await bible_testaments_books(data, cache);
  return testaments_books;
}