import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Colors from '../Theme/Colors';

const Separator = () => <View style={styles.separator} />;

const CustomButton = ({
  onPress,
  color,
  textColor,
  text,
  spinnerColro,
  isLoading,
  borderColor,
  disabled,
  height = 48,
  icon,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.Button,
        {
          backgroundColor: color,
          borderColor: borderColor ? borderColor : color,
          height: 48,
        },
      ]}>
      <Text style={styles.Text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    fontSize: 20,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    width: 350,
    elevation: 5,
    shadowRadius: 10,
    shadowOpacity: 1,
    fontWeight: '600',
  },
  Text: {
    fontSize: 20,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'workSans-SemiBold',
  },
});

export default CustomButton;
