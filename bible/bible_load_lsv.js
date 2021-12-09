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
import string_trim from '../core/string_trim.js';
import console_log from '../foundation/console_log.js';
import list_where from '../foundation/list_where.js';
import is_empty from '../core/is_empty.js';
import bible_lsv_parse from './bible_lsv_parse.js';
export default bible_load_lsv;
async function bible_load_lsv(cache, data) {
  arguments_assert(arguments, is_defined, is_defined);
  const public_url = bible_public_url();
  const url = `${ public_url }lsv/lsv.txt`;
  if (has_property(cache, url)) {
    return cache[url];
  }
  let http_data = await ui_http_cached_data(cache)(data, url);
  let result = bible_lsv_parse(data, cache, http_data)
  cache[url] = result;
  return result;
}