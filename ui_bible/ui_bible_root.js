import html_text from '../ui/html_text.js';
import for_each from '../foundation/for_each.js';
import ui_loader_initialize from '../ui/ui_loader_initialize.js';
import ui_hide from '../ui/ui_hide.js';
import ui_load from '../ui/ui_load.js';
import ui_delay from '../core/ui_delay.js';
import ui_container from '../ui/ui_container.js';
import html_button from '../ui/html_button.js';
import property_value_get from '../foundation/property_value_get.js';
import bible_load from '../bible/bible_load.js';
import html_div from '../ui/html_div.js';
import arguments_assert from '../foundation/arguments_assert.js';
import is_html_element from '../ui/is_html_element.js';
import ui_bible_memorize_root from '../ui_bible/ui_bible_memorize_root.js';
import ui_show from '../ui/ui_show.js';
import ui_bible_flash_root from './ui_bible_flash_root.js';
import ui_action_no_message from '../ui/ui_action_no_message.js';
import ui_initialize from '../ui/ui_initialize.js';
import ui_alert_message_to_html from '../ui/ui_alert_message_to_html.js';
export default ui_bible_root;
async function ui_bible_root(parent) {
  let cache = {};
  let {data, container} = ui_initialize(parent, ui_alert_message_to_html)
  let bible;
  function set_font_size(element) {
    arguments_assert(arguments, is_html_element);
    if (false)
      element.style['font-size'] = '100%';
  }
  let screen_home = ui_container(container);
  let message = html_div(screen_home);
  set_font_size(message);
  html_text(message, 'Choose a Bible version:');
  let choices = [
    {
      label: 'American Standard Version',
      bible_id: 'asv'
    },
    {
      label: 'King James Version',
      bible_id: 'kjv'
    },
    {
      label: 'Literal Standard Version (LSV) by Covenant Press',
      bible_id: 'lsv'
    }
  ];
  let buttons = ui_container(screen_home);
  for_each(choices, c => {
    let label = property_value_get(c, 'label');
    let bible_id = property_value_get(c, 'bible_id');
    let button_container = ui_container(buttons);
    let button = html_button(button_container, data, label, 'primary');
    set_font_size(button);
    ui_action_no_message(data, button, async e => {
      await ui_load(data, ui_delay(async () => {
        bible = await bible_load(bible_id, cache, data);
      }));
      ui_hide(screen_home);
      ui_show(screen_app_choose);
    });
  });
  let screen_app_choose = ui_container(container);
  ui_hide(screen_app_choose);
  let button_memorize = html_button(screen_app_choose, data, 'Memorize', 'primary');
  ui_action_no_message(data, button_memorize, e => {
    ui_hide(screen_app_choose);
    ui_bible_memorize_root(container, data, bible);
  });
  let button_flash = html_button(screen_app_choose, data, 'Flash', 'primary');
  ui_action_no_message(data, button_flash, e => {
    ui_hide(screen_app_choose);
    ui_bible_flash_root(container, bible);
  });
}