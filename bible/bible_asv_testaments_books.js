import string_split from '../foundation/string_split.js';
import property_value_set from '../foundation/property_value_set.js';
import for_each_async from '../core/for_each_async.js';
import bible_asv_url from '../bible/bible_asv_url.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import has_property from '../foundation/has_property.js';
import string_ls_txt_get from '../core/string_ls_txt_get.js';
import ui_http_cached_data from '../ui/ui_http_cached_data.js';
export default bible_asv_testaments_books;
let testaments, testaments_books;
async function bible_asv_testaments_books(data, cache) {
  arguments_assert(arguments, is_defined, is_defined);
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
      let text = await ui_http_cached_data(cache)(data, `${ bible_asv_url() }${ testament } Testament/${ string_ls_txt_get() }`);
      const split = string_split(text, '\n');
      property_value_set(testaments_books, testament, split);
    }
  });
  return testaments_books;
}