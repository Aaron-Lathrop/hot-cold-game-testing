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

    it('Should give correct feedback and guessCount after makeGuess is called with a string', () => {
        const wrapper = shallow(<Game />);
        const guess = 'Not a number';
        wrapper.instance().makeGuess(guess);
        expect(wrapper.state('feedback')).toEqual('Please enter a valid number');
        wrapper.update();
        expect(wrapper.find(GuessSection).prop('feedback')).toEqual('Please enter a valid number');
        expect(wrapper.find(GuessSection).prop('guessCount')).toEqual(0);
    });

    it('Should give correct feedback and guessCount after makeGuess is called with a valid number', () => {
        const wrapper = shallow(<Game />);
        const guess = 5;
        wrapper.instance().makeGuess(guess);
        expect(wrapper.state('feedback')).not.toEqual('Please enter a valid number');
        expect(wrapper.state('feedback')).not.toEqual('Make your guess!');
        expect(wrapper.state('guesses')).toEqual([5]);
        wrapper.update();
        expect(wrapper.find(GuessSection).prop('feedback')).not.toEqual('Please enter a valid number');
        expect(wrapper.find(GuessSection).prop('guessCount')).toEqual(1);
    });

    it('Should give correct feedback when correct guess is made', () => {
        const wrapper = shallow(<Game />);
        const guess = wrapper.state('correctAnswer');
        wrapper.instance().makeGuess(guess);
        expect(wrapper.state('feedback')).toEqual('You got it!');
    });

    it('Should reset to initial state when onRestartGame() is called', () => {
        const wrapper = mount(<Game />);
        const guess = 5;
        wrapper.instance().makeGuess(guess);
        expect(wrapper.state('guesses')).toEqual([5]);
        wrapper.find('a[className="new"]').simulate('click');
        wrapper.update();
        expect(wrapper.state('guesses')).toEqual([]);
    });

    it('Should update auralStatus when generateAuralUpdate() is called', () => {
        const wrapper = mount(<Game />);
        const guess = [5, 1];
        expect(wrapper.state('auralStatus')).toEqual('');
        wrapper.instance().makeGuess(guess[0]);
        wrapper.instance().makeGuess(guess[1]);
        wrapper.update();
        wrapper.find('a[href="#get-status"]').simulate('click');
        expect(wrapper.state('auralStatus')).not.toEqual('');
    });
});