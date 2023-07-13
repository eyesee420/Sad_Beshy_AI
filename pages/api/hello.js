import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey:"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",
});

const openai = new OpenAIApi(configuration);

const handler = async (req, res) => {
  const prompt = req.query.prompt;


  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `make me a super motivational cringy quote in tagalog  about my friend for example
      ${prompt}
      that starts with: malungkot ang beshy ko kasi ${prompt}  `,
      max_tokens: 300,
      temperature: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    });

    const quote = completion.data.choices[0].text;

    res.status(200).json({ quote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
