# Photo Album Web Application Front-End

**Built by**: 
- Siddharth Vijay
- Maansi Shroff

This repository handles the front end for an AI Photo Search that uses NLP and Speech Recognition to search through photos stored in S3. The services in use include:
- API Gateway
- OpenSearch
- AWS Lambda
- S3
- Amazon Lex
- AWS Recognition
- Web Speech API

## Microphone Setup for Google Chrome

To allow for microphone use, especially on Google Chrome, follow the steps below:

1. Navigate to `chrome://flags/#unsafely-treat-insecure-origin-as-secure` in Chrome.
2. Find and enable the `Insecure origins treated as secure` section.
3. Add any addresses you want to ignore the secure origin policy for. In this case, add `http://aiphotos-hw2.s3-website-us-east-1.amazonaws.com`.
4. Relaunch Chrome to save the changes.
5. When prompted by a pop-up on the page, allow the microphone to have access.
