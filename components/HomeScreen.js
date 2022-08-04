import React, { useEffect, useState } from "react";
import { View,Text, StyleSheet,TextInput, TouchableOpacity, Keyboard, ActivityIndicator,FlatList, SafeAreaView,Image } from "react-native";

const HomeScreen=(navigation)=>{
    const [recipes, setRecipes]=useState();
    const [searchQuery, setSearchQuery]=useState('');
    const [numberOfRecipes, setNumberOfRecipes]=('1');
    const [loading, setLoading]=useState(false);
    const apiId = `f0cdb5bb`
    const apiKey = `b9b064a3c845d99c4021a78498a63da3`;
    const apiUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${apiId}&app_key=${apiKey}from=1&to=${numberOfRecipes}&calories=591-722&health=alcohol-free`;

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
        setLoading(true)
        callApi()
    },[])
    return(
      <View style={styles.container}>
        <Text style={{fontSize:23,fontWeight:'800', width:'90' ,color:'#008080'}}>
            What Would You Like To Cook Today?!!
        </Text>
        <View>
            <TextInput placeholder='Search Recipe...'
            style={[styles.inputField,]}
            onChangeText={text=>setSearchQuery(text)}
            />
            <TextInput
            style={[styles.inputField,{ width:'20' , fontSize:18,
        color:'#008080',fontWeight:'bold'}]}
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
        <SafeAreaView style={{flex:1}}>
            {loading ? <ActivityIndicator size='large' color='#008080'/>:
            <FlatList
            style={styles.recipes}
            data={recipes}
            renderItem={({item})=>(
                <View style={styles.recipe}>
                    <Image style={styles.image}
                    source={{uri:`${item.recipe.image}`}}/>
                    <View style={{padding:20, flexDirection:'row'}}>
                        <Text style={styles.lable}>{item.recipe.lable}</Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Details',{recipe:item.recipe})}}>
                            <Text style={{marginLeft:50,fontSize:20, color:'#008080'}}>
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
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,   
    },
    inputField:{
        height:'120%',
        width:'60%',
        backgroundColor:'white',
        borderRadius:20,
        marginTop:10,
        paddingLeft:15
    },
    buttons:{
        flexDirection:'row'
    },
    button:{
        backgroundColor:'#008080',
        width:'90%',
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
        width:'60',
        color:'#008080',
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

export default HomeScreen;
