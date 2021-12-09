import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_function from '../foundation/is_function.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import bible_lsv_for_each from './bible_lsv_for_each.js';
export default bible_lsv_book_for_each;
async function bible_lsv_book_for_each(cache, data, book, lambda) {
  arguments_assert(arguments, is_defined, is_defined, is_string_not_empty, is_function);
  await bible_lsv_for_each(cache, data, verse_data => {
    if (verse_data.book !== book) {
      return;
    }
    lambda(verse_data);
  });
}