import React from "react";
import { ScrollView, Text, StyleSheet,View ,Image} from "react-native";



const Details=({route})=>{
    const {recipe} = route.params;

    return(
      <ScrollView>
        <View style={styles.details}>
        <View styel={styles.image}>
                <Image style={styles.image}
                source={{uri:`${recipe.image}`}}/>
            
        <View>
            <Text style={styles.sizes}>{`${recipe.label}`}</Text>
        </View>
        </View>
        <View style={styles.item}>
            <Text style={styles.sizes}>
                Ingredients:
            </Text>
            <Text style={styles.ingredients}>{`${recipe.ingredients.map((item)=>item['food'])}`}</Text>
        </View>

        <View style={styles.item}>
            <Text style={styles.sizes}>
                Food category:
            </Text>
            <Text style={styles.ingredients}>{`${recipe.ingredients.map((item)=>item['foodCategory'])}`}</Text>
        </View>

        <View style={styles.item}>
            <Text style={styles.sizes}>
                Calories:
            </Text>
            <Text style={styles.ingredients}>{`${recipe.calories}`}</Text>
        </View>

        
        <View style={styles.item}>
            <Text style={styles.sizes}>
                Meal Type:
            </Text>
            <Text style={styles.ingredients}>{`${recipe.mealType}`}</Text>
        </View>

        <View style={styles.item}>
            <Text style={styles.sizes}>
                Description:
            </Text>
            <Text style={styles.ingredients}>{`${recipe.ingredientLines}`}</Text>
        </View>

        <View style={styles.item}>
            <Text style={styles.sizes}>
               Diet Lable:
            </Text>
            <Text style={styles.ingredients}>{`${recipe.dietLabels}`}</Text>
        </View>

        <View style={styles.item}>
            <Text style={styles.sizes}>
                Cuisine Type:
            </Text>
            <Text style={styles.ingredients}>{`${recipe.cuisineType}`}</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.sizes}>
                Dish Type:
            </Text>
            <Text style={styles.ingredients}>{`${recipe.dishType}`}</Text>
        </View>
        </View>
      </ScrollView>
    )
}
export default Details;
const styles=StyleSheet.create({
    details:{
        marginBottom:30,
        padding:5
    },
    image:{
        width:'100%',
        height:300,
        borderRadius:20
    },
    sizes:{
        fontSize:22,
         color:'#40e0d0',
         fontWeight:'800'
    },
    ingredients:{
        fontSize:22,
        color:'grey',

    },
    item:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0 ,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:20,
        backgroundColor:'white',
        margin:10,
        padding:10,
        flexDirection:'row',
        flexWrap:'wrap'
    }
})