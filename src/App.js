import React from 'react';

import { TouchOverlay, WebrcadeRetroApp } from '@webrcade/app-common';

import { Emulator } from './emulator';
import { EmulatorPauseScreen } from './pause';

import './App.scss';

class App extends WebrcadeRetroApp {

  constructor() {
    super();
    this.state = {
      ...this.state,
      showCanvas: false,
    };
  }

  showCanvas() {
    this.setState({ showCanvas: true });
  }

  createEmulator(app, isDebug) {
    return new Emulator(app, isDebug);
  }

  isArchiveBased() {
    return true;
  }

  isDiscBased() {
    return false;
  }

  isBiosRequired() {
    return false;
  }

  renderCanvas() {
    return (
      <canvas
        style={this.getCanvasStyles()}
        ref={(canvas) => {
          this.canvas = canvas;
        }}
        id="canvas"
      ></canvas>
    );
  }

  renderPauseScreen() {
    const { appProps, emulator } = this;

    return (
      <EmulatorPauseScreen
        emulator={emulator}
        appProps={appProps}
        closeCallback={() => this.resume()}
        exitCallback={() => {
          this.exitFromPause();
        }}
        isEditor={this.isEditor}
        isStandalone={this.isStandalone}
      />
    );
  }

  render() {
    const { showCanvas } = this.state;

    return (
      <>
        {super.render()}
        <TouchOverlay show={showCanvas} />
      </>
    );
  }
}

export default App;
