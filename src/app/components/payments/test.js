import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Payments from './';
import wollo from '../../reducers/wollo';
import keys from '../../reducers/keys';
import kids from '../../reducers/kids';
import {mockStore} from '../../../setupTests';

const props = {
    dispatch: () => {},
    payments: [],
};

describe('Payments', () => {
    test('renders correctly', () => {
        renderer.create((
            <Provider store={mockStore({wollo, keys, kids})}>
                <Payments {...props}/>
            </Provider>
        ));
    });
});
