import React from 'react';

import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

import BasePage from '../BasePage';

import PropTypes from "prop-types";

import { RNCamera } from 'react-native-camera';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

export default class ScanPage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RNCamera
        ref={ref => this.camera = ref}
        style={styles.container}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.auto}
        // zoom={0.5}
        // focusDepth={0.5}
        // barCodeTypes={[RNCamera.Constants.BarCodeType.qr]} //指定Bar的类型，二维码、条形码之类的
        onBarCodeRead={this._onBarCodeRead}
        onCameraReady={() => {

        }}
        onMountError={() => {

        }}
        onTextRecognized={() => {
          return 12312
        }}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}>
        <View style={{ flex: 1, width: Const.SCREEN_WIDTH, height: Const.SCREEN_HEIGHT - getSize(80) }}>
          <View style={{ position: 'absolute', top: 0, left: 0, width: Const.SCREEN_WIDTH, height: getSize(180), backgroundColor: '#000000', opacity: 0.3 }} />
          <View style={{ position: 'absolute', bottom: 0, left: 0, width: Const.SCREEN_WIDTH, height: getSize(130), backgroundColor: '#000000', opacity: 0.3 }} />
          <View style={{ position: 'absolute', top: getSize(180), left: 0, width: getSize(60), height: Const.SCREEN_HEIGHT - getSize(390), backgroundColor: '#000000', opacity: 0.3 }} />
          <View style={{ position: 'absolute', top: getSize(180), right: 0, width: getSize(60), height: Const.SCREEN_HEIGHT - getSize(390), backgroundColor: '#000000', opacity: 0.3 }} />
        </View>
        <View style={{ backgroundColor: '#000000', width: Const.SCREEN_WIDTH, height: getSize(80), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{ fontSize: 14 }}> 扫码 </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ position: 'absolute', top: Const.STATUSBAR_HEIGHT, width: Const.SCREEN_WIDTH, height: Const.NAVBAR_HEIGHT, paddingHorizontal: getSize(10), minWidth: getSize(44), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} activeOpacity={1} onPress={() => this.pop()}>
          <SvgUri width={getSize(24)} height={getSize(24)} source={'icon_nav_bar_back'} fill={'#ffffff'} />
        </TouchableOpacity>
      </RNCamera>
    )
  }

  _onBarCodeRead = obj => {
    const { data, bounds} = obj;
    let size = bounds.size;
    let origin = bounds.origin;
    if (origin.x >= getSize(60) && origin.y >= getSize(180) && size.width <= getSize(255) && size.height <= Const.SCREEN_HEIGHT - getSize(390)) {
      this.showToast(data);
    }
  }

  takePicture = async function () {
    // if (this.camera) {
    //   const options = { quality: 0.5, base64: true };
    //   const data = await this.camera.takePictureAsync(options)
    //   console.log(data.uri);
    // }
  };

}

const SimpleNavBar = (props) => {
  const { onPress } = props;
  return (
    <View style={{ width: Const.SCREEN_WIDTH, height: Const.STATUSBAR_HEIGHT + Const.NAVBAR_HEIGHT, backgroundColor: '#000000', opacity: 0.2 }}>
      <TouchableOpacity style={{ marginTop: Const.STATUSBAR_HEIGHT, paddingHorizontal: getSize(10), minWidth: getSize(44) }} activeOpacity={1} onPress={onPress}>
        <SvgUri width={getSize(24)} height={getSize(24)} source={'icon_nav_bar_back'} fill={'#ffffff'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Const.SCREEN_WIDTH,
    height: Const.SCREEN_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#000000'
  },
  preview: {
    flex: 1,

  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
  }
});

// const styles = StyleSheet.create({
//   container: {
//     width: Const.SCREEN_WIDTH,
//     height: Const.SCREEN_HEIGHT,
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: '#000000'
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     backgroundColor: 'red'
//   },
//   capture: {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//   }
// });