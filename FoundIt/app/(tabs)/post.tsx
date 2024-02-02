import { Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, {useState} from 'react';

export default function Post() {
	const [title, setTitle] = React.useState('')
	const [lostFound, setLostFound] = React.useState('lost')

	return (
		<View style={styles.container}>
			<View style={styles.inputElement}>
				<TextInput
					style={styles.textInput}
					onChangeText={setTitle}
					value={title}
					placeholder="Title"
					placeholderTextColor={colors.darkGray}
					cursorColor={colors.lightGray}
				/>	
			</View>
			<View style={styles.inputElement}>
				<TouchableOpacity style={lostFound == 'lost' ? styles.lostFoundButtonSelected : styles.lostFoundButton} activeOpacity={0.5} onPress={() => setLostFound('lost')}>
					<Text>
						Lost
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={lostFound == 'found' ? styles.lostFoundButtonSelected : styles.lostFoundButton} activeOpacity={0.5} onPress={() => setLostFound('found')}>
					<Text>
						Found
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.inputElement}>
				<TouchableOpacity style={styles.picButton} activeOpacity={0.5}>
					<Text>
						(camera logo here) Add a picture
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.inputElement}>
				<TouchableOpacity style={styles.picButton} activeOpacity={0.5}>
					<Text>
						(location logo here) Where did you lose/find your item?
					</Text>
				</TouchableOpacity>
			</View>

		</View>
	);
}

const colors = {
	darkGray: '#3b3b3b',
	lightGray: '#cccccc',
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		margin: 10
	},
	text: {
		fontSize: 15,
		color: colors.lightGray,
	},
	inputElement: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: 'red',
		borderWidth: 0,
	},
	textInput: {
		backgroundColor: 'black',
		color: colors.lightGray,
		fontSize: 20,
		height: 50,
		flex: 1,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	lostFoundButton: {
		margin: 10,
		flex: 1,
		height: 30,
		backgroundColor: colors.darkGray,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: 'transparent',
		borderRadius: 5,
	},
	lostFoundButtonSelected: {
		margin: 10,
		flex: 1,
		height: 30,
		backgroundColor: colors.darkGray,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: colors.lightGray,
		borderRadius: 5,
	},
	picButton: {
		margin: 10,
		flex: 1,
		height: 30,
		backgroundColor: 'black',
		justifyContent: 'center',
	}
});
