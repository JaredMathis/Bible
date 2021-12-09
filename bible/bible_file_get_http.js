import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string from '../foundation/is_string.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_public_url from './bible_public_url.js';
export default bible_file_get_http;
function bible_file_get_http(cache, data) {
  arguments_assert(arguments, is_defined, is_defined);
  return async function bible_file_get_http_inner(file_path) {
    arguments_assert(arguments, is_string);
    return await ui_http_cached_data(cache)(data, `${ bible_public_url() }${ file_path }`);
  };
}