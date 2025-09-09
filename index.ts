// 

import { perplexity } from '@ai-sdk/perplexity';
import { generateText } from 'ai';

// render generated text in markdown
import MarkdownIt from "markdown-it";
import terminal from "markdown-it-terminal";

const md = new MarkdownIt();
md.use(terminal);

const { text, sources, providerMetadata} = await generateText({
  model: perplexity('sonar-pro'),
  prompt: 'What are the latest developments in quantum computing? Reply in markdon format',
  providerOptions: {
    perplexity: {
      return_images: true, // Enable image responses (Tier-2 Perplexity users only)
    },
  },
});

console.log('Result: ', md.render(text));
// console.log('Sources: ', sources);
// console.log('providerMetadata: ', providerMetadata);