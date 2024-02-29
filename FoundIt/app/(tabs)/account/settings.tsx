import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import {Slider} from '@miblanchard/react-native-slider';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Settings() {
	const [searchSliderState, setSearchSliderState] = React.useState<number>(5);
	const [notifOpen, setNotifOpen] = React.useState(false);
	const [notifValue, setNotifValue] = React.useState('push');
	const [notifItems, setNotifItems] = React.useState([
		{label: 'Push', value: 'push'},
		{label: 'Email', value: 'email'},
		{label: 'Off', value: 'off'}
	]);	
	const [usernameState, setUsernameState] = React.useState("Current username");

	return (
		<View style={[styles.container, styles.testBorder]}>
			{/* Change username */}
			<View style={[styles.changeNameWrapper, styles.testBorder]}>
				<View style={[styles.changeNameLabel, styles.testBorder]}>
					<Text style={styles.text}>Username:</Text>
				</View>
				<View style={[styles.testBorder, styles.changeNameInput]}>
					<TextInput
						style={styles.text}
						onChangeText={setUsernameState}
						value={usernameState}
						selectionColor={colors.lightGray}
					/>
				</View>
				<TouchableOpacity style={[styles.changeNameButton, styles.testBorder]}>
					<Text style={styles.text}>Change</Text>
				</TouchableOpacity>
			</View>
			{/* Search radius */}
			<View style={[styles.searchRadiusWrapper, styles.testBorder]}>
				<View style={[styles.searchRadiusLabel, styles.testBorder]}>
					<Text style={styles.text}>Search radius: {searchSliderState} mi</Text>
				</View>
				<View style={[styles.searchRadiusSlider, styles.testBorder]}>
					<Slider
						minimumValue = {5}
						value = {searchSliderState}
						step = {5}
						maximumValue = {50}
						onValueChange = {value => setSearchSliderState(value)}
						maximumTrackTintColor = {colors.lightGray}
						minimumTrackTintColor = {colors.darkGray}
						thumbTintColor = {colors.darkGray}
						itemSeparator = {true}
					/>
				</View>
			</View>
			{/* Notification method */}
			<View style={[styles.notifWrapper, styles.testBorder]}>
				<View style={styles.notifLabel}>
					<Text style={styles.text}>Notifications:</Text>
				</View>
				<View style={[styles.notifDropdownWrapper, styles.testBorder]} testID="dropdown">
					<DropDownPicker 
						style = {styles.notifDropdown} 
						labelStyle = {styles.text}
						dropDownContainerStyle={styles.notifDropdown}
						listItemLabelStyle={styles.text}

						arrowIconStyle={{tintColor: colors.darkGray}}
						tickIconStyle={{tintColor: colors.darkGray}}
												
						open={notifOpen}
						value={notifValue}
						items={notifItems}
						setOpen={setNotifOpen}
						setValue={setNotifValue}
					/>
				</View>
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
		padding: 10
	},
	text: {
		fontSize: 15,
		color: colors.darkGray,
	},
	testBorder: {
		borderWidth: 0,
		borderColor: 'red',
	},

	searchRadiusWrapper: {
		flexDirection: 'row',
		height: 50,
		margin: 10,
	},
	searchRadiusLabel: {
		flex: 1,
		justifyContent: 'center',
	},
	searchRadiusSlider:{
		flex: 1,
		justifyContent: 'center',
	},

	notifWrapper: {
		flexDirection: 'row',
		height: 50,
		margin: 10,
	},
	notifLabel: {
		flex: 1,
		justifyContent: 'center',
	},
	notifDropdownWrapper: {
		flex: 1,
		alignSelf: 'center',
	},
	notifDropdown: {
		backgroundColor: colors.lightGray,
		borderRadius: 20,
		minHeight: 40,
		borderWidth: 0,
	},

	changeNameWrapper: {
		flexDirection: 'row',
		height: 50,
		margin: 10,
		alignItems: 'center',
	},
	changeNameLabel: {
		justifyContent: 'center',
	},
	changeNameInput: {
		flex: 3,
		height: 20,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderColor: colors.lightGray,
		marginHorizontal: 10,
		marginTop: 4,
	},
	changeNameButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		color: colors.darkGray,
		backgroundColor: colors.lightGray,
		borderRadius: 20,
		height: 40,
	},
});
