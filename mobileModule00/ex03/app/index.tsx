import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#546B41',
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  display: {
    padding: 20,
    alignItems: 'flex-end',
	backgroundColor: '#F0FFC2'
  },

  expression: {
    fontSize: 24,
    color: '#555',
  },

  result: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },

  buttonContainer: {
    flex: 1,
    padding: 10,
	margin: 10,
	backgroundColor: '#F0FFC2'
  },

  row: {
    flexDirection: 'row',
    flex: 1,
  },

  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#EAE6BC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 22,
  },
});


const buttons = [
  ['AC', 'C', '/', '*'],
  ['7', '8', '9', '-'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '='],
  ['0', '.'],
];

const Calculator = () => {

	const [expression, setExpression] = useState('');
	const [result, setResult] = useState('0');

  const handlePress = (value: string) => {
    console.log("Pressed:", value);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Calculator</Text>
      </View>

      <View style={styles.display}>
        <Text style={styles.expression}>0</Text>
        <Text style={styles.result}>0</Text>
      </View>

      <View style={styles.separator} />



      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value) => (
              <Pressable
                key={value}
                style={styles.button}
                onPress={() => handlePress(value)}>
                <Text style={styles.buttonText}>{value}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>

    </View>
  );
};

export default Calculator;
