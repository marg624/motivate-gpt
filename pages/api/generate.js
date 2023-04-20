import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const personType = req.body.personType || '';
  if (personType.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please choose a type of person",
      }
    });
    return;
  }

  try {
    const prompt1 = generatePrompt(personType);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": prompt1}] ,
      temperature: 0.6,
    });

    console.log(completion.data.choices[0].message.content)
    const resp = completion.data.choices[0].message.content.split(".\"");
    const q = resp[0].replace("\"", "");
    const rest = resp.slice(1);
    const youtube1 = "https://www.youtube.com/results?search_query=" + q
    res.status(200).json({ result: rest, first: q, youtube: youtube1 });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(personType) {
  return `Suggest one motivational talks, speech, album, or content from a famous ${personType}. In the first sentence please give in the simple format of (note inside quotes and ending with a period): "[person] [title]." Then you can describe more if needed in the second sentence.`;
}

