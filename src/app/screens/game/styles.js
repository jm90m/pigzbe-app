import {StyleSheet} from 'react-native';
import {color} from '../../styles';
import isIphoneX from 'app/utils/is-iphonex';

export default StyleSheet.create({
    full: {
        backgroundColor: color.earth,
        alignSelf: 'stretch',
        flex: 1
    },
    counter: {
        position: 'absolute',
        top: isIphoneX ? 60 : 30,
        left: 15,
    },
    logout: {
        position: 'absolute',
        top: isIphoneX ? 50 : 20,
        right: 5,
    },
    tree: {
        position: 'absolute',
        bottom: 65,
    },
    clouds: {
        position: 'absolute',
        top: isIphoneX ? 55 : 25,
        left: 0,
        right: 0,
    },
    tourContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 30,
    },
    tourContainerFaded: {
        backgroundColor: color.blueOpacity50,
    },
    bubble: {
        position: 'absolute',
        left: 35,
        bottom: 195,
    },
    loading: {
        position: 'absolute',
        top: isIphoneX ? 80 : 50,
        right: 30,
    }
});
