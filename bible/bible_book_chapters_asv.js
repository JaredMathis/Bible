import arguments_assert from '../foundation/arguments_assert.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import string_ls_txt_get from '../core/string_ls_txt_get.js';
import string_split from '../foundation/string_split.js';
import bible_asv_book_path from './bible_asv_book_path.js';
import list_map from '../foundation/list_map.js';
import string_prefix_remove from '../foundation/string_prefix_remove.js';
import string_suffix_remove from '../foundation/string_suffix_remove.js';
import list_of_string_numbers_sort from '../core/list_of_string_numbers_sort.js';
import is_function from '../foundation/is_function.js';
export default bible_book_chapters_asv;
async function bible_book_chapters_asv(file_get, book) {
  arguments_assert(arguments, is_function, is_string_not_empty);
  let http_data = await file_get(`${ await bible_asv_book_path(file_get, book) }/${ string_ls_txt_get() }`);
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