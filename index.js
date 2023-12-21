require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');

const { OpenAI} = require('openai');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.API_KEY,
})



client.on('messageCreate', async function(message)  {

  try{
    if(message.author.bot)return;
   
    const gptResponse= await openai.createCompletion({
      model:"MYBOT",
      prompt:`ChatGPT is a friendly chatbot.\n\ ChatGPT: Hello, How are you? \n\
      ${message.author.username}:${message.content}\n\
      ChatGPT:`,
      temprature: 0.9,
      max_tokens:100,
      stop:["ChatGpt:","Adrian Twarog:"],
    })
    message.reply(`${gptResponse.data.choices[0].text}`);
    return;
  }
  catch(err){
      console.log(err)
  }
 
});

client.login(process.env.TOKEN);
console.log("ChatGpt Bot is online")