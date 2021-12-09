import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import list_of_string_numbers_sort from '../core/list_of_string_numbers_sort.js';
import bible_lsv_book_for_each from './bible_lsv_book_for_each.js';
import list_add from '../foundation/list_add.js';
import list_unique from './../foundation/list_unique.js';
import property_value_get from '../foundation/property_value_get.js';
export default bible_book_chapters_lsv;
async function bible_book_chapters_lsv(data, cache, book) {
  arguments_assert(arguments, is_defined, is_defined, is_string_not_empty);
  let chapters = [];
  await bible_lsv_book_for_each(cache, data, book, verse_data => {
    if (verse_data.book === book) {
      const chapter = property_value_get(verse_data, 'chapter');
      list_add(chapters, chapter);
    }
  });
  chapters = list_unique(chapters);
  list_of_string_numbers_sort(chapters);
  return chapters;
}