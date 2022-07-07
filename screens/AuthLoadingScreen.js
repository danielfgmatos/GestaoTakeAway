import React from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator,
	AsyncStorage
} from 'react-native';

class AuthLoadingScreen extends React.Component {
	// constructor() {
	//     super();
	//     this.checkToken();
	// }

	/*      logoutFunction = async () => {

        fetch(
          "http://192.168.1.113/grupo4-pws/web/user-management/auth/logout",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              },
          })
          .then((response) => {
            AsyncStorage.removeItem("token");
            AsyncStorage.removeItem("role");
            props.navigation.navigate("Auth");
          })
          .catch((error) => {
            console.log(error)
          }
        );
    }
 */
	// checkToken = async () => {
	//     const token = await AsyncStorage.getItem("token");
	//     const role = await AsyncStorage.getItem("role");
	//     if(token){
	//         if(role){
	//             this.props.navigation.navigate(role);
	//             console.log(role);
	//         }
	//     }
	//     else{
	//         this.props.navigation.navigate("Auth")
	//     }
	// }

	render() {
		//this.logoutFunction();
		return (
			<View>
				<ActivityIndicator />
			</View>
		);
	}
}

export default AuthLoadingScreen;
