import arguments_assert from '../foundation/arguments_assert.js';
export default bible_public_url;
function bible_public_url() {
  arguments_assert(arguments);
  return `https://wlj-bible-public.web.app/`;
}