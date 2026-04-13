import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { evaluate } from 'mathjs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: '#F0FFC2',
    height: 150,
    justifyContent: 'center',
  },

  expression: {
    fontSize: 24,
    color: '#555',
    textAlign: 'right',
  },

  result: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'right',
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
    backgroundColor: '#F0FFC2',
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
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleAC = () => {
    setExpression('');
    setResult('0');
    setIsEvaluated(false);
  };

  const handleClear = () => {
    setExpression((prev) => prev.slice(0, -1));
    setIsEvaluated(false);
  };

  const handleCalculate = () => {
    if (expression.trim() === '') {
      setResult('0');
      return;
    }

    try {
      const evalResult = evaluate(expression);
      
      if (evalResult === Infinity || evalResult === -Infinity) {
        setResult('Error');
      } else if (isNaN(evalResult)) {
        setResult('Error');
      } else {
        setResult(String(evalResult));
        setIsEvaluated(true);
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const handleInput = (value: string) => {
    const isOperator = ['+', '-', '*', '/'].includes(value);

    if (isEvaluated) {
      if (isOperator) {
        setExpression(result !== 'Error' ? result + value : value);
      } else {
        setExpression(value);
      }
      setIsEvaluated(false);
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const handlePress = (value: string) => {
    switch (value) {
      case 'AC':
        handleAC();
        break;
      case 'C':
        handleClear();
        break;
      case '=':
        handleCalculate();
        break;
      default:
        handleInput(value);
        break;
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Calculator</Text>
      </View>

      <View style={styles.display}>
        <Text style={styles.expression} numberOfLines={1} ellipsizeMode="head">
          {expression || ' '}
        </Text>
        <Text style={styles.result} numberOfLines={1} ellipsizeMode="tail">
          {result}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((value) => (
              <Pressable
                key={value}
                style={[
                  styles.button,
                  (value === 'AC' || value === 'C') && { backgroundColor: '#FF8A8A' },
                  (value === '/' || value === '*' || value === '-' || value === '+' || value === '=') && { backgroundColor: '#B8C1EC' },
                ]}
                onPress={() => handlePress(value)}>
                <Text style={styles.buttonText}>{value}</Text>
              </Pressable>
            ))}

            {rowIndex === buttons.length - 1 && (
              <>
                <View style={{ flex: 1, margin: 5 }} />
                <View style={{ flex: 1, margin: 5 }} />
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Calculator;

