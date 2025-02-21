import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

function Register(props) {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Address, setAddress] = useState("");
    const [Phone, setPhone] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const API_URL = "http://localhost:7777"; 

    const showToast = (type, title, message) => {
        Toast.show({
            type: type, // 'success' | 'error' | 'info'
            text1: title,
            text2: message,
        });
    };

    const registerUser = async () => {
        if (!Name || !Email || !Password || !Address || !Phone) {
            showToast("error", "Error", "Fill all the Details!");
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({Name,Email,Password,Address,Phone}),
            });
    
            const data = await response.json();
    
            if (response.status === 400 && data.message.includes("User already exists")) {
                showToast("error", "Error", "User already exists! Please login.");
            } else if (response.status === 201 || data.status === "success") {
                showToast("success", "Success", "Register Successful");
                setTimeout(() => props.navigation.navigate("login"), 1000);
            } else {
                showToast("error", "Error", data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            showToast("error", "Error", "Something went wrong. Try again later.");
            console.error(error);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Register Here</Text>
                
                <TextInput 
                    label="Enter Name" 
                    mode="outlined"
                    style={styles.input}
                    value={Name}
                    onChangeText={setName}
                />
                <TextInput 
                    label="Enter Email" 
                    mode="outlined"
                    keyboardType="email-address"
                    style={styles.input}
                    value={Email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    label="Enter Password"
                    mode="outlined"
                    secureTextEntry={secureTextEntry}
                    right={<TextInput.Icon name="eye" onPress={() => setSecureTextEntry(!secureTextEntry)} />}
                    style={styles.input}
                    value={Password}
                    onChangeText={setPassword}
                />
                <TextInput 
                    label="Enter Address" 
                    mode="outlined"
                    style={styles.input}
                    value={Address}
                    onChangeText={setAddress}
                />
                <TextInput 
                    label="Mobile No" 
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.input}
                    value={Phone}
                    onChangeText={setPhone}
                />
                
                <Button 
                    onPress={registerUser} 
                    mode="contained"
                    buttonColor="green"
                    textColor="white"
                    style={styles.button}
                >
                    Register Me
                </Button>
            </View>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    box: {
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: "green"
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        width: '100%',
    }
});

export default Register;
