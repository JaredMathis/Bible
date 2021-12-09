import arguments_assert from '../foundation/arguments_assert.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import string_split from '../foundation/string_split.js';
import list_map from '../foundation/list_map.js';
import list_skip from '../core/list_skip.js';
import sequence_first from '../core/sequence_first.js';
import is_empty from '../core/is_empty.js';
import list_where from '../foundation/list_where.js';
import bible_verse_data from './bible_verse_data.js';
import bible_asv_book_path from './bible_asv_book_path.js';
import is_function from '../foundation/is_function.js';
export default bible_chapter_asv;
async function bible_chapter_asv(file_get, book, chapter_index) {
  arguments_assert(arguments, is_function, is_string_not_empty, is_string_not_empty);
  let http_data = await file_get(`${ await bible_asv_book_path(file_get, book) }/${ book }${ chapter_index }.txt`);
  let split = string_split(http_data, '\n');
  let filtered = list_where(split, s => !is_empty(s));
  let result = list_map(filtered, s => {
    let s_split = string_split(s, ' ');
    let verse = sequence_first(s_split);
    let tokens = list_skip(s_split, 1);
    let verse_data = bible_verse_data(book, chapter_index, verse, tokens);
    return verse_data;
  });
  return result;
}