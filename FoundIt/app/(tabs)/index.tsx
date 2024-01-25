import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.Found}>Found</Text>
      <Text style={styles.It}>It</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  Found: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Palatino',
    marginLeft: 10,
    marginTop: 10,
    color: 'cyan',
  },
  It: {
    fontSize:25,
    fontWeight: 'bold',
    fontFamily: 'Palatino',
    marginLeft: 10,
    marginTop: 10,
    color: 'yellow',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  block:{
    width: 100,  // Width of the block
    height: 100, // Height of the block
    backgroundColor: 'pink',
  }
});
