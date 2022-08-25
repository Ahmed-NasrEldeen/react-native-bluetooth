import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  NativeModule,
} from 'react-native';

import {BleManager} from 'react-native-ble-plx';
const _BleManager = new BleManager();
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import RNBluetoothClassic, {
  BluetoothEventType,
} from 'react-native-bluetooth-classic';
import {ColorPicker} from 'react-native-color-picker';
import CustomButton from './src/components/CustomButton';
import Colors from './src/Theme/Colors';

const App = () => {
  const [BDevices, setBDecices] = useState([{name: 'tirto'}]);
  const [address, setAddress] = useState();
  const [color, steColor] = useState();
  const countries = [
    {
      id: '1',
      name: 'United States',
    },
    {
      id: '2',
      name: 'United Kingdom',
    },
    {
      id: '3',
      name: 'Israel',
    },
    {
      id: '4',
      name: 'India',
    },
    {
      id: '5',
      name: 'Nigeria',
    },
    {
      id: '6',
      name: 'Uganda',
    },
  ];
  const startScan = () => {
    console.log('started scaning ...');
    _BleManager.startDeviceScan(null, null, async (error, device) => {
      console.log('firted');
      if (error) {
        console.log('error', error);
        _BleManager.stopDeviceScan();
      }
      console.log(device?.localName, device?.name, device);
      if (device?.localName == 'Test' || device?.name == 'Test') {
        console.log('testing');
        _BleManager.stopDeviceScan();
      }
    });
  };
  const handleClick = async () => {
    console.log('hello world');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission Localisation Bluetooth',
        message: 'Requirement for Bluetooth',
        buttonNeutral: 'Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const bc = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN)
      .then((result) => {
        console.log(bc, result);
      })
      .catch((error) => {
        console.log(error);
      });
    RNBluetoothClassic._nativeModule.startDiscovery().then((res) => {
      console.log('b results');
      console.log(res);
      setBDecices(BDevices.concat(res));
    });
  };
  const Item = ({name, address}) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 10,
        }}>
        <Text style={{color: 'black', flex: 1, fontSize: 20}}>{name}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log(name, address);
            RNBluetoothClassic.connectToDevice(address).then((res) => {
              console.log('res', res);
              setAddress(address);
            });
          }}
          style={{
            flex: 1,
            backgroundColor: 'black',
            color: 'white',
            paddingVertical: 5,
            paddingHorizontal: 5,
            borderRadius: 5,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              textAlignVertical: 'center',
              fontSize: 20,
            }}>
            connect
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = ({item}) => (
    <Item name={item.name} address={item.address} />
  );
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{marginTop: 20, height: 50, backgroundColor: 'blue'}}
        onPress={handleClick}>
        <Text style={{fontSize: 20, alignSelf: 'center'}}>hello world</Text>
      </TouchableOpacity>
      <FlatList
        data={BDevices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        onPress={() => {
          RNBluetoothClassic.writeToDevice(address, color);
        }}
        style={{
          backgroundColor: 'black',
          color: 'white',
          paddingVertical: 5,
          paddingHorizontal: 5,
          borderRadius: 5,
          margin: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            textAlignVertical: 'center',
            fontSize: 20,
          }}>
          on
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          RNBluetoothClassic.writeToDevice(address, color);
        }}
        style={{
          backgroundColor: 'black',
          color: 'white',
          paddingVertical: 5,
          paddingHorizontal: 5,
          borderRadius: 5,
          margin: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            textAlignVertical: 'center',
            fontSize: 20,
          }}>
          off
        </Text>
      </TouchableOpacity>
      <ColorPicker
        onColorSelected={(color) => {
          alert(`Color selected: ${color}`);
          steColor(color);
        }}
        style={{height: 300}}
      />
      <View
        style={{
          justifyContent: 'center',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}>
        <CustomButton
          color={Colors.primary}
          text={'CONNECTING ...'}></CustomButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
