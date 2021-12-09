import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import string_ls_txt_get from '../core/string_ls_txt_get.js';
import string_split from '../foundation/string_split.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_asv_book_url from './bible_asv_book_url.js';
import list_map from '../foundation/list_map.js';
import string_prefix_remove from '../foundation/string_prefix_remove.js';
import string_suffix_remove from '../foundation/string_suffix_remove.js';
import list_of_string_numbers_sort from '../core/list_of_string_numbers_sort.js';
export default bible_book_chapters_asv;
async function bible_book_chapters_asv(data, cache, book) {
  arguments_assert(arguments, is_defined, is_defined, is_string_not_empty);
  let http_data = await ui_http_cached_data(cache)(data, `${ await bible_asv_book_url(data, cache, book) }/${ string_ls_txt_get() }`);
  let new_line = '\n';
  let split = string_split(http_data, new_line);
  let mapped = list_map(split, s => {
    let without_prefix = string_prefix_remove(s, book);
    let without_suffix = string_suffix_remove(without_prefix, '.txt');
    return without_suffix;
  });
  let sorted = list_of_string_numbers_sort(mapped);
  return sorted;
}