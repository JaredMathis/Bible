import is_identifier from '../core/is_identifier.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import string_split from '../foundation/string_split.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_public_url from './bible_public_url.js';
export default bible_testament_books_generic;
async function bible_testament_books_generic(cache, data, testament_identifier) {
  arguments_assert(arguments, is_defined, is_defined, is_identifier);
  let http_data = await ui_http_cached_data(cache)(data, `${ bible_public_url() }testament_${ testament_identifier }.txt`);
  let split = string_split(http_data, '\n');
  return split;
}