import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_public_url from './bible_public_url.js';
export default bible_load_asv;
async function bible_load_asv(cache, data) {
  arguments_assert(arguments, is_defined, is_defined);
  const public_url = bible_public_url();
  return await ui_http_cached_data(cache)(data, `${ public_url }asv_parsed.json`);
}