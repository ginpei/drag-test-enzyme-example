# Testing Drag on React + Enzyme

Enzyme uses JSDom, which uses `global.document` .

Simply you can fire the event on it.

## Components

```tsx
public render () {
  <div onTouchStart={this.onTouchStart} />
}

public componentDidMount () {
  document.addEventListener('touchmove', this.onTouchMove);
  document.addEventListener('touchend', this.onTouchEnd);
}
```

## Tests

```tsx
it('moves target', () => {
  const wrapper = shallow<DraggableComponent>(
    <DraggableComponent/>,
  );

  // start touching on the component
  wrapper.simulate('touchstart', {
    touches: [
      { clientX: 12, clientY: 34 },
    ],
  });

  // and move on document
  document.dispatchEvent(new TouchEvent('touchmove', {
    touches: [
      { clientX: 112, clientY: 134 } as Touch,
    ],
  }));

  // then finish
  document.dispatchEvent(new TouchEvent('touchend'));

  expect(wrapper.state().dragging).toBe(false);
  expect(wrapper.state().dragLeft).toBe(100);
  expect(wrapper.state().dragTop).toBe(100);
});
```
