import ENTRY_NAMES from './entryNames';
import getModule from './getModule';

getModule(ENTRY_NAMES.test, () => {
  import(/* webpackChunkName: "test" */'../content-scripts/comment-viewer/test');
}, true);
