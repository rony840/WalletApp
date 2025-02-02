import {View,Text,StyleSheet, TextInput} from 'react-native';

const FormField = props => {
    const {title,onChange,placeholder,value1,error} = props;
    return(
        <View style={styles.container}>
            <View style={styles.txtCont}>
                <Text style={{...styles.frmLabel}}>{title||"Enter a Label"}</Text>
                <Text style={{...styles.frmErr}}>{error}</Text>
            </View>
            
            <TextInput
              value={value1}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={onChange}
              placeholder={placeholder||"Enter your placeholder"}
              placeholderTextColor="#d9d8d7"
              secureTextEntry={false}
              style={{...styles.txtInput}}
               />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        borderRadius:20,
        padding:10,
        height: 85,
        marginBottom: 20,
        marginLeft:'5%',
        marginRight:'5%',

    },
    txtCont:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    frmLabel:{
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        marginLeft: 15,
    },
    txtInput:{
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 20,
        fontWeight: '800',
        color: '#222',
        borderColor: '#C9D3DB',
        borderStyle: 'solid',
        placeholderTextColor: 'white',
    },
    frmErr:{
        fontSize: 14,
        fontWeight: '400',
        color: 'red',
        marginLeft: 10,
    },
});

export default FormField;