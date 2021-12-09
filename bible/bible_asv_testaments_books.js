import string_split from '../foundation/string_split.js';
import property_value_set from '../foundation/property_value_set.js';
import for_each_async from '../core/for_each_async.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import has_property from '../foundation/has_property.js';
import string_ls_txt_get from '../core/string_ls_txt_get.js';
import is_function from '../foundation/is_function.js';
import bible_asv_path from './bible_asv_path.js';
export default bible_asv_testaments_books;
let testaments, testaments_books;
async function bible_asv_testaments_books(file_get) {
  arguments_assert(arguments, is_function);
  if (is_defined(testaments_books)) {
    return testaments_books;
  }
  testaments = [
    'New',
    'Old'
  ];
  testaments_books = {};
  await for_each_async(testaments, async testament => {
    if (!has_property(testaments_books, testament)) {
      let text = await file_get(`${ bible_asv_path() }${ testament } Testament/${ string_ls_txt_get() }`);
      const split = string_split(text, '\n');
      property_value_set(testaments_books, testament, split);
    }
  });
  return testaments_books;
}