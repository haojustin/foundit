import { StyleSheet, Image, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React from 'react';

export default function TabOneScreen() {
  return (
        <View style={styles.profile}>
            <View>
              <Image style={styles.profileImage}
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png' }}/>
            </View>
          <Text style={styles.profileName} >John Smith</Text>
          <Text>UCSB Student</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profile: {
    padding: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
   
  },
  profileName: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  profileBio:{
    marginTop: 8,
    fontSize: 17,
    color: "#989898",
    textAlign: 'center',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 9999,
  },
});