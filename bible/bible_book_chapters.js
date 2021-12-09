import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import bible_book_chapters_asv from './bible_book_chapters_asv.js';
import bible_book_chapters_lsv from './bible_book_chapters_lsv.js';
export default bible_book_chapters;
async function bible_book_chapters(bible_id, data, cache, book) {
  arguments_assert(arguments, is_string_not_empty, is_defined, is_defined, is_string_not_empty);
  let lookup = {
    asv: bible_book_chapters_asv,
    lsv: bible_book_chapters_lsv
  };
  const _function = lookup[bible_id];
  let result = await _function(data, cache, book);
  return result;
}