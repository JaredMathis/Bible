import file_read from '../core/file_read.js';
import is_identifier from '../core/is_identifier.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_function from '../foundation/is_function.js';
import string_split from '../foundation/string_split.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
import bible_public_url from './bible_public_url.js';
import bible_testament_books_generic from './bible_testament_books_generic.js';
export default bible_testament_books_file;
async function bible_testament_books_file(testament_identifier) {
  arguments_assert(arguments, is_defined, is_defined, is_identifier);
  return await bible_testament_books_generic(file_path => {
    let result = file_read(file_path);
    return result;
  }, testament_identifier)
}