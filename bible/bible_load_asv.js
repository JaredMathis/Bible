import arguments_assert from '../foundation/arguments_assert.js';
import for_each from '../foundation/for_each.js';
import is_defined from '../foundation/is_defined.js';
import values from '../foundation/values.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import string_prefix_replace from '../foundation/string_prefix_replace.js';
import bible_public_url from './bible_public_url.js';
export default bible_load_asv;
async function bible_load_asv(cache, data) {
  arguments_assert(arguments, is_defined, is_defined);
  const public_url = bible_public_url();
  let asv_data = await ui_http_cached_data(cache)(data, `${ public_url }asv.json`);
  for_each(values(asv_data), v => {
    let file_path = v.file_path;
    let file_url = string_prefix_replace(file_path, 'public/', public_url);
    let text = v.text;
    cache[file_url] = text;
  });
}