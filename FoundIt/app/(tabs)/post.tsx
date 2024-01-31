import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';

export default function Post() {
	return (
		<View style={styles.container}>
			
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
	}
});
