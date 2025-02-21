import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import Toast from "react-native-toast-message";
import Admin from "./admin/admin";
import AddCategory from "./admin/AddCategory";
import CategoryList from "./admin/CategoryList";
import UserList from "./admin/UserList";
import ProductList from "./admin/ProductList";
import AddProduct from "./admin/AddProduct";
import VegetablePage from "./vegtablepage";
import FruitsPage from "./fruitspage";
import PulsesPage from "./pulses";
import MilletsPage from "./milletspage";
import AddressScreen from "./address";
import Billing from "./billing";


function Launcher() {
    var Stack=createNativeStackNavigator()
    return ( <><NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="admin" component={Admin}/>
        <Stack.Screen name="addCategory" component={AddCategory}/>
        <Stack.Screen name="categoryList" component={CategoryList}/>
        <Stack.Screen name="productList" component={ProductList}/>
        <Stack.Screen name="addProduct" component={AddProduct}/>
        <Stack.Screen name="userList" component={UserList}/>
        <Stack.Screen name="register" component={Register}/>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="VegetablePage" component={VegetablePage} options={{title:'Vegetables'}}/>
        <Stack.Screen name="FruitsPage" component={FruitsPage} options={{title:'Fruits'}}/>
        <Stack.Screen name="PulsesPage" component={PulsesPage} options={{title:'Pulses'}}/>
        <Stack.Screen name="MilletsPage" component={MilletsPage} options={{title:'Milltes'}}/>
        <Stack.Screen name="address" component={AddressScreen}/>
        <Stack.Screen name="billing" component={Billing}/>
        </Stack.Navigator> 
    </NavigationContainer>
    <Toast />
    </> );
}

export default Launcher;