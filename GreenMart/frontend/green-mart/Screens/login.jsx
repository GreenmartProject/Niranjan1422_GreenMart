import { useState } from "react";
import { Dimensions, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, View, Alert } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window"); // Get screen dimensions

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const API_URL = "http://localhost:7777"; // Replace with actual backend URL

    const showToast = (type, title, message) => {
        Toast.show({
            type: type, // 'success' | 'error' | 'info'
            text1: title,
            text2: message,
        });
    };    
    
    const handleLogin = async () => {
        if (!email || !password) {
            showToast("error", "Error", "Please enter email and password");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });
    
            const data = await response.json();
            console.log("🔹 API Response:", data);

            if (data.status === "success") {
                showToast("success", "Success", "Login Successful");
    
                setTimeout(() => {
                    if (data.data.user.Role === "admin") {
                        props.navigation.navigate("admin"); // Redirect to Admin Panel
                    } else {
                        props.navigation.navigate("home"); // Redirect to User Home
                    }
                }, 1000);
            } else {
                showToast("error", "Error", data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            showToast("error", "Error", "Something went wrong. Try again later.");
            console.error(error);
        }
    };
    
    

    const handleRegister = () => {
        props.navigation.navigate("register");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Card style={styles.card}>
                    <Text style={styles.title}>Green Mart</Text>

                    <TextInput 
                        label="Email"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <TextInput
                        label="Password"
                        mode="outlined"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={secureTextEntry}
                        style={styles.input}
                        right={
                            <TextInput.Icon
                                icon={secureTextEntry ? "eye-off" : "eye"}
                                onPress={() => setSecureTextEntry(!secureTextEntry)}
                            />
                        }
                    />

                    <Button onPress={handleLogin} mode="contained" buttonColor="green" textColor="white" style={styles.button}>
                        Login
                    </Button>
                    
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "green", textAlign: "center", marginTop: 10 }}> Don't have an account? </Text>
                        <Button onPress={handleRegister} mode="text" textColor="green" style={styles.registerButton}>
                            Register Here
                        </Button>
                    </View>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    card: {
        width: width * 0.9, // 90% of screen width
        padding: 20,
        borderRadius: 10,
    },
    title: {
        textAlign: "center",
        fontSize: width * 0.05, // Adjusts based on screen width
        fontWeight: "bold",
        color: "green",
        marginBottom: 15,
    },
    input: {
        marginVertical: 10,
        width: "100%", // Full width inside the card
    },
    button: {
        alignSelf: "center",
        marginTop: 15,
        paddingVertical: 5,
        paddingHorizontal: 50
    },
    registerButton: {
        marginTop: 10,
    },
});

export default Login;
