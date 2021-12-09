import bible_public_url from './bible_public_url.js';
export default bible_interlinear_url;
function bible_interlinear_url() {
  return `${ bible_public_url() }interlinear/tahmmee/`;
}