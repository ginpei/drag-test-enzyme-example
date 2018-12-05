import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from './App';

enzyme.configure({ adapter: new Adapter() });

describe('<App>', () => {
  describe('drag', () => {
    it('moves logo', () => {
      const wrapper = shallow<App>(
        <App/>,
      );

      wrapper.find('.App-logo').simulate('touchstart', {
        touches: [
          { clientX: 12, clientY: 34 },
        ],
      });

      document.dispatchEvent(new TouchEvent('touchmove', {
        touches: [
          { clientX: 112, clientY: 134 } as Touch,
        ],
      }));

      document.dispatchEvent(new TouchEvent('touchend'));

      expect(wrapper.state().dragging).toBe(false);
      expect(wrapper.state().logoLeft).toBe(100);
      expect(wrapper.state().logoTop).toBe(100);
    });
  });
});
