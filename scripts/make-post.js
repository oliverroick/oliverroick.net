#!/usr/bin/env node

const readlineSync = require('readline-sync');
const fs = require('fs');

function pad(num) {
    return ('0' + num).slice(-2);
}

const config = {
    'link': {
        'category': 'links',
        'body_id': 'links',
        'layout': 'link'
    },
    'post': {
        'category': 'writing',
        'body_id': 'blog',
        'layout': 'post'
    },
    'reading': {
        'category': 'reading',
        'body_id': 'blog',
        'layout': 'reading'
    },
};

const type = process.argv[2];
const postConfig = config[type];
const title = readlineSync.question('Title: ');
const link = type === 'link' ? readlineSync.question('Link: ') : '';
const isbn = type === 'reading' ? readlineSync.question('ISBN: ') : '';
const author = type === 'reading' ? readlineSync.question('Author: ') : '';
const date = new Date();

const y = date.getFullYear();
const m = pad(date.getMonth() + 1);
const d = pad(date.getDate());
const hh = pad(date.getHours());
const mm = pad(date.getMinutes());
const offset = date.getTimezoneOffset();
const offsetHours = pad(Math.abs(offset / 60));

const preamble = `---
layout: ${type}
category: ${postConfig.category}
body_id: ${postConfig.body_id}
date: ${y}-${m}-${d} ${hh}:${mm}:00${offset < 0 ? '+' : '-'}${offsetHours}:00
highlight_code: true
title: ${title}
description: ${link ? `"Link: ${link}"` : ''}
${link ? `link: ${link}` : ''}
${isbn ? `isbn: ${isbn}` : ''}
${author ? `author: ${author}` : ''}
---
`.replaceAll(/^\s*$(?:\r\n?|\n)/gm, '');

const slug = title.replaceAll(/[\.\, ]/g, '-').toLowerCase();
const fileName = `./src/collections/_posts/${y}-${m}-${d}-${slug}.md`;

fs.writeFileSync(fileName, preamble);
