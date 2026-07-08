#!/usr/bin/env node

import * as p from '@clack/prompts';
import color from 'picocolors';
import { setTimeout } from 'timers/promises';

let correctTotal = 0;

async function askQuestion(question, answers, correctAnswerIndex) {
    const options = answers.map((answer) => ({
        value: answer,
        label: answer,
    }));

    const answer = await p.select({
        message: question,
        options,
    });

    const s = p.spinner();
    s.start('Checking your answer...');
    await setTimeout(1000);
    s.stop('Answer checked');

    if (answer === answers[correctAnswerIndex]) {
        correctTotal++;
    }
}

class Question {
    constructor(question, answerArray, correctAnswerIndex) {
        this.question = question;
        this.answers = answerArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

async function main() {
    p.intro(`${color.bgRed(color.black(`Welcome to the ${color.bold('Sanidhya Games')}`))}`);

    const questions = [
        new Question('💻 Is HTML a language?', ['Yes', 'No'], 0),
        new Question('💻 Which is famous language ?', ['Java', 'Python', 'Rust'], 1),
        new Question('💻 Best coding youtuber', ['Bro Just Code', 'WWE😆', 'Codeme'], 0),
        new Question('💻 How many languages are there ?', ['8,000', '0', '20'], 0),
        new Question('💻 Best ai', ['Gemini', 'Deepseek', 'ChatGPT'], 2),
    ];

    for (const question of questions) {
        await askQuestion(question.question, question.answers, question.correctAnswerIndex);
    }

    p.note(`You got ${correctTotal} out of ${questions.length} correct.`, 'Score');

    p.outro(`${color.bgCyan(color.black('Thank you for playing the Sanidhya Games 🚀🚀'))}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});