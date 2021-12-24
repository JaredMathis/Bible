import arguments_assert from '../foundation/arguments_assert.js';
import is_list_of from '../foundation/is_list_of.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import string_trim from '../core/string_trim.js';
export default bible_verse_data;
function bible_verse_data(book, chapter_index, verse, tokens) {
  arguments_assert(arguments, is_string_not_empty, is_string_not_empty, is_string_not_empty, is_list_of(is_string_not_empty));
  book = string_trim(book, ' ');
  let verse_data = {};
  verse_data.verse = verse;
  verse_data.book = book;
  verse_data.chapter = chapter_index;
  verse_data.reference = `${ book } ${ chapter_index }:${ verse }`;
  verse_data.tokens = tokens
  return verse_data;
}