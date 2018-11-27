import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter});

import {shallow, mount} from 'enzyme';

import AuralStatus from './aural-status';

describe('<AuralStatus />', () => {
    it('Renders without crashing', () => {
        const auralStatus = 'Foobar';
        shallow(<AuralStatus auralStatus={auralStatus}/>);
    });
});