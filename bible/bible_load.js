import arguments_assert from '../foundation/arguments_assert.js';
import is_defined from '../foundation/is_defined.js';
import is_string_not_empty from '../foundation/is_string_not_empty.js';
import bible_load_asv from './bible_load_asv.js';
import bible_load_lsv from './bible_load_lsv.js';
export default bible_load;
async function bible_load(bible_id, cache, data) {
  arguments_assert(arguments, is_string_not_empty, is_defined, is_defined);
  let lookup = {
    asv: bible_load_asv,
    lsv: bible_load_lsv
  };
  const _function = lookup[bible_id];
  let result = await _function(cache, data);
  return result;
}