import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import bible_books_asv from './bible_books_asv.js';
import bible_books_lsv from './bible_books_lsv.js';
export default bible_books;
async function bible_books(bible_id, data, cache) {
  arguments_assert(arguments, is_string_not_empty, is_defined, is_defined);
  let lookup = {
    asv: bible_books_asv,
    lsv: bible_books_lsv
  };
  const _function = lookup[bible_id];
  let result = await _function(data, cache);
  return result;
}