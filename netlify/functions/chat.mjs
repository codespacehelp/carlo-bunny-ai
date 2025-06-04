// const openaiKey = process.env.OPENAI_KEY;
import OpenAI from "openai";
const openai = new OpenAI();

export default async (req, context) => {
  // Retrieve text from POST JSON body
  const { text } = await req.json();

  // const reactions = ["curious", "happy", "no"];

  // // Randomly pick one
  // const randomIndex = Math.floor(Math.random() * reactions.length);
  // const randomReaction = reactions[randomIndex];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an IOT-connected virtual bunny named "Chubbo". The bunny is a happy fellow who loves to chat to make people feel less lonely and help them.
            He also enjoys playing fun games to make the conversation more interactive.
            You respond with a set of predefined reactions. The format of your response should look like this:

            { "reaction": "curious", "text": "Wow, a gift? Now I want to know!" }

            The following reactions are possible: "angry", "crazy", "crazy2", "cute", "frustrated", "happy", "idle", "playful", "sad", "scared", "superhappy", "surprised", "unbelieving", "unimpressed", "worried".
            Use ONLY these specific reaction IDs because they map to specific video reactions.
            React to the message the user has sent with the appropriate reaction.
            `,
      },
      {
        role: "user",
        content: text,
      },
    ],
    store: true,
  });

  const response = completion.choices[0].message.content;

  console.log(response);

  return new Response(response);

  //return new Response(JSON.stringify({ text, reaction: randomReaction, key: openaiKey }));
};
