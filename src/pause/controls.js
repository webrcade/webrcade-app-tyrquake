import React from 'react';

import { ControlsTab } from '@webrcade/app-common';

export class GamepadControlsTab extends ControlsTab {
  render() {
    return (
      <>
        {/* {this.renderControl('start', 'Start')}
        {this.renderControl('select', 'Select')}
        {this.renderControl('dpad', 'Move')}
        {this.renderControl('lanalog', 'Move')}
        {this.renderControl('a', 'Button A')}
        {this.renderControl('b', 'Button B')}
        {this.renderControl('x', 'Button C')}
        {this.renderControl('y', 'Button D')} */}
      </>
    );
  }
}

export class KeyboardControlsTab extends ControlsTab {
  render() {
    return (
      <>
        {/* {this.renderKey('Enter', 'Start')}
        {this.renderKey('ShiftRight', 'Select')}
        {this.renderKey('ArrowUp', 'Up')}
        {this.renderKey('ArrowDown', 'Down')}
        {this.renderKey('ArrowLeft', 'Left')}
        {this.renderKey('ArrowRight', 'Right')}
        {this.renderKey('KeyZ', 'Button A')}
        {this.renderKey('KeyX', 'Button B')}
        {this.renderKey('KeyC', 'Button C')}
        {this.renderKey('KeyV', 'Button D')} */}
      </>
    );
  }
}
