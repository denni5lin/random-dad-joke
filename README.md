# random-dad-joke

This repository automates the process of fetching a random dad joke from [icanhazdadjoke.com](https://icanhazdadjoke.com/) and sending it to a randomly generated Yopmail inbox using Playwright. The script demonstrates browser automation for web scraping and email sending in a disposable email environment.

## Features

- Fetches a random dad joke from icanhazdadjoke.com
- Generates a random Yopmail email address
- Sends the joke to the generated Yopmail inbox using Yopmail's web interface

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Install Dependencies

```sh
npm install
```

### Running the Test

The main script is located at `tests/yopmail.spec.ts`. To run it:

```sh
npx ts-node tests/yopmail.spec.ts
```

This will launch a browser window, fetch a dad joke, and send it to a random Yopmail inbox. The browser will close automatically after a short delay.

### Troubleshooting

- **Playwright not installed:**
Make sure you have run `npm install` to install all dependencies.
- **Browser not launching:**
Playwright downloads browser binaries on first install. If you see errors about missing browsers, run:

```sh
npx playwright install
```

- **Timeouts or selectors not found:**
Web page layouts may change. If selectors like `.card-content p` or `#newmail` are not found, inspect the target site and update the selectors in `tests/yopmail.spec.ts`.
- **Permission errors:**
Ensure you have the necessary permissions to run Node.js scripts and launch browsers on your system.
- **Headless mode:**
The script runs with `headless: false` for visibility. You can change this to `true` in the script for headless operation.