import { perplexity } from '@ai-sdk/perplexity';
import { ModelMessage, streamText } from 'ai';

import * as readline from 'node:readline/promises';

const cmd = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const messages: ModelMessage[] = [];

async function main() {

    while (true) {
        const userInput = await cmd.question('You: ');

        if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
            console.log('Exiting...');
            process.exit(0);
        }

        messages.push({ role: 'user', content: userInput });

        const result = streamText({
            model: perplexity('sonar-pro'),
            messages
        });

        let fullResponse = '';
        cmd.write('\nAI: ');
        for await (const delta of result.textStream) {
            fullResponse += delta;
            cmd.write(delta);
        }
        cmd.write('\n\n');

        messages.push({ role: 'assistant', content: fullResponse });
    }
}

main().catch(console.error);