import ChatGPT from "chatgpt-official";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import timeout from 'connect-timeout';
let options = {
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    instructions: `You are ChatGPT, a large language model trained by OpenAI.`,
    model: "text-davinci-003",
    stop: "<|im_end|>", // OpenAI parameter
};
//let bot = new ChatGPT("<OPENAI_API_KEY>", options); 
async function askChatGPT(question) {
    console.log(question);
    try {
        const chatGPT = new ChatGPT(process.env["MY_SECRET"], options);
        const res = await chatGPT.ask(question);
        console.log(res);
        //console.log(res.choices);
        return res;
    }
    catch (err) {
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
    }
    catch (err) {
        next(err);
    }
});
app.post('/ask/chatGPT/tomakea/list', async function (req, res, next) {
    //console.log(req.body);
    //order
    //extra attributes i.e. seperator,
    var question = `Generate an array of ${req.body.length} objects about ${req.body.thing.join(",")} ` +
        `that are related to ${req.body.relevance.join(",")} ` +
        `sorted by ${req.body.order.join(",")} ` +
        `exclude those related to ${req.body.filter2.join(",")} ` +
        `wrap each entry in double qoutes`;
    console.log(question);
    try {
        let answer = await askChatGPT(question);
        console.log(answer);
        res.json({ answer: answer });
    }
    catch (err) {
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
    }
    catch (err) {
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
    }
    catch (err) {
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
    }
    catch (err) {
        next(err);
    }
});
const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
askChatGPT('Who are you');
//# sourceMappingURL=index.js.map