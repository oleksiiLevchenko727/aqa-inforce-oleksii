```sh
AQA InForce Automation Project
This project contains automated tests for a hotel booking system using Playwright for both UI and API testing.
Project Structure
aqa-inforce-oleksii/
├── helpers/ 
│   │  ├── auth.helper.ts  # Authorization helper 
│   │  └── room.helper.ts  # Room creation helper
│   │
├── src/
│   │   ├── models/
│   │   │   ├── bookingData.model.ts  # Authorization helper 
│   │   │   └── roomData.model.ts     # Room creation helper
│   │   └── pageObject/
│   │       └── boocking-roomPage.ts  # Booking room UI pageObject
│   tests/
│   ├── api/
│   │   └── creation-booking-room.api.spec.ts   # API tests for room management
│   ├── ui/
│   │   └── boocking-room.ui.spec.ts  # UI tests for the booking process
│   env.example                       # ENV file with credentials
├── playwright.config.js              # Playwright configuration
├── package.json                      # Project dependencies
└── README.md                         # This file
Installation
Clone or create the project folder:
git clone https://github.com/oleksiiLevchenko727/aqa-inforce-oleksii.git 
cd aqa-inforce-oleksii
Install dependencies:
npm install
Install Playwright browsers:
npx playwright install
setup create on the root .env file, base on data from .env.example
Test Functionality
This project covers end-to-end, integration, and validation testing for the hotel booking system.
UI tests are executed sequentially to verify the booking forms functionality and validation rules.
API tests failing: Verify that the Admin and User APIs are available. Check authentication credentials and tokens.Set

Useful Commands:

Check Playwright version

npx playwright --version

npm run test  #Run all UI tests
```