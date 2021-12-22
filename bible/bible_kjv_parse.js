import property_value_get from '../foundation/property_value_get.js';
import list_where_single from '../core/list_where_single.js';
import arguments_assert from '../foundation/arguments_assert.js';
import for_each from '../foundation/for_each.js';
import bible_testaments_books from './bible_testaments_books.js';
import is_function from '../foundation/is_function.js';
import is_list_of from '../../BiblePublic/foundation/is_list_of.js';
import is_defined from '../../BiblePublic/foundation/is_defined.js';
import bible_verse_data from '../../BiblePublic/bible/bible_verse_data.js';
import list_add from '../foundation/list_add.js';
import list_where from '../../BiblePublic/foundation/list_where.js';
import is_empty from '../../BiblePublic/core/is_empty.js';
export default bible_kjv_parse;
async function bible_kjv_parse(file_get, books) {
  arguments_assert(arguments, is_function, is_list_of(is_defined));
  let testaments_books = await bible_testaments_books(file_get);
  let result = [];
  for_each(testaments_books, testaments_book => {
    let book = list_where_single(books, b => {
      return property_value_get(b, 'book') === testaments_book;
    });
    for_each(book.chapters, chapter => {
      let chapter_index = chapter.chapter;
      for_each(chapter.verses, verse => {
        let verse_index = verse.verse;
        let text = verse.text;
        const unfiltered = text.split(' ');
        let tokens = list_where(unfiltered, t => !is_empty(t));
        let verse_data = bible_verse_data(testaments_book, chapter_index, verse_index, tokens);
        list_add(result, verse_data);
      });
    });
  });
  return result;
}