"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var chatgpt_official_1 = require("chatgpt-official");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var timeout = require('connect-timeout');
var contentful = require('contentful');
var options = {
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    instructions: "You are ChatGPT, a large language model trained by OpenAI.",
    model: "text-davinci-003",
    stop: "<|im_end|>"
};
//let bot = new ChatGPT("<OPENAI_API_KEY>", options); 
function askChatGPT(question) {
    return __awaiter(this, void 0, void 0, function () {
        var chatGPT, res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(question);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    chatGPT = new chatgpt_official_1["default"](process.env["MY_SECRET"], options);
                    return [4 /*yield*/, chatGPT.ask(question)];
                case 2:
                    res = _a.sent();
                    console.log(res);
                    //console.log(res.choices);
                    return [2 /*return*/, res];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    throw new Error('Error processing request');
                case 4: return [2 /*return*/];
            }
        });
    });
}
var app = express();
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
app.post('/ask/chatGPT', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var answer, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, askChatGPT(req.body.question)];
                case 2:
                    answer = _a.sent();
                    console.log(answer);
                    res.json({ answer: answer });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    next(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post('/ask/chatGPT/tomakea/list', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var question, answer, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    question = "Generate an array of ".concat(req.body.length, " objects total in this list [").concat(req.body.thing.join(", "), "] ") +
                        "that are related to things in this list [".concat(req.body.relevance.join(", "), "] ") +
                        "find or create realistic values for all thing in this list :[Rating,Date] for each answer, " +
                        "sorted by ".concat(req.body.order.join(", "), " ") +
                        // accidentally jewel  add extra field to array
                        //`exclude those related to ${req.body.filter2.join(",")} `+
                        "exclude those related to things in this list  [".concat(req.body.filter2.join(", "), "] ") +
                        "wrap each entry in double qoutes array should be in the form [{answer: [<answer chatgpt found goes here>] ,  category:".concat(req.body.thing[0], ",") +
                        "relation: [".concat(req.body.relevance.join(","), "],sortCategory:[").concat(req.body.order.join(","), "], \n    sortValue:[<values chatgpt used for sorting go here>], \n    excpetions:[").concat(req.body.filter2.join(","), "]  }      ] ") +
                        "each answer should only contain 1 response ";
                    console.log(question);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, askChatGPT(question)];
                case 2:
                    answer = _a.sent();
                    console.log(answer);
                    res.json({ answer: answer });
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    next(err_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post('/ask/chatGPT/tomakea/webpage', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var answer, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, askChatGPT(req.body.question)];
                case 2:
                    answer = _a.sent();
                    console.log(answer);
                    res.json({ answer: answer });
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    next(err_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post('/ask/chatGPT/tomakeawork/outplan', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var answer, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, askChatGPT(req.body.question)];
                case 2:
                    answer = _a.sent();
                    console.log(answer);
                    res.json({ answer: answer });
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _a.sent();
                    next(err_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post('/ask/chatGPT/tomakea/dietplan', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var answer, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, askChatGPT(req.body.question)];
                case 2:
                    answer = _a.sent();
                    console.log(answer);
                    res.json({ answer: answer });
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _a.sent();
                    next(err_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post('/ask/chatGPT/tomakea/angular-component', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var question, answer, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    question = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, askChatGPT(req.body.question)];
                case 2:
                    answer = _a.sent();
                    console.log(answer);
                    res.json({ answer: answer });
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _a.sent();
                    next(err_7);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.get('/get/content', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var client, question, content, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.body);
                    client = contentful.createClient({
                        space: 'n9x9r7ahauxe',
                        environment: 'master',
                        accessToken: 'BEvBQTTJ91gkPMb-VhLsGroOrT8KG3Kx9U-O2NX-eE8'
                    });
                    question = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.getEntries("3K9b0esdy0q0yGqgW2g6Ke")];
                case 2:
                    content = _a.sent();
                    res.json({ answer: content });
                    return [3 /*break*/, 4];
                case 3:
                    err_8 = _a.sent();
                    next(err_8);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.get('/get/item/spec/:item/:amount', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var question, answer, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.params.item);
                    question = "Gather a comprehensive array of at least ".concat(parseInt(req.params.amount), " attributes with a realistic sample attribute value that can be used to describe all ") +
                        "".concat(req.params.item, " i.e  situation, height, weight, consequences, outcome, make sure to include the following attributes ") +
                        "in the list ".concat(req.query['additional_attributes']) +
                        " and  output the answer as an object with this structure" +
                        "{ " +
                        "item:<thing i.e. song or rapsongs or ".concat(req.params.item, ">,  common_points:[<chatgpt answer goes here in the form attribute:definition in all lowercase and make sure the attribute is described in one word and include a description of the attribute that is less than 5 words >]") +
                        "}" +
                        "";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, askChatGPT(question)];
                case 2:
                    answer = _a.sent();
                    console.log(answer);
                    res.json({ answer: answer });
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _a.sent();
                    next(err_9);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
//curl 'https://graphql.contentful.com/content/v1/spaces/n9x9r7ahauxe/environments/master' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://033bad1b-c8e2-4ee5-b8f8-f4c19c33ca37.ctfcloud.net' -H 'Authorization: Bearer NNHCopRpq5gwO-SEFDJjmEkglbScUWIVknIdvUCEHX0' --data-binary '{"query":"query blogPostCollectionQuery {\n  blogPostCollection {\n    items {\n      sys {\n        id\n      }\n      # add the fields you want to query\n      title\n    description\n    author {\n      name\n    }\n    heroImage {\n      url\n    }\n    body\n    }\n  }\n}"}' --compressed
app.get('/make/:item', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var spec, fake_object, question;
        return __generator(this, function (_a) {
            console.log(req.body);
            spec = app.get('/get/item/' + req.params.item);
            fake_object = {
                brand: "Ford",
                model: "Mustang"
            };
            question = "Make a ".concat(req.body.item, " with this specification ").concat(spec, " and ") +
                " fill in any blank fields";
            try {
                res.json({ answer: question });
            }
            catch (err) {
                next(err);
            }
            return [2 /*return*/];
        });
    });
});
var server = http.createServer(app);
server.listen(3000, function () {
    console.log('Server is listening on port 3000');
});
