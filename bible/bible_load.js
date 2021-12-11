import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_public_url from '../bible/bible_public_url.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
export default bible_load;
async function bible_load(bible_id, cache, data) {
  arguments_assert(arguments, is_string_not_empty, is_defined, is_defined);
  const public_url = bible_public_url();
  const url = `${ public_url }${ bible_id }_parsed.json`;
  let result = await ui_http_cached_data(cache)(data, url);
  return result;
}