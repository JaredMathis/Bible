import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import bible_chapter_asv from './bible_chapter_asv.js';
import bible_chapter_lsv from './bible_chapter_lsv.js';
export default bible_chapter;
async function bible_chapter(bible_id, data, cache, book, chapter_index) {
  arguments_assert(arguments, is_string_not_empty, is_defined, is_defined, is_string_not_empty, is_string_not_empty);
  let lookup = {
    asv: bible_chapter_asv,
    lsv: bible_chapter_lsv
  };
  const _function = lookup[bible_id];
  let result = await _function(data, cache, book, chapter_index);
  return result;
}