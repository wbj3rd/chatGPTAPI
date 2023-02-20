import ChatGPT from "chatgpt-official";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import timeout from 'connect-timeout';

let options = {
  temperature: 0.7, // OpenAI parameter
  max_tokens: 1000, // OpenAI parameter [Max response size by tokens]
  top_p: 1, // OpenAI parameter
  frequency_penalty: 0, // OpenAI parameter
  presence_penalty: 0, // OpenAI parameter
  instructions: `You are ChatGPT, a large language model trained by OpenAI.`, // initial instructions for the bot
  model: "text-davinci-003", // OpenAI parameter  `text-davinci-003` is PAID
  stop: "<|im_end|>", // OpenAI parameter
}

//let bot = new ChatGPT("<OPENAI_API_KEY>", options); 



async function askChatGPT(question: string) {
  console.log(question);

  try {
    
    const chatGPT = new ChatGPT( process.env["MY_SECRET"]! ,options);
    const res = await chatGPT.ask(question);
    console.log(res);
    //console.log(res.choices);
    return res;
  } catch (err) {
    console.error(err);
    throw new Error('Error processing request');
  }
}

const app = express();

// Enable all CORS requests
app.use(cors({
  origin: 'https://compliancegpt.us'
}));
app.use(timeout('60s'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});





app.post('/ask/chatGPT', async function (req, res, next) {
  console.log(req.body);
  try {
    let answer = await askChatGPT(req.body.question);
    console.log(answer);
    res.json({ answer: answer });
  } catch (err) {
    next(err);
  }
});
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

askChatGPT('Who are you');



