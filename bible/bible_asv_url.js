import arguments_assert from '../foundation/arguments_assert.js';
import bible_public_url from './bible_public_url.js';
export default bible_asv_url;
function bible_asv_url() {
  arguments_assert(arguments);
  return `${ bible_public_url() }asv/`;
}