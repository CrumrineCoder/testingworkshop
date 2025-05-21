import {chromium} from "playwright";
import {OpenAI} from "openai";
import * as dotenv from "dotenv";
dotenv.config();


console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function askOpenAI(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0]?.message.content ?? '';
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const task = "Go to Shaed.ai and click the About page";
  const plan = await askOpenAI(`Break down this task into steps: ${task}`);
  console.log("Plan:", plan);
}

main();