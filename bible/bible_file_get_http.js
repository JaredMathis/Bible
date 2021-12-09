import is_identifier from '../core/is_identifier.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_function from '../foundation/is_function.js';
import is_string from '../foundation/is_string.js';
import string_split from '../foundation/string_split.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_public_url from './bible_public_url.js';
import bible_testament_books_generic from './bible_testament_books_generic.js';
export default bible_file_get_http;
function bible_file_get_http(cache, data) {
  arguments_assert(arguments, is_defined, is_defined);
  return async function bible_file_get_http_inner(file_path) {
    arguments_assert(arguments, is_string)
    return await ui_http_cached_data(cache)(data, `${ bible_public_url() }${file_path}`);
  }
}