import assert from '../foundation/assert.js';
import keys from '../foundation/keys.js';
import for_each from '../foundation/for_each.js';
import list_includes from '../foundation/list_includes.js';
import bible_asv_testaments_books from './bible_asv_testaments_books.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_string from '../foundation/is_string.js';
import is_function from '../foundation/is_function.js';
export default bible_asv_testament_get;
async function bible_asv_testament_get(file_get, book) {
  arguments_assert(arguments, is_function, is_string);
  let testaments_books = await bible_asv_testaments_books(file_get);
  let testaments = keys(testaments_books);
  let book_testament;
  for_each(testaments, testament => {
    const books = testaments_books[testament];
    if (list_includes(books, book)) {
      book_testament = testament;
    }
  });
  assert(list_includes(testaments, book_testament));
  return book_testament;
}