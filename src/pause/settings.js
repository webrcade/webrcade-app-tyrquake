import React from 'react';
import { Component } from 'react';

import {
  EditorScreen,
  FieldsTab,
  FieldRow,
  FieldLabel,
  FieldControl,
  TelevisionWhiteImage,
  Switch,
  WebrcadeContext,
} from '@webrcade/app-common';

export class QuakeSettingsEditor extends Component {
  constructor() {
    super();
    this.state = {
      tabIndex: null,
      focusGridComps: null,
      values: {},
    };
  }

  componentDidMount() {
    const { emulator } = this.props;

    this.setState({
      values: {
        origBilinearMode: emulator.getPrefs().isBilinearEnabled(),
        bilinearMode: emulator.getPrefs().isBilinearEnabled(),
      },
    });
  }

  render() {
    const { emulator, onClose } = this.props;
    const { tabIndex, values, focusGridComps } = this.state;

    const setFocusGridComps = (comps) => {
      this.setState({ focusGridComps: comps });
    };

    const setValues = (values) => {
      this.setState({ values: values });
    };

    return (
      <EditorScreen
        showCancel={true}
        onOk={() => {
          // emulator.setAnalogMode(values.analogMode ? 1 : 0);
          // emulator.setSwapControllers(values.swapControllers);
          if (values.origBilinearMode !== values.bilinearMode) {
            emulator.getPrefs().setBilinearEnabled(values.bilinearMode);
            emulator.updateBilinearFilter();
            emulator.getPrefs().save();
          }
          onClose();
        }}
        onClose={onClose}
        focusGridComps={focusGridComps}
        onTabChange={(oldTab, newTab) => this.setState({ tabIndex: newTab })}
        tabs={[
          // {
          //   image: GamepadWhiteImage,
          //   label: 'Controller Settings (Session only)',
          //   content: (
          //     <GenPlusGxSettingsTab
          //       emulator={emulator}
          //       isActive={tabIndex === 0}
          //       setFocusGridComps={setFocusGridComps}
          //       values={values}
          //       setValues={setValues}
          //     />
          //   ),
          // },
          {
            image: TelevisionWhiteImage,
            label: 'Display Settings',
            content: (
              <PceDisplaySettingsTab
                emulator={emulator}
                isActive={tabIndex === 0}
                setFocusGridComps={setFocusGridComps}
                values={values}
                setValues={setValues}
              />
            ),
          },
        ]}
      />
    );
  }
}

// class GenPlusGxSettingsTab extends FieldsTab {
//   constructor() {
//     super();
//     this.analogModeRef = React.createRef();
//     this.swapControllersRef = React.createRef();
//     this.gridComps = [[this.analogModeRef], [this.swapControllersRef]];
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { gridComps } = this;
//     const { setFocusGridComps } = this.props;
//     const { isActive } = this.props;

//     if (isActive && isActive !== prevProps.isActive) {
//       setFocusGridComps(gridComps);
//     }
//   }

//   render() {
//     const { analogModeRef, swapControllersRef } = this;
//     const { focusGrid } = this.context;
//     const { setValues, values } = this.props;

//     return (
//       <>
//         <FieldRow>
//           <FieldLabel>Analog mode</FieldLabel>
//           <FieldControl>
//             <Switch
//               ref={analogModeRef}
//               onPad={(e) => focusGrid.moveFocus(e.type, analogModeRef)}
//               onChange={(e) => {
//                 setValues({ ...values, ...{ analogMode: e.target.checked } });
//               }}
//               checked={values.analogMode}
//             />
//           </FieldControl>
//         </FieldRow>
//         <FieldRow>
//           <FieldLabel>Swap controllers (1 and 2)</FieldLabel>
//           <FieldControl>
//             <Switch
//               ref={swapControllersRef}
//               onPad={(e) => focusGrid.moveFocus(e.type, swapControllersRef)}
//               onChange={(e) => {
//                 setValues({
//                   ...values,
//                   ...{ swapControllers: e.target.checked },
//                 });
//               }}
//               checked={values.swapControllers}
//             />
//           </FieldControl>
//         </FieldRow>
//       </>
//     );
//   }
// }
// GenPlusGxSettingsTab.contextType = WebrcadeContext;

class PceDisplaySettingsTab extends FieldsTab {
  constructor() {
    super();
    this.bilinearRef = React.createRef();
    this.gridComps = [[this.bilinearRef]];
  }

  componentDidUpdate(prevProps, prevState) {
    const { gridComps } = this;
    const { setFocusGridComps } = this.props;
    const { isActive } = this.props;

    if (isActive && isActive !== prevProps.isActive) {
      setFocusGridComps(gridComps);
    }
  }

  render() {
    const { bilinearRef } = this;
    const { focusGrid } = this.context;
    const { setValues, values } = this.props;

    return (
      <>
        <FieldRow>
          <FieldLabel>Force bilinear filter</FieldLabel>
          <FieldControl>
            <Switch
              ref={bilinearRef}
              onPad={(e) => focusGrid.moveFocus(e.type, bilinearRef)}
              onChange={(e) => {
                setValues({ ...values, ...{ bilinearMode: e.target.checked } });
              }}
              checked={values.bilinearMode}
            />
          </FieldControl>
        </FieldRow>
      </>
    );
  }
}
PceDisplaySettingsTab.contextType = WebrcadeContext;
