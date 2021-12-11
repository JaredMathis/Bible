import arguments_assert from '../foundation/arguments_assert.js';
import for_each from '../foundation/for_each.js';
import is_defined from '../foundation/is_defined.js';
import is_function from '../foundation/is_function.js';
import bible_load from './bible_load.js';
export default bible_lsv_for_each;
async function bible_lsv_for_each(cache, data, lambda) {
  arguments_assert(arguments, is_defined, is_defined, is_function);
  let lines = await bible_load('lsv', cache, data);
  for_each(lines, tokens => {
    lambda(tokens);
  });
}