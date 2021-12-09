import list_add_all from '../core/list_add_all.js';
import list_add_beginning from '../core/list_add_beginning.js';
import arguments_assert from '../foundation/arguments_assert.js';
import values from '../foundation/values.js';
import list_reduce from '../foundation/list_reduce.js';
import bible_asv_testaments_books from './bible_asv_testaments_books.js';
import is_defined from '../foundation/is_defined.js';
import for_each from '../foundation/for_each.js';
import assert from '../foundation/assert.js';
import list_includes from '../foundation/list_includes.js';
import bible_testaments_books from './bible_testaments_books.js';
export default bible_books_asv;
async function bible_books_asv(data, cache) {
  arguments_assert(arguments, is_defined, is_defined);
  let asv_testaments_books = await bible_asv_testaments_books(data, cache);
  let asv_testaments_books_values = values(asv_testaments_books);
  list_add_beginning(asv_testaments_books_values, []);
  let reduced = list_reduce(asv_testaments_books_values, list_add_all);
  let testaments_books = await bible_testaments_books(data, cache);
  for_each(testaments_books, testament_book => {
    assert(list_includes(reduced, testament_book), { testament_book });
  });
  return testaments_books;
}