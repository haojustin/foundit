import { StyleSheet } from 'react-native';
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

	return (
		<View style={styles.container}>
			{/* Search radius */}
			<View style={styles.setting}>
				<View style={styles.settingLabel}>
					<Text style={styles.text}>Search radius: {searchSliderState} mi</Text>
				</View>
				<View style={styles.settingComponent}>
					<Slider
						minimumValue = {5}
						value = {searchSliderState}
						step = {5}
						maximumValue = {50}
						onValueChange = {value => setSearchSliderState(value)}
						maximumTrackTintColor = {colors.lightGray}
						minimumTrackTintColor = {colors.darkGray}
						thumbTintColor = {colors.darkGray}
					/>
				</View>
			</View>

			{/* Notification method */}
			<View style={styles.setting}>
				<View style={styles.settingLabel}>
					<Text style={styles.text}>Notifications:</Text>
				</View>
				<View style={styles.settingComponent} testID="dropdown">
					<DropDownPicker 
						style = {styles.dropdown} 
						labelStyle = {styles.text}
						dropDownContainerStyle={styles.dropdown}
						listItemLabelStyle={styles.text}

						arrowIconStyle={{tintColor: colors.lightGray}}
						tickIconStyle={{tintColor: colors.lightGray}}
												
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
		margin: 10
	},
	settingComponent: {
		margin: 0,
		flex: 1,
	},
	settingLabel: {
		margin: 0,
		flex: 1
	},
	setting: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
	},
	dropdown: {
		backgroundColor: colors.darkGray
	},
	text: {
		fontSize: 15,
		color: colors.lightGray,
	}
});
