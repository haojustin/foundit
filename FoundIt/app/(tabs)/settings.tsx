import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import {Slider} from '@miblanchard/react-native-slider';
import React from 'react';

//class SliderExample extends React.Component
//{
	state = {
		value: 5,
	};

	export default function Settings() {
		const [sliderState, setSliderState] = React.useState<number>(5);
		return (
			<View style={styles.container}>
				<View style={styles.setting}>
					<View style={styles.settingLabel}>
						<Text>Search radius: {sliderState} mi</Text>
					</View>
					<View style={styles.settingComponent}>
						<Slider
							minimumValue = {5}
							value = {sliderState}
							step = {5}
							maximumValue = {50}
							onValueChange={value => setSliderState(value)}
						/>
					</View>
				</View>
			</View>
		);
	}
//} 
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		margin: 10
	},
	settingComponent: {
		margin: 0,
		flex: 3
	},
	settingLabel: {
		margin: 0,
		flex: 2
	},
	setting: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
	}
});
