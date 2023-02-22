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
  origin: [
    'https://compliancegpt.us',
    'http://localhost:4200'
  ]
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

app.post('/ask/chatGPT/tomakea/list', async function (req, res, next) {
  //console.log(req.body);
  //order
  // Generate an array of 25 objects total in this list [Financial goals,Books to read] that are 
  // related to things in this list [The Matrix,Star Wars] sorted by Rating,Date except those 
  // related to things in this list  [Grand Theft Auto,Meryl Streep] wrap each entry in 
  // double qoutes array should be in the form [{answer:[< answer chatgpt found goals here>],item:{Financial goals,
  // relation: [The Matrix,Star Wars],sortCategory:[Rating,Date], sortValues:[<sort values cahtgpt used go here>], 
  // excpetions:[Grand Theft Auto,Meryl Streep]  }      ]
  //extra attributes i.e. seperator,
  var question = `Generate an array of ${req.body.length} objects total in this list [${req.body.thing.join(", " )}] `+
  `that are related to things in this list [${req.body.relevance.join(", ")}] `+
  `find or create realistic values for all thing in this list :[Rating,Date] for each answer, `+
  `sorted by ${ req.body.order.join(", ") } `+
  // accidentally jewel  add extra field to array
  //`exclude those related to ${req.body.filter2.join(",")} `+
  `exclude those related to things in this list  [${req.body.filter2.join(", ")}] `+
  `wrap each entry in double qoutes array should be in the form [{answer: [<answer chatgpt found goes here>] ,  category:${req.body.thing[0]},`+
  `relation: [${req.body.relevance.join(",")}],sortCategory:[${req.body.order.join(",")}], 
    sortValue:[<values chatgpt used for sorting go here>], 
    excpetions:[${req.body.filter2.join(",")}]  }      ] `+
    `each answer should only contain 1 response ` 
  console.log(question)
  try {
    let answer = await askChatGPT(question);
    console.log(answer);
    res.json({ answer: answer });
  } catch (err) {
    next(err);
  }
});

app.post('/ask/chatGPT/tomakea/webpage', async function (req, res, next) {
  console.log(req.body);
  //order

  //extra attributes i.e. seperator,


  try {
    let answer = await askChatGPT(req.body.question);
    console.log(answer);
    res.json({ answer: answer });
  } catch (err) {
    next(err);
  }
});

app.post('/ask/chatGPT/tomakeawork/outplan', async function (req, res, next) {
  console.log(req.body);
  //order

  //extra attributes i.e. seperator,


  try {
    let answer = await askChatGPT(req.body.question);
    console.log(answer);
    res.json({ answer: answer });
  } catch (err) {
    next(err);
  }
});


app.post('/ask/chatGPT/tomakea/dietplan', async function (req, res, next) {
  console.log(req.body);
  //order

  //extra attributes i.e. seperator,


  try {
    let answer = await askChatGPT(req.body.question);
    console.log(answer);
    res.json({ answer: answer });
  } catch (err) {
    next(err);
  }
});

app.post('/ask/chatGPT/tomakea/angular-component', async function (req, res, next) {
  console.log(req.body);
  //order

  //extra attributes i.e. seperator,
  var question  = ''

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



