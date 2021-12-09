import arguments_assert from '../foundation/arguments_assert.js';
import for_each from '../foundation/for_each.js';
import is_defined from '../foundation/is_defined.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_public_url from './bible_public_url.js';
import string_split from '../foundation/string_split.js';
import size from '../foundation/size.js';
import list_get from '../foundation/list_get.js';
import list_add from '../foundation/list_add.js';
import sequence_first from '../core/sequence_first.js';
import has_property from '../foundation/has_property.js';
import list_skip from '../core/list_skip.js';
import bible_verse_data from './bible_verse_data.js';
import bible_testaments_books from './bible_testaments_books.js';
import list_includes from '../foundation/list_includes.js';
import comment from '../core/comment.js';
import assert from '../foundation/assert.js';
export default bible_load_lsv;
async function bible_load_lsv(cache, data) {
  arguments_assert(arguments, is_defined, is_defined);
  const public_url = bible_public_url();
  const url = `${ public_url }lsv/lsv.txt`;
  if (has_property(cache, url)) {
    return cache[url];
  }
  let http_data = await ui_http_cached_data(cache)(data, url);
  let lines = string_split(http_data, '\n');
  let result = [];
  let testaments_books = await bible_testaments_books(data, cache);
  let found_book_ids = [];
  for_each(lines, line => {
    let tokens = string_split(line, ' ');
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
    let split = string_split(second, ':');
    comment('it should be a chapter followed by a verse like 1:23, hence size 2');
    assert(size(split) === 2);
    let chapter_index = sequence_first(split);
    let verse = list_get(split, 1);
    let remaining = list_skip(tokens, 2);
    let verse_data = bible_verse_data(book, chapter_index, verse, remaining);
    list_add(result, verse_data);
  });
  cache[url] = result;
  return result;
}