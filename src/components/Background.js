import {View, StyleSheet} from 'react-native';

const Background = props => {
    const {style2} = props;
    return(
        <View style={styles.outer}>
            <View style={styles.inner1}/>
            <View style={{...styles.inner2,...style2}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    outer:{
        flex:1,
        backgroundColor:'black', 
    },
    inner1:{
        flex:1,
        backgroundColor:'#00000000',
        borderTopLeftRadius: 0,
    },
    inner2:{
        flex:2,
        backgroundColor:'#f7f7f7',
        borderTopLeftRadius: 75,
    },

});

export default Background;