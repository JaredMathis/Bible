import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_empty from '../core/is_empty.js';
import equals from '../foundation/equals.js';
import boolean_and from '../foundation/boolean_and.js';
import number_less_than from '../foundation/number_less_than.js';
import html_for_each_child from '../ui/html_for_each_child.js';
import ui_data_value from '../ui/ui_data_value.js';
import html_classes_add from '../ui/html_classes_add.js';
import html_classes_remove from '../ui/html_classes_remove.js';
import assert from '../foundation/assert.js';
import is_number from '../foundation/is_number.js';
import is_list_of from '../foundation/is_list_of.js';
import is_boolean from '../foundation/is_boolean.js';
import size from '../foundation/size.js';
import boolean from '../foundation/boolean.js';
import comment from '../core/comment.js';
import ui_list_item_to_element_verse from './ui_list_item_to_element_verse.js';
export default ui_bible_update;
function ui_bible_update(data, container_verses) {
  arguments_assert(arguments, is_defined, is_defined);
  let pattern = ui_data_value(data, 'pattern');
  assert(is_list_of(is_boolean)(pattern));
  if (is_empty(pattern)) {
    pattern = [true];
  }
  const index_verse_current = ui_data_value(data, 'index_verse_current');
  const index_token_current = ui_data_value(data, 'index_token_current');
  if (!is_number(index_verse_current)) {
    return;
  }
  if (!is_number(index_token_current)) {
    return;
  }
  const show_all_verses = ui_data_value(data, 'show_all_verses');
  let counter = 0;
  html_for_each_child(container_verses, (list_item, index_verse) => {
    let element_verse = ui_list_item_to_element_verse(list_item);
    let skips = 0;
    html_for_each_child(element_verse, (element_token, index_token) => {
      if (element_token.dataset.is_token !== 'true') {
        skips++;
        return;
      }
      index_token = index_token - skips;
      const is_current_verse = equals(index_verse, index_verse_current);
      const token_is_before_current = number_less_than(index_token, index_token_current);
      let is_current_verse_but_before_token = boolean_and(is_current_verse, token_is_before_current);
      const is_before_current_verse = number_less_than(index_verse, index_verse_current);
      let is_before_current = is_current_verse_but_before_token || is_before_current_verse;
      let is_current_verse_and_token = is_current_verse && equals(index_token, index_token_current);
      let show = pattern[counter % size(pattern)];
      html_classes_remove(element_token, [
        'text-white',
        'bg-primary',
        'text-primary',
        'text-muted'
      ]);
      if (is_current_verse_and_token) {
        comment('Make sure the entire verse is visible in the UI');
        element_verse.scrollIntoView(false);
        html_classes_add(element_token, [
          'bg-primary',
          'text-primary'
        ]);
        if (boolean(show) || show_all_verses) {
          html_classes_add(element_token, ['text-white']);
        }
      } else {
        if (!is_before_current) {
          if (boolean(show) || show_all_verses) {
            html_classes_add(element_token, ['text-muted']);
          } else {
            html_classes_add(element_token, ['text-white']);
          }
        }
      }
      counter++;
    });
  });
}