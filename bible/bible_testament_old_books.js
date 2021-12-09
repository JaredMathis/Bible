import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import bible_testament_books_generic from './bible_testament_books_generic.js';
export default bible_testament_old_books;
async function bible_testament_old_books(cache, data) {
  arguments_assert(arguments, is_defined, is_defined);
  return await bible_testament_books_generic(cache, data, 'old');
}