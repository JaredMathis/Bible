import assert from '../foundation/assert.js';
import keys from '../foundation/keys.js';
import for_each from '../foundation/for_each.js';
import list_includes from '../foundation/list_includes.js';
import bible_asv_testaments_books from './bible_asv_testaments_books.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string from '../foundation/is_string.js';
export default bible_asv_testament_get;
async function bible_asv_testament_get(data, cache, book) {
  arguments_assert(arguments, is_defined, is_defined, is_string);
  let testaments_books = await bible_asv_testaments_books(data, cache);
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