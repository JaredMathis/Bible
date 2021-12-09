import arguments_assert from '../foundation/arguments_assert.js';
import for_each from '../foundation/for_each.js';
import string_split from '../foundation/string_split.js';
import size from '../foundation/size.js';
import list_get from '../foundation/list_get.js';
import list_add from '../foundation/list_add.js';
import sequence_first from '../core/sequence_first.js';
import list_skip from '../core/list_skip.js';
import bible_verse_data from './bible_verse_data.js';
import bible_testaments_books from './bible_testaments_books.js';
import list_includes from '../foundation/list_includes.js';
import comment from '../core/comment.js';
import assert from '../foundation/assert.js';
import string_trim from '../core/string_trim.js';
import list_where from '../foundation/list_where.js';
import is_empty from '../core/is_empty.js';
import is_string from '../foundation/is_string.js';
import is_function from '../foundation/is_function.js';
export default bible_lsv_parse;
async function bible_lsv_parse(file_get, lsv_txt) {
  arguments_assert(arguments, is_function, is_string);
  let lines = string_split(lsv_txt, '\n');
  let result = [];
  let testaments_books = await bible_testaments_books(file_get);
  let found_book_ids = [];
  for_each(lines, line => {
    let trimmed = string_trim(line, '\r');
    let split_space = string_split(trimmed, ' ');
    let tokens = list_where(split_space, s => !is_empty(s));
    if (size(tokens) < 2) {
      return;
    }
    let book_id = sequence_first(tokens);
    let second = list_get(tokens, 1);
    if (second === '1:1') {
      list_add(found_book_ids, book_id);
    }
    if (!list_includes(found_book_ids, book_id)) {
      return;
    }
    let book_index = size(found_book_ids) - 1;
    let book = list_get(testaments_books, book_index);
    let split_colon = string_split(second, ':');
    comment('it should be a chapter followed by a verse like 1:23, hence size 2');
    assert(size(split_colon) === 2);
    let chapter_index = sequence_first(split_colon);
    let verse = list_get(split_colon, 1);
    let remaining = list_skip(tokens, 2);
    let verse_data = bible_verse_data(book, chapter_index, verse, remaining);
    list_add(result, verse_data);
  });
  return result;
}