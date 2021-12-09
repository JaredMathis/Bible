import arguments_assert from '../foundation/arguments_assert.js';
import assert from '../foundation/assert.js';
import is_html_element from '../ui/is_html_element.js';
export default ui_list_item_to_element_verse;
function ui_list_item_to_element_verse(list_item) {
  arguments_assert(arguments, is_html_element);
  let row = list_item.firstChild;
  let left = row.firstChild;
  let element_verse = left;
  assert(is_html_element(element_verse));
  return element_verse;
}