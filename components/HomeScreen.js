import React, { useEffect, useState } from "react";
import { View,Text, StyleSheet,TextInput, TouchableOpacity, Keyboard, ActivityIndicator,FlatList, SafeAreaView,Image } from "react-native";


const HomeScreen=({navigation})=>{
    const [recipes, setRecipes]=useState();
    const [searchQuery, setSearchQuery]=useState('');
    const [numberOfRecipes, setNumberOfRecipes]=useState('5');
    const [loading, setLoading]=useState(false);
    const apiId = 'bb8681be'
    const apiKey = `68604c75c32e9d741e1e6a880e3d0866`;
    const apiUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${apiId}&app_key=${apiKey}&to=${numberOfRecipes}&calories=591-722&health=alcohol-free`;

    async function callApi(){
        setLoading(true);
        let response = await fetch(apiUrl);
        let responseJson = await response.json();
        setRecipes(responseJson.hits);
        setLoading(false)
        Keyboard.dismiss()
        setSearchQuery('')
    }
    useEffect(()=>{
        setLoading(false)
        callApi()
    },[])
//    const vieDtails=({navigation})=>{
//     navigation.navigate('Details')
//    }
    return(
      <View style={styles.container}>
        <Text style={styles.whatToCook}>
            What Would You Like To Cook Today?!!
        </Text>
        <View style={styles.seconsView}>
            <TextInput placeholder='Search Recipe...'
            style={[styles.inputField]}
            onChangeText={text=>setSearchQuery(text)}
            />
            <TextInput
            style={[styles.inputField1]}
        value={numberOfRecipes}
        keyboardType='number-pad'
            onChangeText={text=>setNumberOfRecipes(text)}
            />
        </View>
        <TouchableOpacity
        style={styles.button}
        onPress={callApi} 
        title='submit'
        >
            <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <SafeAreaView style={styles.safe}>
            {loading ? <ActivityIndicator style={styles.active}/>:
            <FlatList
            data={recipes}
            renderItem={({item})=>(
                <View style={styles.recipe}>
                    <Image style={styles.image}
                    source={{uri:`${item.recipe.image}`}}/>
                    <View style={styles.view4}>
                        <Text style={styles.lable}>{`${item.recipe.label}`}</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Details',{recipe:item.recipe})}}>
                            <Text style={styles.detailss}>
                                Details
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            keyExtractor={(item,index)=>index.toString()}/>}
        </SafeAreaView>
      </View>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,   
    },
    whatToCook:{
        fontSize:23,
        fontWeight:'800', 
        width:'90' ,
        color:'#40e0d0'
    },
    active:{
        size:'large',
         color:'#40e0d0'
    },
    safe:{
        flex:1
    },
    detailss:{
        marginLeft:50,
        fontSize:20,
        color:'#40e0d0'
    },
    view4:{
        padding:20,
        flexDirection:'row'
    },
    seconsView:{
        display:'flex',
        flexDirection:'row'
    },
    inputField:{
        color:'#40e0d0',
        height:'100%',
        width:'65%',
        backgroundColor:'white',
        borderRadius:20,
        marginLeft:10,
        marginTop:10,
        paddingLeft:15
    },
    inputField1:{
        height:'100%',
        width:'20%' ,
         fontSize:18,
        color:'#40e0d0',
        fontWeight:'bold',
        backgroundColor:'white',
        borderRadius:20,
        marginTop:10,
        paddingLeft:15
    },
    buttons:{
        flexDirection:'row'
    },
    button:{
        backgroundColor:'#40e0d0',
        width:'80%',
        alignItems:'center',
        margin:15,
        height:35,
        borderRadius:15,
        justifyContent:'center',
        marginTop:25
    },
    buttonText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    },
    image:{
        width:'100%',
        height:200,
        borderRadius:20
    },
    lable:{
        fontSize:15,
        width:'60%',
        color:'#40e0d0',
        fontWeight:'700',
    },
    recipe:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0 ,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:20,
        backgroundColor:'white',
        margin:10,
        marginTop:40,
    }

})
