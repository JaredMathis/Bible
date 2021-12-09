import arguments_assert from '../foundation/arguments_assert.js';
import assert from '../foundation/assert.js';
import error from '../foundation/error.js';
import for_each from '../foundation/for_each.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import list_includes from '../foundation/list_includes.js';
import list_map from '../foundation/list_map.js';
import number_add_one from '../foundation/number_add_one.js';
import number_zero from '../foundation/number_zero.js';
import list_add_all from '../core/list_add_all.js';
import list_add from '../foundation/list_add.js';
import list_get from '../foundation/list_get.js';
import returns from '../foundation/returns.js';
import throws from '../foundation/throws.js';
import string_index_of_all from '../foundation/string_index_of_all.js';
import size from '../foundation/size.js';
import list_to_pairs from '../foundation/list_to_pairs.js';
import string_substring from '../foundation/string_substring.js';
import list_where from '../foundation/list_where.js';
export default ui_bible_tokenize_hyphens;
let hyphen = '—';
function ui_bible_tokenize_hyphens(s) {
  arguments_assert(arguments, is_string_not_empty);
  let indices_hyphen = string_index_of_all(s, hyphen);
  let index_last = size(s);
  let indices_split = [number_zero()];
  let filtered = list_where(indices_hyphen, hi => !list_includes(indices_hyphen, number_add_one(hi)));
  let mapped = list_map(filtered, number_add_one);
  list_add_all(indices_split, mapped)
  assert(!list_includes(mapped, number_zero()))
  if (!list_includes(indices_split, index_last)) {
    list_add(indices_split, index_last);
  }
  const pairs = list_to_pairs(indices_split);
  let result = [];
  for_each(pairs, pair => {
    let left = list_get(pair, 0);
    let right = list_get(pair, 1);
    let token = string_substring(s, left, right);
    list_add(result, token)
  })
  return result;
}
throws(ui_bible_tokenize_hyphens)('')
returns(ui_bible_tokenize_hyphens, ['a']) ('a')
returns(ui_bible_tokenize_hyphens, [`a${hyphen}`,'b']) (`a${hyphen}b`)
returns(ui_bible_tokenize_hyphens, [`a${hyphen}${hyphen}${hyphen}`,'b']) (`a${hyphen}${hyphen}${hyphen}b`)
returns(ui_bible_tokenize_hyphens, [`a${hyphen}${hyphen}`,'b']) (`a${hyphen}${hyphen}b`)
returns(ui_bible_tokenize_hyphens, [`a${hyphen}${hyphen}${hyphen}`,`b${hyphen}${hyphen}`,'c'])(`a${hyphen}${hyphen}${hyphen}b${hyphen}${hyphen}c`)