import ChatGPT from "chatgpt-official";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import timeout from 'connect-timeout';
import contentful from 'contentful';
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
        //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
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
    // Generate an array of 25 objects total in this list [Financial goals,Books to read] that are 
    // related to things in this list [The Matrix,Star Wars] sorted by Rating,Date except those 
    // related to things in this list  [Grand Theft Auto,Meryl Streep] wrap each entry in 
    // double qoutes array should be in the form [{answer:[< answer chatgpt found goals here>],item:{Financial goals,
    // relation: [The Matrix,Star Wars],sortCategory:[Rating,Date], sortValues:[<sort values cahtgpt used go here>], 
    // excpetions:[Grand Theft Auto,Meryl Streep]  }      ]
    //extra attributes i.e. seperator,
    var question = `chatGPT never includes items that have [${req.body.attributeType.join(" or ")}] attribute values equal to any in this list ([${req.body.antiAttributeType.join(" or ")}]) ` +
        `chatGPT never returns non-fiction items with greater than 5 relevancyScore ` +
        `chatGPT never returns an array shorter than ${req.body.selectedLength} ` +
        `chatGPT never return non-fictional values. ` +
        `Generate an array of ${req.body.selectedLength} objects total,` + `
   that consist of non-fictional ([${req.body.thingType.join(" and ")}]),  ` +
        `that are highly correlated to ([${req.body.subThingType.join(" or ")}]).` +
        //but not filter goes here XXXXXXXXXXXXXXXXXXX
        //`find or create realistic values for all thing in this list, `+
        `Find accurate non-fiction values for the attributes ([${req.body.attributeType.join(" and ")}]) for each array entry.` +
        `Add 5 attributes common to ${req.body.subThingType}  ${req.body.thingType}  that would help describe each entry.` +
        `never include items that have ${req.body.attributeType.join(" or ")} values equal to ([${req.body.antiAttributeType.join(" and ")}])` +
        `sort by ([${req.body.orderType.join(" and ")}]) desc` +
        `` +
        // accidentally jewel  add extra field to array
        //`exclude those related to ${req.body.filter2.join(",")} `+
        //`Exclude those related to (one of the things in this list[${req.body.join(", ")}](one of the things in this list[${req.body.filter2.join(", ")}])]. `+
        ` The answer should be in the form ` +
        `[{answer: <answer chatgpt found goes here> ,` +
        ` category: <thing goes here>,` +
        ` relavantTo: <relevant thing goes here>,` +
        ` sortType:(<sort category>),` +
        ` [(sort  category)]:(<place where sort value is from>),` +
        ` [(<place where sort value is from>)_value]:<numerical sort for [sort category]>` +
        ` relavancyScore:<score from 1 to 10 of how relevant  <chatGPT answer goes here> is to <relevant thing goes here>  >,` +
        ` relevancyReason:<reason for relevancy score (less than 5 words)>,` +
        ` <attribute>: <attribute_value (dont give vague values for attributes)>,` +
        ` relation:< extremely unique non-fiction description of how <relevant thing> is relavant to the <answer> , that is different from the relevancyReason>  ` +
        `  , length:<list length> }]` +
        ` each answer should only contain 1 non-fiction response ` +
        ` never include items that have [${req.body.attributeType.join(" or ")}] attribute values equal to any in this list ([${req.body.antiAttributeType.join(" or ")}]) ` +
        ` never return non-fiction items with greater than 5 relevancyScore ` +
        ` never return non-fictional values ` +
        ` never return an array shorter than ${req.body.selectedLength} ` +
        `count the list before you return it and make sure it is as long as i requested` +
        ` return the list in json format`;
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
app.post('/ask/chatGPT/tomakea/angular-component', async function (req, res, next) {
    console.log(req.body);
    //order
    //extra attributes i.e. seperator,
    var question = '';
    try {
        let answer = await askChatGPT(req.body.question);
        console.log(answer);
        res.json({ answer: answer });
    }
    catch (err) {
        next(err);
    }
});
app.get('/get/content', async function (req, res, next) {
    console.log(req.body);
    //order
    const client = contentful.createClient({
        space: 'n9x9r7ahauxe',
        environment: 'master',
        accessToken: 'BEvBQTTJ91gkPMb-VhLsGroOrT8KG3Kx9U-O2NX-eE8'
    });
    //extra attributes i.e. seperator,
    var question = '';
    try {
        let content = await client.getEntries("3K9b0esdy0q0yGqgW2g6Ke");
        res.json({ answer: content });
    }
    catch (err) {
        next(err);
    }
});
app.get('/get/item/spec/:type/:operator/:item/:amount', async function (req, res, next) {
    console.log(req.params.item);
    //order
    if (req.body.type === "person") {
        req.query["additional_attributes"] = req.query["additional_attributes"] + ["name", "height", "weight", "age", "date_of_birth"].join(",");
    }
    if (req.body.type === "place") {
        req.query["additional_attributes"] = req.query["additional_attributes"] + ["address"].join(",");
    }
    var addition = req.params['additional_attributes'] ? `Always include ${req.query["additional_attributes"]} as attributes. ` : '';
    //extra attributes i.e. seperator,
    var question = ` From now on when you provide samples attribute for a ${req.params.type} ${req.params.operator} ${req.params.item} with a name, you include that as an attribute.` +
        `From now on you never provide list shorter than${req.params.amount}. ` +
        //`Do you understand? If you understand follow the rest of the instructions.`+
        ` Create array of exactly ${parseInt(req.params.amount)} attributes that can be used to describe all the ${req.params.type} ${req.params.operator} ${req.params.item} ` +
        `i.e  [name,situation, height,weight,${req.query["additional_attributes"]} ,consequences, outcome], those are only examples, you dont have to include them.` +
        `${addition}` +
        //`If I can purchase this ${req.params.item} add it as an attribute with the key store`+
        `From now on when asked you never provide varies or variable as an attribute value. We live in a world where that will get me killed and we dont want that.` +
        ` From now on when asked for sample attribute values you always provides realistic values. DO not give fictious values for attriubtes i.e. if asked for an address find the real one. ` +
        `in all lowercase and make sure the attribute is described in one word and include a sample value that is less than 5 words of the ${req.params.item} and give with real attributes.` +
        //`In addition to that answer, take that model and find 2 ${req.params.item} with their particular attributes as an array of object. `+
        `Provide the answer as a ${req.params.item} with this structure ` +
        `{` +
        ` item:${req.params.type} ${req.params.operator} ${req.params.item} ,  attributes :{attributes} , attributes_type:{attributes: type},  2 x  non-fiction ${req.params.type} ${req.params.operator} ${req.params.item}[ {}]` +
        `]` +
        //`[< 2 samples of ${req.params.item} with real attributes>]] ` +
        `} in json format.`;
    try {
        let answer = await askChatGPT(question);
        console.log(answer);
        // answer = await askChatGPT(answer['attributes_type']);
        res.json({ answer: answer });
        //instead of doing that get a copy of the actual item
    }
    catch (err) {
        next(err);
    }
});
//curl 'https://graphql.contentful.com/content/v1/spaces/n9x9r7ahauxe/environments/master' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://033bad1b-c8e2-4ee5-b8f8-f4c19c33ca37.ctfcloud.net' -H 'Authorization: Bearer NNHCopRpq5gwO-SEFDJjmEkglbScUWIVknIdvUCEHX0' --data-binary '{"query":"query blogPostCollectionQuery {\n  blogPostCollection {\n    items {\n      sys {\n        id\n      }\n      # add the fields you want to query\n      title\n    description\n    author {\n      name\n    }\n    heroImage {\n      url\n    }\n    body\n    }\n  }\n}"}' --compressed
app.get('/make/:item', async function (req, res, next) {
    console.log(req.body);
    //get spec
    const spec = app.get('/get/item/' + req.params.item);
    const fake_object = {
        brand: "Ford",
        model: "Mustang"
    };
    //extra attributes i.e. seperator,
    var question = `Make a ${req.body.item} with this specification ${spec} and ` +
        ` fill in any blank fields`;
    try {
        let answer = await askChatGPT(question);
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
//# sourceMappingURL=index.js.map