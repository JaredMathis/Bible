import is_identifier from '../core/is_identifier.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_function from '../foundation/is_function.js';
import string_split from '../foundation/string_split.js';
export default bible_testament_books_generic;
async function bible_testament_books_generic(file_get, testament_identifier) {
  arguments_assert(arguments, is_function, is_identifier);
  let http_data = await file_get(`testament_${ testament_identifier }.txt`);
  let split = string_split(http_data, '\n');
  return split;
}