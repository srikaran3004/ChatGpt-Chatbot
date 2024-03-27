import readlineSync from 'readline-sync';
import colors from 'colors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Importing OpenAI from openai module

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Creating an instance of OpenAI with API key

async function main() {
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: 'user', content: userInput });

      // const completion = await openai.createChatCompletion({
      //   model: 'gpt-3.5-turbo',
      //   messages: messages,
      // });

      // const completionText = completion.data.choices[0].message.content;
      const chatCompletion=await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messgaes:messages,
      });
      const completionText = chatCompletion.choices[0].message;
      
      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('Bot: ') + completionText);
        return;
      }

      console.log(colors.green('Bot: ') + completionText);

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
