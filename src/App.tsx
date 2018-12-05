import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

interface IAppState {
  dragging: boolean;
  lastDragPoint: [number, number];
  logoLeft: number;
  logoTop: number;
}

class App extends Component<any, IAppState> {
  protected ref = React.createRef<HTMLDivElement>();
  protected refLogo = React.createRef<HTMLImageElement>();

  protected get logoStyle () {
    return {
      left: this.state.logoLeft,
      top: this.state.logoTop,
    };
  }

  constructor (props: any) {
    super(props);
    this.state = {
      dragging: false,
      lastDragPoint: [0, 0],
      logoLeft: -10,
      logoTop: -10,
    };
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  public render () {
    return (
      <div
        className="App"
        ref={this.ref}
      >
        <img
          alt="logo"
          className="App-logo"
          onTouchStart={this.onTouchStart}
          style={this.logoStyle}
          ref={this.refLogo}
          src={logo}
        />
      </div>
    );
  }

  public componentDidMount () {
    const el = this.ref.current;
    const elLogo = this.refLogo.current;
    if (el && elLogo) {
      this.setState({
        logoLeft: (el.clientWidth - elLogo.clientWidth) / 2,
        logoTop: (el.clientHeight - elLogo.clientHeight) / 2,
      });
    }

    window.document.addEventListener('touchmove', this.onTouchMove);
    window.document.addEventListener('touchend', this.onTouchEnd);
  }

  public componentWillUnmount () {
    window.document.removeEventListener('touchmove', this.onTouchMove);
    window.document.removeEventListener('touchend', this.onTouchEnd);
  }

  public onTouchStart (event: React.TouchEvent<HTMLImageElement>) {
    this.setState({
      dragging: true,
      lastDragPoint: this.getTouchPoint(event),
    });
  }

  public onTouchMove (event: TouchEvent) {
    const s = this.state;
    if (!s.dragging) {
      return;
    }

    const point = this.getTouchPoint(event);
    const { lastDragPoint } = s;
    const diff = [point[0] - lastDragPoint[0], point[1] - lastDragPoint[1]];

    this.setState({
      lastDragPoint: point,
      logoLeft: s.logoLeft + diff[0],
      logoTop: s.logoTop + diff[1],
    });
  }

  public onTouchEnd (event: TouchEvent) {
    const s = this.state;
    if (!s.dragging) {
      return;
    }

    this.setState({
      dragging: false,
      lastDragPoint: this.getTouchPoint(null),
    });
  }

  protected getTouchPoint (event: TouchEvent | React.TouchEvent | null): [number, number] {
    const touch = event && event.touches[0];
    if (touch) {
      return [touch.clientX, touch.clientY];
    } else {
      return[0, 0];
    }
  }
}

export default App;
