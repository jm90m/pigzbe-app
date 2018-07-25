import {AppRegistry} from 'react-native';
import {getStorybookUI, configure} from '@storybook/react-native';

function loadStories() {
    require('./stories/hello.js');
    require('./stories/key-holder.js');
    require('./stories/num-pad.js');
    require('./stories/button.js');
    require('./stories/text-input.js');
    require('./stories/step-module.js');
    require('./stories/modal.js');
    require('./stories/balance.js');
    require('./stories/passcode.js');
}

configure(loadStories, module);

const StorybookUI = getStorybookUI({
    port: 7007,
    host: 'localhost',
});
AppRegistry.registerComponent('PigzbeApp', () => StorybookUI);

if (typeof console !== 'undefined') {
    console.disableYellowBox = true;
}
