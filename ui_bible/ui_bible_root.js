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
import ui_bible_memorize_root from '../ui_bible/ui_bible_memorize_root.js';
import ui_show from '../ui/ui_show.js';
import ui_bible_flash_root from './ui_bible_flash_root.js';
export default ui_bible_root;
async function ui_bible_root(parent) {
  let data = {};
  let cache = {};
  ui_loader_initialize(parent, data);
  let bible = [];
  function set_font_size(element) {
    arguments_assert(arguments, is_html_element);
    if (false)
      element.style['font-size'] = '100%';
  }
  let screen_home = ui_container(parent);
  let message = html_div(screen_home);
  set_font_size(message);
  html_text(message, 'Choose a Bible version:');
  let lsv = {
    label: 'Literal Standard Version (LSV) by Covenant Press',
    bible_id: 'lsv'
  };
  let choices = [
    lsv,
    {
      label: 'American Standard Version',
      bible_id: 'asv'
    }
  ];
  let buttons = ui_container(screen_home);
  for_each(choices, c => {
    let label = property_value_get(c, 'label');
    let bible_id = property_value_get(c, 'bible_id');
    let button_container = ui_container(buttons);
    let button = html_button(button_container, data, label, 'primary');
    set_font_size(button);
    button.addEventListener('click', async e => {
      await ui_load(data, ui_delay(async () => {
        await bible_load(bible_id, cache, data);
        let books = await bible_books(bible_id, data, cache);
        await for_each_async(books, async book => {
          let chapters = await bible_book_chapters(bible_id, data, cache, book);
          await for_each_async(chapters, async chapter_index => {
            let chapter = await bible_chapter(bible_id, data, cache, book, chapter_index);
            list_add_all(bible, chapter);
          });
        });
      }));
      ui_hide(screen_home);
      ui_show(screen_app_choose);
    });
  });

  let screen_app_choose = ui_container(parent);
  ui_hide(screen_app_choose);
  let button_memorize = html_button(screen_app_choose, data, 'Memorize', 'primary');
  button_memorize.addEventListener('click', e=>{
    ui_hide(screen_app_choose);
    ui_bible_memorize_root(parent, data, bible);
  })
  let button_flash = html_button(screen_app_choose, data, 'Flash', 'primary');
  button_flash.addEventListener('click', e=>{
    ui_hide(screen_app_choose);
    ui_bible_flash_root(parent, bible);
  })
}