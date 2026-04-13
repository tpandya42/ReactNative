import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Alert, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#B5E18B",
		alignItems: 'center',
		justifyContent: 'center',
		
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		marginBottom: 10
	},
	button: {
		backgroundColor: "#28396C",
		padding: 10,
		borderRadius: 8,
	},
	buttonText: {
		color: "#EAE6BC",
		fontWeight: 'bold'
	}
});

const Home = () => {
	const initialText = "Hello World!";
	const [text, setText] = useState(initialText);

	const handlePress = () => {
		if (text === initialText){
			setText("My drunk talks will get me arrested pretty soon");
		}
		else {
			setText(initialText);
		}
		console.log("Hello World!");
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{text}</Text>

			<TouchableOpacity style={styles.button}
				onPress={() => handlePress()}>

				<Text style = {styles.buttonText}>Try to Press Me</Text>
			</TouchableOpacity>

		</View>
	)
}

export default Home;

