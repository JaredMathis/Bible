import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import bible_lsv_book_for_each from './bible_lsv_book_for_each.js';
import list_add from '../foundation/list_add.js';
export default bible_chapter_lsv;
async function bible_chapter_lsv(data, cache, book, chapter_index) {
  arguments_assert(arguments, is_defined, is_defined, is_string_not_empty, is_string_not_empty);
  let result = [];
  await bible_lsv_book_for_each(cache, data, book, verse_data => {
    if (verse_data.book === book && verse_data.chapter === chapter_index) {
      list_add(result, verse_data);
    }
  });
  return result;
}