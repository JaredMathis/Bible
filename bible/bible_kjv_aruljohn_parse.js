import list_where from '../foundation/list_where.js';
import property_value_get from '../foundation/property_value_get.js';
import bible_kjv_parse from '../bible/bible_kjv_parse.js';
import json_to_object from '../foundation/json_to_object.js';
import file_path_parse from '../core/file_path_parse.js';
import file_read from '../core/file_read.js';
import directory_firebase_deploy_get from '../core/directory_firebase_deploy_get.js';
import bible_public_file_get from './bible_public_file_get.js';
import list_map from '../foundation/list_map.js';
import directory_files_absolute from '../core/directory_files_absolute.js';
import string_ends_with from '../foundation/string_ends_with.js';
import bible_kjv_aruljohn_parse from '../bible/bible_kjv_aruljohn_parse.js';
export default bible_kjv_aruljohn_parse;
async function bible_kjv_aruljohn_parse() {
    let directory_firebase_deploy = directory_firebase_deploy_get();
    const directory_kjv = `${ directory_firebase_deploy }/kjv/aruljohn`;
    let file_paths = directory_files_absolute(directory_kjv, []);
    let filtered = list_where(file_paths, file_path => {
      let parsed = file_path_parse(file_path);
      const file_name = property_value_get(parsed, 'file_name');
      if (file_name === 'Books.json' || !string_ends_with(file_name, '.json')) {
        return false;
      }
      return true;
    });
    let books = list_map(filtered, file_path => {
      let json = file_read(file_path);
      let object = json_to_object(json);
      return object;
    });
    let parsed = await bible_kjv_parse(bible_public_file_get, books);
    return parsed;
}