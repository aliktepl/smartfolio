const coins = require('../models/coinsModel');
const {data} = require("express-session/session/cookie");

async function prepare_coin(data) {
    console.log("before prepare_coin:", data);

    // Ensure we're modifying the first element if data is an array
    const coin = await data[0]; // Access the first element if it's wrapped in an array

    if (coin.graph) {
        // Initialize an empty array to store the graph values
        const graphArray = [];

        // Loop through each key in the graph object
        for (let key in coin.graph) {
            if (coin.graph.hasOwnProperty(key)) {
                // Push the value of each property into the array
                graphArray.push(coin.graph[key]);
            }
        }

        // Replace the graph object with the new array
        coin.graph = graphArray;
    }
    if(coin.sentiment){
        const transformed = [];
        // let c=""
        for (let key in coin.sentiment) {
            if (coin.sentiment.hasOwnProperty(key)) {
                // if(key<5){
                //     c=
                // }
                // Create an object for each key-value pair and push it to the array
                transformed.push({ grade: key, percentage: coin.sentiment[key],color:"#FF0000" });
            }
        }
        coin.sentiment=transformed
    }




    console.log("after prepare_coin:", coin);
    return data; // Return the modified coin object
}
class CoinsService {
    static async getAllCoins(){
        return await coins.getAll()
    }
    static async getOneCoin(id){
        const data = await coins.getOne(id)
        return await prepare_coin(data)
    }
}
module.exports = CoinsService