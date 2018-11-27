import React from 'react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter});

import {shallow, mount} from 'enzyme';

import Game from './game';
import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

describe('<Game />', () => {
    it('Renders without crashing', () => {
        shallow(<Game />);
    });

    it('Should have initial state', () => {
        const wrapper = shallow(<Game />);
        const correctAnswer = wrapper.state('correctAnswer');
        expect(wrapper.state('feedback')).toEqual('Make your guess!');
        expect(wrapper.state('guesses')).toEqual([]);
        expect(wrapper.state('auralStatus')).toEqual('');
        expect(wrapper.state('correctAnswer')).toEqual(correctAnswer);
    });

    it('Should render other components', () => {
        const wrapper = shallow(<Game />);
        expect(wrapper.find(Header).exists()).toEqual(true);
        expect(wrapper.find(GuessSection).exists()).toEqual(true);
        expect(wrapper.find(StatusSection).exists()).toEqual(true);
        expect(wrapper.find(InfoSection).exists()).toEqual(true);
    });

    it('Should give correct feedback after makeGuess is called', () => {
        const wrapper = shallow(<Game />);
        const guess = 'Not a number';
        wrapper.instance().makeGuess(guess);
        expect(wrapper.state('feedback')).toEqual('Please enter a valid number');
    });
});