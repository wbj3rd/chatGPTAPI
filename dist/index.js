import ChatGPT from "chatgpt-official";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import timeout from 'connect-timeout';
import contentful from 'contentful';
import axios from 'axios';
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
// CLIENT SECRET AND ID FOR KEYCLOAK
// CLIENT ID = admin
// CLIENT SECRET = D7uv5zTmZCOn6gtvEcmHBsLkjku3YU2V
const REGISTRATION_ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNUzZFNFZWS2wyYVZWVDgwbkc3bXJuaG9JbzM3N2NYeEZnMGNCT1M0bE5JIn0.eyJleHAiOjE2Nzc3MDQ3NzIsImlhdCI6MTY3NzcwNDQ3MiwianRpIjoiM2YzYWNhNzQtZmNmYS00YjEzLTk0YzUtZGY3NDVkNGY1NWQ4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5xdWVjYWxsLmJpei9yZWFsbXMvZ0FQSSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiIyMDQ3MjZkOC1mYTMyLTQ5NWItYjgxMS03ZTVjZDIyMTI1NGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiQVBJX1VTRVJfUk9MRSIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1nYXBpIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbImNyZWF0ZS1jbGllbnQiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImNsaWVudEhvc3QiOiIxMC4yLjAuMSIsImNsaWVudElkIjoiYWRtaW4iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInRydXN0ZWQtaG9zdHMiOiIqIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWFkbWluIiwiY2xpZW50QWRkcmVzcyI6IjEwLjIuMC4xIn0.bsA2MPt8hn0wsFKgjWgcgOLIYAM0TG2Q-NQTak9DqjPnx8aQX1rDrPq_K0Z-h1gyRyV19kUHpAo6vupCWVojN1kjPMZytD9xZhq9ogqZCeNS46cfkM027bIAPJBjlc_F0oOtz1BSHxJEXwLZxpbWRqcybxAIY2tsPfafKMfbiCkZiiWsNL9RvF_YQmA8KolllxvjB488s7kEhFdXEwvMECMAvyAQ1sLjTNVXUCkxsPCawVpENbH5h_OUqt34jEwjWirH3Ku7SadxToOVus1BK-lOYz3HQjQ8nJY1Rb8gegss-tfqTILgvWswOe84iH37yzqAhfTtSKdkJ2T0d_Da9g";
async function createNewClient(token) {
    const introspectUrl = 'https://keycloak.quecall.biz/realms/gAPI/protocol/openid-connect/token/introspect';
    const clientRegistrationUrl = 'https://keycloak.quecall.biz/realms/gAPI/clients-registrations/openid-connect';
    const url = 'https://keycloak.quecall.biz/realms/gAPI/protocol/openid-connect/token/introspect';
    const username = 'admin';
    const password = 'D7uv5zTmZCOn6gtvEcmBbsLjk u3YU2V';
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
    var clientRegistrationResponse = {};
    var introspectResponse = {};
    // Introspect the token to ensure it's valid
    //const credentials = Buffer.from('admin:D7uv5zTmZCOn6gtvEcmHBsLkjku3YU2V', 'utf-8'); 
    const headers = {
        // Authorization: `Basic YWRtaW46RDd1djV5VG1aQ09uNmd0dkVjbUhCc0xramt1M1lVMlY=`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = new URLSearchParams();
    data.append('token', token);
    //check token
    try {
        const data = new URLSearchParams();
        data.append('token', token);
        const authHeader = {
            Authorization: `Basic ${Buffer.from(`admin:D7uv5zTmZCOn6gtvEcmHBsLkjku3YU2V`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        //console.log(data.toString())
        //console.log(authHeader)
        introspectResponse = await axios.post(url, data.toString(), { headers: authHeader });
        //console.log(introspectResponse)
        // handle successful response here
    }
    catch (error) {
        // handle error here
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with an error:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        }
        else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        }
        else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        // handle the error here
    }
    // get new access token for admin client
    var response = {};
    const keycloakEndpoint = 'https://keycloak.quecall.biz/realms/gAPI/protocol/openid-connect/token';
    try {
        response = await axios.post(keycloakEndpoint, {
            grant_type: 'client_credentials',
            client_id: 'admin',
            client_secret: 'D7uv5zTmZCOn6gtvEcmHBsLkjku3YU2V'
        }, { headers: headers });
    }
    catch (error) {
        //console.log(error)
    } //console.log(response)
    var access_token = response.data.access_token;
    // create new client for user
    if (!introspectResponse.data.active) {
        throw new Error('Token is not active');
    }
    //console.log(Object.keys(introspectResponse))
    //console.log(introspectResponse.data)
    //console.log(introspectResponse.config)
    // call to keycloak and get token for ADMIN - client who has permission to add other clients
    // Create the new client registration
    try {
        const authHeader = {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        };
        clientRegistrationResponse = await axios.post(clientRegistrationUrl, {
            redirect_uris: ['https://example.com/callback'],
            response_types: ['code'],
            grant_types: ['authorization_code', 'refresh_token'],
            client_name: 'One Step CLoser',
            client_uri: 'https://anyweb.com',
            defaultClientScopes: ['API Keys', 'ACCESS SCOPE'],
        }, { headers: authHeader });
        // handle successful response here
    }
    catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with an error:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        }
        else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        }
        else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        // handle the error here
    }
    console.log(Object.keys(clientRegistrationResponse));
    console.log(clientRegistrationResponse.data);
    return {
        clientId: clientRegistrationResponse.data.client_id,
        clientSecret: clientRegistrationResponse.data.client_secret,
    };
}
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
        'http://localhost:4200',
        'https://makealist.ai'
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
app.post('/get/apiKey', async function (req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization header is missing or invalid' });
    }
    let apiKey = await createNewClient(token);
    console.log(apiKey);
    res.json(apiKey);
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
    var question = ` Generate an array of ${req.body.selectedLength} (non-fictional ${req.body.thingType.join(" and ")} ` +
        //` THAT ARE NEVER ${req.body.antiAttributeType.join(" OR ")} OR ${req.body.filterThingType.join(" OR ")} `+
        //` THAT ARE NEVER ${req.body.antiAttributeType.join(" OR ")} OR ${req.body.filterThingType.join(" OR ")} `+
        //` THAT ARE OPPOSITE TO ${req.body.antiAttributeType.join(" AND ")} `+
        //` THAT ARE THE NOT ${req.body.filterThingType.join(" AND ")} `+
        ` THAT ARE (HIGHLY CORRELATED TO BEING (THE OPPOSITE OF ${req.body.antiAttributeType.join(" AND ")}))) ` +
        ` THAT ARE NEVER ${req.body.filterThingType.join(" AND ")} ` +
        //` that ARE non-fictional ${req.body.thingType.join(" AND " )} that are NOT ${req.body.filterThingType.join(" OR ")} and are`+
        //` highly correlated to the opposite of ${req.body.antiAttributeType.join(" AND ")},  `+
        ` THAT ARE ALWAYS highly correlated ([${req.body.subThingType.join(" AND ")}]).` +
        ` THAT ARE NEVER non-fiction (${req.body.thingType.join(" OR ")}) ` +
        ` include at least one each (${req.body.thingType.join(", ")}) ` +
        ` include at least one each(${req.body.subThingType.join(" AND ")}) ` +
        ` include at least one of each of the following ${req.body.thingType.join(" AND")} ` +
        ` For each ${req.body.thingType.join(" AND ")} in the array ask yourself is this ${req.body.thingType}  ${req.body.filterThingType.join(" or ")}. If it is remove it.` +
        ` For each ${req.body.thingType.join(" AND ")} in the array ask yourself is this ${req.body.thingType}   ${req.body.antiAttributeType.join(" and ")}. If it is remove it. ` +
        `Find accurate non-fiction values for the attributes ([${req.body.attributeType.join(" and ")}]) for each array entry.` +
        `Add 5 attributes common to ${req.body.subThingType.join(" AND ")}  ${req.body.thingType.join(" AND ")}  that would help describe each entry.` +
        //`never include items that have ${req.body.attributeType.join(" or ")} values equal to ([${req.body.antiAttributeType.join(" and ")}])`+
        `sort by ([${req.body.orderType.join(" and ")}]) desc` +
        `` +
        ` The answers should be in the form ` +
        `[{"answer": "<answer chatgpt found goes here>",` +
        ` "category": "<thing goes here>",` +
        ` "relavantTo": "<one of subThing go here>",` +
        ` "relavancyScore":"<score from 1 to 10 of how relevant  <chatGPT answer goes here> is to <relevant thing goes here>  >",` +
        ` "relevancyReason":"<reason for relevancy score (less than 5 words)>",` +
        ` "<attribute>": "<attribute_value (dont give vague values for attributes) always surround in double qoutes>",` +
        ` "relation":"< extremely unique non-fiction description of how <relevant thing> is relavant to the <answer> , that is different from the relevancyReason>"  ` +
        ` "explanation":"< Explain how is this ${req.body.thingType} is ${req.body.subThingType.join(" AND ")} and ARE NOT ${req.body.filterThingType.join(" or  ")} and  ARE NOT ${req.body.antiAttributeType.join(" AND ")}> " ` +
        ` }]` +
        ` each answer should only contain 1 non-fiction response ` +
        ` reomve answers that have a relevancyScore lower than 5` +
        //`count the list before you return it and make sure it is as long as i requested`+
        ` return the list in json format`;
    //` remove any of the  ${req.body.thingType.join(" and ")} that are NOT THE OPPOSITE OF ${req.body.antiAttributeType.join(" AND ")} `
    try {
        let answer = await askChatGPT(question);
        console.log("\n");
        console.log(answer);
        console.log("\n");
        res.json(answer);
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