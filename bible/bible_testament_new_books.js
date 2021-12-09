import arguments_assert from '../foundation/arguments_assert.js';
import is_function from '../foundation/is_function.js';
import bible_testament_books_generic from './bible_testament_books_generic.js';
export default bible_testament_new_books;
async function bible_testament_new_books(file_get) {
  arguments_assert(arguments, is_function);
  return await bible_testament_books_generic(file_get, 'new');
}