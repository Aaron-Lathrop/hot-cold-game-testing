import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter});

import {shallow, mount} from 'enzyme';

import Header from './header';

describe('<Header />', () => {
    it('Renders without crashing', () => {
        shallow(<Header />);
    });
});