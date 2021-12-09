import arguments_assert from '../foundation/arguments_assert.js';
import is_function from '../foundation/is_function.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import bible_asv_testament_get from './bible_asv_testament_get.js';
import bible_asv_path from './bible_asv_path.js';
export default bible_asv_book_path;
async function bible_asv_book_path(file_get, book) {
  arguments_assert(arguments, is_function, is_string_not_empty);
  let book_testament = await bible_asv_testament_get(file_get, book);
  let result = `${ bible_asv_path() }${ book_testament } Testament/${ book }`;
  return result;
}