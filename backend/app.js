const express = require('express');
const dotenv = require('dotenv');
const cors   =require('cors')
dotenv.config();
const bodyParser = require('body-parser');
const {Configuration,OpenAIApi} = require('openai');

const app =express();

app.use(cors());
app.use(bodyParser.json())


const configuration = new Configuration({
    apiKey:process.env.OPENAI_APIKEY
})

const openai  = new OpenAIApi(configuration)

app.post('/ask',async(req,res)=>{
    console.log(req.body)
    const prompt = req.body['prompt'];
    console.log(prompt)
    if(!prompt){
        return res.status(400).send({error:'prompt is required'})
    }
    try{ 
        await openai.createCompletion({
        model:'text-davinci-003',
        prompt:prompt,
        temperature:0,
        max_tokens:2000
       }).then((response)=>{
        res.send({data:response.data.choices[0].text})
       })

    }catch(error){
         console.log(error);
         res.status(500).send({error})
    }
});

app.listen(4000,()=>{
    console.log("server started listening at 5000")
}) 