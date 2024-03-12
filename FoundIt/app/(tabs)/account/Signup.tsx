import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../../constants/Colors_1";
import { Feather } from "@expo/vector-icons";
import { auth, authdb } from "../../../constants/firebaseConfig";
import { Entypo } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link } from 'expo-router';
import { useUser } from '../../../constants/UserContext';
import { fetchUserData } from '../../../constants/authService';

const { width, height } = Dimensions.get("window");
let top;
if (Platform.OS === "ios") {
  top = height * 0.02;
} else {
  top = 0;
}

export default function Signup({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUser();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      await setDoc(doc(authdb, "users", user.uid), {
        Name: username,
        Email: email,
        PhoneNumber: phone,
        CreatedAt: new Date().toISOString(),
      });

      setUser({
        uid: user.uid,
        displayName: username,
        email: email,
      });

      setLoading(false);
      alert("Account for FoundIt created successfully");
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.error('Error during sign up:', err);
        alert('An error occurred during sign up.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginHeader}>
        <Text style={styles.loginHeaderText}>Sign up now for FoundIt</Text>
      </View>

      <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
        {/* Username */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Username</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your name"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        {/* Email */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Email</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        {/* Phone Number */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Phone Number</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your phone number"
            value={phone?.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        {/* Password */}
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordText}>Password</Text>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {/* Forgot Password */}

        {/* Login Button */}
        <View style={styles.loginButton}>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.loginButtonText}>
              {loading ? "Creating account..." : "Create Account"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupGroup}>
          <Text style={styles.new}>Already have an account?</Text>
          <Link href="/account/Login" asChild>
            <TouchableOpacity>
              <Text style={styles.signup}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: height * 0.01,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  loginHeader: {
    marginTop: 20,
  },
  loginHeaderText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  loginContainer: {
    marginTop: 20,
  },
  emailContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emailInput: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: Colors.light,
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 8,
    paddingLeft: 10,
  },
  passwordContainer: {
    marginTop: 20,
  },
  passwordText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordInput: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: Colors.light,
    borderRadius: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: Colors.light,
  },
  forgotContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  forgotText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  loginButton: {
    marginTop: 20,
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.white,
  },
  signupGroup: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  signup: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  new: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 5,
  },
});
