const express = require('express');
const request = require('request');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

if(process.env.NODE_ENV==='production')
{
    app.use(express.static(path.join(__dirname,"testapp","build")));
    app.get("*",(req,resp)=>{
        resp.sendFile(path.join(__dirname,"testapp","build","index.html"));
    })
}

app.post('/rollno', async (req, res) => {
	let rollArr = req.body.data.split(',');

	let urls = [];
	for (let i = 0; i < rollArr.length; i++) {
		urls.push((await axios.get(`https://terriblytinytales.com/testapi?rollnumber=${rollArr[i]}`)).data);
	}
	try {
		let result = {};
		for (let i = 0; i < rollArr.length; i++) {
			result[rollArr[i]] = urls[i];
		}
		res.send(result);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log('Port is working on 8080');
});
