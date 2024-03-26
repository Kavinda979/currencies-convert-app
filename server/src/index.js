const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all curruncies
app.get("/getAllCurrencies", async (req, res) => {
    const namesURl = `https://openexchangerates.org/api/currencies.json?app_id=81ce970c31ad421d9ba59877fa2fe4b6`;
    try {
      const namesResponse = await axios.get(namesURl);
      const namesData = namesResponse.data;
      return res.json(namesData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  //convert curruncies
  app.get("/convert",async(req,res) => {
    const {date,sourceCurrency,targetcurrency,amountInTargetCurrency} = req.query;
   
    try{
      const dataURL=`https://openexchangerates.org/api/historical/${date}.json?app_id=81ce970c31ad421d9ba59877fa2fe4b6`;

      const dataResponse= await axios.get(dataURL);
      const rates=dataResponse.data.rates;

      //calculate the target curruncy
      const sourceRate = rates[sourceCurrency]
      const targetRate = rates[targetcurrency]

      const targetAmount= (targetRate/sourceRate)*amountInTargetCurrency
      return res.json(targetAmount);

    }catch(err){
      console.error(err)
    }
  });

  //calculate the target curruncy


app.listen(5000, () => {
  console.log("Server started");
});
