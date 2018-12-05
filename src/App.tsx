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
      logoLeft: 0,
      logoTop: 0,
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
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
          onMouseDown={this.onMouseDown}
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

    window.document.addEventListener('mousemove', this.onMouseMove);
    window.document.addEventListener('mouseup', this.onMouseUp);
    window.document.addEventListener('touchmove', this.onTouchMove);
    window.document.addEventListener('touchend', this.onTouchEnd);
  }

  public componentWillUnmount () {
    window.document.removeEventListener('mousemove', this.onMouseMove);
    window.document.removeEventListener('mouseup', this.onMouseUp);
    window.document.removeEventListener('touchmove', this.onTouchMove);
    window.document.removeEventListener('touchend', this.onTouchEnd);
  }

  public onMouseDown (event: React.MouseEvent) {
    event.preventDefault();
    this.startDragging(this.getMousePoint(event));
  }

  public onMouseMove (event: MouseEvent) {
    if (this.state.dragging) {
      this.drag(this.getMousePoint(event));
    }
  }

  public onMouseUp (event: MouseEvent) {
    if (this.state.dragging) {
      this.stopDragging();
    }
  }

  public onTouchStart (event: React.TouchEvent<HTMLImageElement>) {
    this.startDragging(this.getTouchPoint(event));
  }

  public onTouchMove (event: TouchEvent) {
    if (this.state.dragging) {
      this.drag(this.getTouchPoint(event));
    }
  }

  public onTouchEnd (event: TouchEvent) {
    if (this.state.dragging) {
      this.stopDragging();
    }
  }

  protected startDragging (point: [number, number]) {
    this.setState({
      dragging: true,
      lastDragPoint: point,
    });
  }

  protected drag (point: [number, number]) {
    const s = this.state;
    const { lastDragPoint } = s;
    const diff = [point[0] - lastDragPoint[0], point[1] - lastDragPoint[1]];

    this.setState({
      lastDragPoint: point,
      logoLeft: s.logoLeft + diff[0],
      logoTop: s.logoTop + diff[1],
    });
  }

  protected stopDragging () {
    this.setState({
      dragging: false,
      lastDragPoint: [0, 0],
    });
  }

  protected getMousePoint (event: MouseEvent | React.MouseEvent): [number, number] {
    return [event.clientX, event.clientY];
  }

  protected getTouchPoint (event: TouchEvent | React.TouchEvent): [number, number] {
    const touch = event && event.touches[0];
    if (touch) {
      return [touch.clientX, touch.clientY];
    } else {
      return[0, 0];
    }
  }
}

export default App;
