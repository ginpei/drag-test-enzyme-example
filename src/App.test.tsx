import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from './App';

enzyme.configure({ adapter: new Adapter() });

describe('<App>', () => {
  it('renders finely', () => {
    expect(() => {
      const wrapper = shallow<App>(
        <App/>,
      );
      expect(wrapper.hasClass('App')).toBeTruthy();
    }).not.toThrow();
  });
});
