console.log('background');

import HotUpdate from './hotUpdate/main';
import wallet from './wallet';

new HotUpdate();

wallet.init();
