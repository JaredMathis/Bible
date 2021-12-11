import string_to_uppercase from '../core/string_to_uppercase.js';
import arguments_assert from '../foundation/arguments_assert.js';
import error from '../foundation/error.js';
import html_link from '../ui/html_link.js';
import is_defined from '../foundation/is_defined.js';
import list_map from '../foundation/list_map.js';
import list_property_unique from '../foundation/list_property_unique.js';
import list_where from '../foundation/list_where.js';
import keys from '../foundation/keys.js';
import string_split from '../foundation/string_split.js';
import property_value_get from '../foundation/property_value_get.js';
import string_starts_with from '../foundation/string_starts_with.js';
import string_ends_with from '../foundation/string_ends_with.js';
import ui_spacer from '../ui/ui_spacer.js';
import list_any from '../foundation/list_any.js';
import equals from '../foundation/equals.js';
import sequence_first from '../core/sequence_first.js';
import number_add_one from '../foundation/number_add_one.js';
import number_zero from '../foundation/number_zero.js';
import boolean_not from '../foundation/boolean_not.js';
import ui_bible_update from './ui_bible_update.js';
import ui_http_data from '../ui/ui_http_data.js';
import ui_hide_all from '../ui/ui_hide_all.js';
import is_html_element from '../ui/is_html_element.js';
import ui_list_action_string from '../ui/ui_list_action_string.js';
import html_text from '../ui/html_text.js';
import ui_data_on_changed from '../ui/ui_data_on_changed.js';
import ui_data_change from '../ui/ui_data_change.js';
import ui_data_value from '../ui/ui_data_value.js';
import ui_show from '../ui/ui_show.js';
import html_div from '../ui/html_div.js';
import ui_list from '../ui/ui_list.js';
import for_each from '../foundation/for_each.js';
import html_element from '../ui/html_element.js';
import is_letter from '../core/is_letter.js';
import is_character from '../core/is_character.js';
import string_to_lowercase from '../core/string_to_lowercase.js';
import html_classes_add from '../ui/html_classes_add.js';
import html_classes_remove from '../ui/html_classes_remove.js';
import ui_labelled_input from '../ui/ui_labelled_input.js';
import to_list from '../foundation/to_list.js';
import size from '../foundation/size.js';
import list_get from '../foundation/list_get.js';
import list_index_of from '../core/list_index_of.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import list_add_all from '../core/list_add_all.js';
import ui_bible_tokenize_hyphens from './ui_bible_tokenize_hyphens.js';
import ui_bible_next_choice from './ui_bible_next_choice.js';
import boolean from '../foundation/boolean.js';
import ui_list_item_to_element_verse from './ui_list_item_to_element_verse.js';
import console_log from '../foundation/console_log.js';
import list_single from '../core/list_single.js';
import assert from '../foundation/assert.js';
import string_trim_all from '../core/string_trim_all.js';
import string_join from '../foundation/string_join.js';
import bible_interlinear_url from '../bible/bible_interlinear_url.js';
import is_list from '../foundation/is_list.js';
import html_button from '../ui/html_button.js';
import ui_hide from '../ui/ui_hide.js';
import bible_hyphens_get from '../bible/bible_hyphens_get.js';
import ui_action_no_message from '../ui/ui_action_no_message.js';
export default ui_bible_root;
async function ui_bible_root(parent, data, bible) {
  arguments_assert(arguments, is_html_element, is_defined, is_list);
  let screen_choose_chapter = 'choose_chapter';
  let screen_choose_book = 'choose_book';
  let screen_memorize = 'memorize';
  let document_title = 'Bible Memorize';
  document.title = document_title;
  const interlinear_books = await ui_http_data(data, `${ bible_interlinear_url() }books.json`);
  let books = list_property_unique(bible, 'book');
  let title = html_div(parent);
  let {input: pattern_input} = ui_labelled_input(parent, 'Pattern');
  pattern_input.addEventListener('input', function (e) {
    const value = property_value_get(property_value_get(e, 'target'), 'value');
    let characters = string_split(value, '');
    let mapped = list_map(characters, c => {
      if (c === '1') {
        return true;
      }
      if (c === '0') {
        return false;
      }
      error('expecting 1 or 0');
    });
    ui_data_change(data, 'pattern', mapped);
  });
  pattern_input.value = '1';
  function verse_to_index_interlinear(data, verse_index) {
    arguments_assert(arguments, is_defined, is_string_not_empty);
    let book = ui_data_value(data, 'book');
    let chapter = ui_data_value(data, 'chapter');
    let book_verses = list_where(bible, b => b.book === book);
    let bible_verse = list_single(list_where(book_verses, b => b.chapter === chapter && b.verse === verse_index));
    let result = list_index_of(book_verses, bible_verse);
    return result;
  }
  let container_verses = ui_list(parent, data, 'verses', (list_item, bible_verse, index) => {
    let book_interlinear = ui_data_value(data, 'book_interlinear');
    console_log({ book_interlinear });
    let row = html_element(list_item, 'div');
    html_classes_add(row, ['row']);
    let left = html_element(row, 'div');
    html_classes_add(left, ['col']);
    let right = html_element(row, 'div');
    html_classes_add(right, ['col']);
    let verse_number = html_link(left);
    verse_number.setAttribute('role', 'button');
    const verse = property_value_get(bible_verse, 'verse');
    let index_interlinear = verse_to_index_interlinear(data, verse);
    let data_interlinear = property_value_get(book_interlinear, index_interlinear);
    let data_interlinear_verse = property_value_get(data_interlinear, 'verse');
    for_each(data_interlinear_verse, interlinear_word => {
      let english = property_value_get(interlinear_word, 'text');
      let non_english = property_value_get(interlinear_word, 'word');
      let number = property_value_get(interlinear_word, 'number');
      let languages = {
        'h': 'hebrew',
        'g': 'greek'
      };
      let languages_keys = keys(languages);
      assert(list_any(languages_keys, k => string_starts_with(number, k)), { number });
      let trimmed = string_trim_all(number, languages_keys);
      let link = html_link(right);
      html_text(link, `${ non_english }`);
      link.setAttribute('target', '_blank');
      let first = sequence_first(number);
      let language = property_value_get(languages, first);
      link.href = `https://biblehub.com/${ language }/${ trimmed }.htm`;
      let english_span = html_element(right, 'span');
      html_text(english_span, ` (${ english }) `);
    });
    function html_table(parent, data) {
      let table = html_element(parent, 'table');
      let tbody = html_element(table, 'tbody');
      for_each(data, row => {
        let tr = html_element(tbody, 'tr');
        for_each(row, col => {
          let td = html_element(tr, 'td');
          html_text(td, col);
        });
      });
    }
    verse_number.textContent = verse;
    verse_number.dataset.is_token = false;
    ui_action_no_message(data, verse_number, e => {
      ui_data_change(data, 'index_token_current', index);
      ui_data_change(data, 'index_verse_current', index);
      ui_bible_update(data, container_verses);
    });
    let split = property_value_get(bible_verse, 'tokens');
    let tokens = [];
    for_each(split, s => {
      list_add_all(tokens, ui_bible_tokenize_hyphens(s));
    });
    let token_previous;
    for_each(tokens, token_current => {
      let hyphens = bible_hyphens_get();
      let no_spacer = is_defined(token_previous) && list_any(hyphens, hyphen => string_ends_with(token_previous, hyphen));
      if (!no_spacer) {
        let element_spacer = ui_spacer(left);
        element_spacer.dataset.is_token = false;
      }
      let element_token = html_element(left, 'span');
      element_token.textContent = token_current;
      element_token.dataset.token = token_current;
      element_token.dataset.is_token = true;
      token_previous = token_current;
    });
  });
  ui_data_on_changed(data, 'pattern', () => {
    ui_bible_update(data, container_verses);
  });
  ui_data_on_changed(data, 'verses', v => {
    ui_bible_update(data, container_verses);
  });
  ui_data_change(data, 'show_all_verses', false);
  window.addEventListener('keydown', e => {
    if (ui_data_value(data, 'screen') !== screen_memorize) {
      return;
    }
    let actual = e.key;
    press_key(actual);
  });
  function press_key(actual) {
    arguments_assert(arguments, is_defined);
    if (equals(actual, 'Enter')) {
      ui_data_change(data, 'show_all_verses', boolean_not(ui_data_value(data, 'show_all_verses')));
      ui_bible_update(data, container_verses);
    }
    if (!is_character(actual)) {
      return;
    }
    function is_digit(c) {
      return /^\d+$/.test(c);
    }
    function character_is_valid(c) {
      return is_letter(c) || is_digit(c);
    }
    if (!character_is_valid(actual)) {
      return;
    }
    const index_token_current = ui_data_value(data, 'index_token_current');
    const index_verse_current = ui_data_value(data, 'index_verse_current');
    const list_item = container_verses.childNodes[index_verse_current];
    let element_verse = ui_list_item_to_element_verse(list_item);
    const tokens = list_where(to_list(element_verse.childNodes), n => n.dataset.is_token === 'true');
    let element_token = tokens[index_token_current];
    let token = element_token.dataset.token;
    let split = string_split(token, '');
    let filtered = list_where(split, c => character_is_valid(c));
    let joined = string_join(filtered, '');
    let first = sequence_first(joined);
    let expected = string_to_lowercase(first);
    if (equals(actual, expected)) {
      html_classes_remove(element_token, ['text-white']);
      const index_token_current_new = number_add_one(index_token_current);
      ui_data_change(data, 'index_token_current', index_token_current_new);
      const tokens_size = size(tokens);
      console_log({
        actual,
        tokens_size,
        tokens
      });
      if (index_token_current_new === tokens_size) {
        console.log('next verse');
        const index_verse_current_new = number_add_one(index_verse_current);
        ui_data_change(data, 'index_verse_current', index_verse_current_new);
        if (index_verse_current_new === size(ui_data_value(data, 'verses'))) {
          console.log('next chapter');
          let next_chapter_success = ui_bible_next_choice(data, 'chapters', 'chapter');
          if (!boolean(next_chapter_success)) {
            console.log('next book');
            ui_bible_next_choice(data, 'books', 'book');
            let chapters_next = ui_data_value(data, 'chapters');
            ui_data_change(data, 'chapter', list_get(chapters_next, 0));
          }
        }
      }
    }
    ui_bible_update(data, container_verses);
  }
  ui_data_on_changed(data, 'index_verse_current', () => {
    ui_data_change(data, 'index_token_current', number_zero());
  });
  let {
    container: container_books,
    input: input_books
  } = ui_list_action_string(parent, data, 'books', 'book', 'Choose a book of the Bible');
  let {
    container: container_chapters,
    input: input_chapters
  } = ui_list_action_string(parent, data, 'chapters', 'chapter', 'Choose a chapter');
  let elements = [
    container_verses,
    title,
    container_books,
    container_chapters
  ];
  ui_data_change(data, 'books', books);
  ui_data_on_changed(data, 'book', async book => {
    ui_data_change(data, 'screen', screen_choose_chapter);
    let books = ui_data_value(data, 'books');
    let book_index = list_index_of(books, book);
    let interlinear_book = list_get(interlinear_books, book_index);
    let interlinear_book_name = property_value_get(interlinear_book, 'n');
    let book_interlinear = await ui_http_data(data, `${ bible_interlinear_url() }${ interlinear_book_name }.json`);
    ui_data_change(data, 'book_interlinear', book_interlinear);
  });
  ui_data_on_changed(data, 'chapter', value => {
    if (value === null) {
      return;
    }
    document.title = document_title + ' ' + ui_data_value(data, 'book') + ' ' + value;
    ui_data_change(data, 'screen', screen_memorize);
    const book = ui_data_value(data, 'book');
    const chapter = ui_data_value(data, 'chapter');
    title.replaceChildren();
    let button_book = html_button(title, data, book, 'primary');
    ui_action_no_message(data, button_book, e => {
      ui_data_change(data, 'chapter', null);
      ui_data_change(data, 'screen', screen_choose_book);
    });
    let button_chapter = html_button(title, data, chapter, 'primary');
    ui_action_no_message(data, button_chapter, e => {
      ui_data_change(data, 'screen', screen_choose_chapter);
    });
    let instructions = html_div(title);
    html_text(instructions, '(Type the first letter of the next word; Press enter to toggle viewing all the words)');
    let chapter_verses = list_where(bible, b => b.book === book && b.chapter === chapter);
    let verses = list_map(chapter_verses, v => v);
    ui_data_change(data, 'index_verse_current', 0);
    ui_data_change(data, 'index_token_current', 0);
    ui_data_change(data, 'verses', verses);
  });
  ui_data_on_changed(data, 'screen', value => {
    ui_hide_all(elements);
    if (value === screen_choose_book) {
      ui_show(container_books);
      input_books.select();
    }
    if (value === screen_choose_chapter) {
      const book = ui_data_value(data, 'book');
      title.textContent = book;
      ui_show(title);
      let books_verses = list_where(bible, b => b.book === book);
      let chapters = list_property_unique(books_verses, 'chapter');
      ui_data_change(data, 'chapters', chapters);
      ui_show(container_chapters);
      input_chapters.select();
    }
    if (value === screen_memorize) {
      ui_show(title);
      ui_show(container_verses);
    }
  });
  let keyboard = html_div(parent);
  ui_hide(keyboard);
  html_classes_add(keyboard, ['fixed-bottom']);
  let letters = 'qwertyuiopasdfghjklzxcvbnm';
  let letters_list = string_split(letters, '');
  letters_list.sort();
  for_each(letters_list, letter => {
    let uppercase = string_to_uppercase(letter);
    let key = html_button(keyboard, data, uppercase, 'primary');
    ui_action_no_message(data, key, e => {
      press_key(letter);
    });
  });
  ui_data_change(data, 'pattern', [true]);
  ui_data_change(data, 'screen', screen_choose_book);
}