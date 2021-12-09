import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import bible_asv_testament_get from './bible_asv_testament_get.js';
import bible_asv_url from './bible_asv_url.js';
export default bible_asv_book_url;
async function bible_asv_book_url(data, cache, book) {
  arguments_assert(arguments, is_defined, is_defined, is_string_not_empty);
  let book_testament = await bible_asv_testament_get(data, cache, book);
  let result = `${ bible_asv_url() }${ book_testament } Testament/${ book }`;
  return result;
}