const PORT=8000
const fetch = require('node-fetch');
const express= require('express')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())

const API_KEY='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'

app.post('/completions',async(req,res,) => {
    console.log("🚀 ~ file: server.js:12 ~ app.post ~ req:", req)
     try{
       	const respose= await fetch("https://api.openai.com/v1/chat/completions",{
        method: "POST", 
      headers: {
        "Authorization":`Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": req.body.message}]
            })})	
       	const data= await respose.json()
       	console.log("🚀 ~ file: server.js:29 ~ app.post ~ data:", data)
       	res.send(data)
    	}
        catch(err){
        	console.log("🚀 ~ file: sever.js:13 ~ app.post ~ err:", err)
        	
    	}
	}
)

app.listen(PORT, ()=>{
    console.log('Our port is running on PORT'+PORT)
})
