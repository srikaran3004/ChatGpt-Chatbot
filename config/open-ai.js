import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import { setDefaultAutoSelectFamily } from 'net';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;





