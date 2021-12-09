import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_public_url from './bible_public_url.js';
import has_property from '../foundation/has_property.js';
import bible_lsv_parse from './bible_lsv_parse.js';
import bible_file_get_http from './bible_file_get_http.js';
export default bible_load_lsv;
async function bible_load_lsv(cache, data) {
  arguments_assert(arguments, is_defined, is_defined);
  const public_url = bible_public_url();
  const url = `${ public_url }lsv/lsv.txt`;
  if (has_property(cache, url)) {
    return cache[url];
  }
  let http_data = await ui_http_cached_data(cache)(data, url);
  const file_get = bible_file_get_http(cache, data);
  let result = bible_lsv_parse(file_get, http_data);
  cache[url] = result;
  return result;
}