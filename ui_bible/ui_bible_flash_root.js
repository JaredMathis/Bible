import html_text from '../ui/html_text.js';
import for_each from '../foundation/for_each.js';
import html_element from '../ui/html_element.js';
import ui_spacer from '../ui/ui_spacer.js';
import ui_loader_initialize from '../ui/ui_loader_initialize.js';
import ui_hide from '../ui/ui_hide.js';
import list_includes from '../foundation/list_includes.js';
import for_each_async from '../core/for_each_async.js';
import list_add_all from '../core/list_add_all.js';
import ui_load from '../ui/ui_load.js';
import ui_delay from '../core/ui_delay.js';
import ui_container from '../ui/ui_container.js';
import html_button from '../ui/html_button.js';
import property_value_get from '../foundation/property_value_get.js';
import bible_load from '../bible/bible_load.js';
import bible_books from '../bible/bible_books.js';
import bible_book_chapters from '../bible/bible_book_chapters.js';
import bible_chapter from '../bible/bible_chapter.js';
import html_div from '../ui/html_div.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_html_element from '../ui/is_html_element.js';
import is_list from '../foundation/is_list.js';
export default ui_bible_flash_root;
async function ui_bible_flash_root(parent, bible) {
  arguments_assert(arguments, is_html_element, is_list)
  let verse_current = html_div(parent);
  let verse_index = 0;
  display_next_verse();
  function display_next_verse() {
    verse_current.replaceChildren();
    const verse = bible[verse_index];
    let reference = html_element(verse_current, 'span');
    html_text(reference, verse.reference);
    let tokens = verse.tokens;
    for_each(tokens, token => {
      ui_spacer(verse_current);
      let element_token = html_element(verse_current, 'span');
      if (list_includes([
          'God',
          'LORD',
          'Jesus',
          'Love',
          'love'
        ], token)) {
        element_token.style.color = 'red';
      }
      html_text(element_token, token);
    });
    verse_index++;
    if (verse_index === bible.length) {
      verse_index = 0;
    }
    setTimeout(display_next_verse, 1);
  }
}