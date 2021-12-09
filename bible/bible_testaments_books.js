import list_add_all from '../core/list_add_all.js';
import arguments_assert from '../foundation/arguments_assert.js';
import bible_testament_old_books from './bible_testament_old_books.js';
import bible_testament_new_books from './bible_testament_new_books.js';
import for_each from '../foundation/for_each.js';
import is_function from '../foundation/is_function.js';
export default bible_testaments_books;
async function bible_testaments_books(file_get) {
  arguments_assert(arguments, is_function);
  let testament_old_books = await bible_testament_old_books(file_get);
  let testament_new_books = await bible_testament_new_books(file_get);
  let result = [];
  let testaments_books = [
    testament_old_books,
    testament_new_books
  ];
  for_each(testaments_books, testament_books => {
    list_add_all(result, testament_books);
  });
  return result;
}