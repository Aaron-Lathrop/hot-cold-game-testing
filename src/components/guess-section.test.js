import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter});

import {shallow, mount} from 'enzyme';

import GuessSection from './guess-section';

describe('<GuessSection />', () => {
    it('Renders without crashing', () => {
        const feedback = 'Foobar';
        const guessCount = 5;
        shallow(<GuessSection feedback={feedback} guessCount={guessCount} />);
    });
});