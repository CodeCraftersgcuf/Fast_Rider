import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { colors } from '../constants/colors';
import images from '../constants/images';

interface CodeInputProps {
  length: number;
  onCodeComplete: (code: string) => void;
  allowBackspace?: boolean; // ✅ optional
}

export const CodeInput: React.FC<CodeInputProps> = ({ length, onCodeComplete, allowBackspace = false }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(digit => digit !== '')) {
      onCodeComplete(newCode.join(''));
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (
      allowBackspace &&
      e.nativeEvent.key === 'Backspace' &&
      code[index] === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length).fill(0).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => {
            if (ref) inputRefs.current[index] = ref;
          }}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          value={code[index]}
          onChangeText={text => handleCodeChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)} // ✅ backspace support
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.white,
    textAlign: 'center',
    fontSize: 20,
    color: colors.text.primary,
  },
});
