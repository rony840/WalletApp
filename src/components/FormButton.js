import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const FormButton = props =>{
    const {btStyle,title,btTxt,onPress} = props;
    return(
        <TouchableOpacity
            onPress={onPress}>
            <View style={{...styles.btn,...btStyle}}>
            <Text style={{...styles.btnText,...btTxt}}>{title||"Button Name"}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        flexDirection:'row',
        justifyContent: 'center',
        height:50,
        marginTop:'3%',
        marginLeft:'5%',
        marginRight:'5%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'black',
        marginBottom: 20
    },
    btnText: {
        fontSize: 16,
        fontWeight: '600',
        alignSelf:'center',
        color: '#fff',
    },
});

export default FormButton;