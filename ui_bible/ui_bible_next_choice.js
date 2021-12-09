import list_index_of from "../core/list_index_of.js";
import list_get from "../foundation/list_get.js";
import list_or_string_is_index from "../foundation/list_or_string_is_index.js";
import number_add_one from "../foundation/number_add_one.js";
import ui_data_change from "../ui/ui_data_change.js";
import ui_data_value from "../ui/ui_data_value.js";

export default ui_bible_next_choice
function ui_bible_next_choice(data, list_name, item_name) {
    let list = ui_data_value(data, list_name);
    let item_current = ui_data_value(data, item_name)
    let item_index_current = list_index_of(list, item_current);
    let item_index_new = number_add_one(item_index_current);
    if (!list_or_string_is_index(list, item_index_new)) {
        return false;
    }
        let item_new = list_get(list, item_index_new);
        ui_data_change(data, item_name, item_new);
    
    return true;
}