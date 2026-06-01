import React from 'react';
import { Component } from 'react';

import { GamepadControlsTab, KeyboardControlsTab } from './controls';
import { QuakeSettingsEditor } from './settings';

import {
  AchievementsScreen,
  BoltWhiteImage,
  CheatsSettingsEditor,
  CustomPauseScreen,
  EditorScreen,
  EmojiEventsWhiteImage,
  GamepadWhiteImage,
  KeyboardWhiteImage,
  PauseScreenButton,
  Resources,
  SettingsAppWhiteImage,
  TEXT_IDS,
  achievements,
} from '@webrcade/app-common';

export class EmulatorPauseScreen extends Component {
  constructor() {
    super();
    this.state = {
      mode: this.ModeEnum.PAUSE,
    };
  }

  ModeEnum = {
    PAUSE: 'pause',
    CONTROLS: 'controls',
    QUAKE_SETTINGS: 'quake-settings',
    CHEATS: 'cheats',
    ACHIEVEMENTS: 'achievements',
  };

  ADDITIONAL_BUTTON_REFS = [React.createRef(), React.createRef()];
  SECONDARY_BUTTON_REFS = [React.createRef(), React.createRef(), React.createRef()];

  componentDidMount() {}

  render() {
    const { ADDITIONAL_BUTTON_REFS, SECONDARY_BUTTON_REFS, ModeEnum } = this;
    const {
      appProps,
      closeCallback,
      emulator,
      exitCallback,
      isEditor,
      isStandalone,
    } = this.props;
    const { mode } = this.state;

    const additionalButtons = [
      <PauseScreenButton
        imgSrc={GamepadWhiteImage}
        buttonRef={ADDITIONAL_BUTTON_REFS[0]}
        label={Resources.getText(TEXT_IDS.VIEW_CONTROLS)}
        onHandlePad={(focusGrid, e) =>
          focusGrid.moveFocus(e.type, ADDITIONAL_BUTTON_REFS[0])
        }
        onClick={() => {
          this.setState({ mode: ModeEnum.CONTROLS });
        }}
      />,
    ];

    additionalButtons.push(
      <PauseScreenButton
        imgSrc={SettingsAppWhiteImage}
        buttonRef={ADDITIONAL_BUTTON_REFS[1]}
        label="Quake Settings"
        onHandlePad={(focusGrid, e) =>
          focusGrid.moveFocus(e.type, ADDITIONAL_BUTTON_REFS[1])
        }
        onClick={() => {
          this.setState({ mode: ModeEnum.QUAKE_SETTINGS });
        }}
      />,
    );

    const secondaryButtons = [];
    let secondaryRefIdx = 0;

    if (emulator.getCheatsService().getList().length > 0) {
      const cheatsRef = SECONDARY_BUTTON_REFS[secondaryRefIdx++];
      secondaryButtons.push(
        <PauseScreenButton
          key="cheats"
          imgSrc={BoltWhiteImage}
          buttonRef={cheatsRef}
          label="Cheats"
          onHandlePad={(focusGrid, e) =>
            focusGrid.moveFocus(e.type, cheatsRef)
          }
          onClick={() => {
            this.setState({ mode: ModeEnum.CHEATS });
          }}
        />
      );
    }

    if (achievements.isLoggedIn() && achievements.hasAchievements()) {
      const achievementsRef = SECONDARY_BUTTON_REFS[secondaryRefIdx++];
      secondaryButtons.push(
        <PauseScreenButton
          key="achievements"
          imgSrc={EmojiEventsWhiteImage}
          buttonRef={achievementsRef}
          label="Achievements"
          onHandlePad={(focusGrid, e) =>
            focusGrid.moveFocus(e.type, achievementsRef)
          }
          onClick={() => {
            this.setState({ mode: ModeEnum.ACHIEVEMENTS });
          }}
        />
      );
    }

    const usedSecondaryRefs = SECONDARY_BUTTON_REFS.slice(0, secondaryRefIdx);

    const gamepad = <GamepadControlsTab />;
    const keyboard = <KeyboardControlsTab />;
    const gamepadLabel = Resources.getText(TEXT_IDS.GAMEPAD_CONTROLS);
    const keyboardLabel = Resources.getText(TEXT_IDS.KEYBOARD_CONTROLS);

    return (
      <>
        {mode === ModeEnum.PAUSE ? (
          <CustomPauseScreen
            appProps={appProps}
            closeCallback={closeCallback}
            exitCallback={exitCallback}
            isEditor={isEditor}
            isStandalone={isStandalone}
            additionalButtonRefs={ADDITIONAL_BUTTON_REFS}
            additionalButtons={additionalButtons}
            secondaryButtonRefs={usedSecondaryRefs}
            secondaryButtons={secondaryButtons}
          />
        ) : null}
        {mode === ModeEnum.CONTROLS ? (
          <EditorScreen
            onClose={closeCallback}
            tabs={[
              {
                image: GamepadWhiteImage,
                label: gamepadLabel,
                content: gamepad,
              },
              {
                image: KeyboardWhiteImage,
                label: keyboardLabel,
                content: keyboard,
              },
            ]}
          />
        ) : null}

        {mode === ModeEnum.QUAKE_SETTINGS ? (
          <QuakeSettingsEditor emulator={emulator} onClose={closeCallback} />
        ) : null}
        {mode === ModeEnum.CHEATS ? (
          <CheatsSettingsEditor
            emulator={emulator}
            onClose={closeCallback}
          />
        ) : null}
        {mode === ModeEnum.ACHIEVEMENTS ? (
          <AchievementsScreen
            onClose={closeCallback}
          />
        ) : null}
      </>
    );
  }
}
