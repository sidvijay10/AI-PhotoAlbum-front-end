Read Me for Photo Album Web Application

Built by Siddharth Vijay (sv2637) and Maansi Shroff (ms6161)

This github handles the front end for an AI Photo Search that uses NLP and Speech Recognition to search through photos stored in S3. The services in use are API Gateway, OpenSearch, AWS Lambda, S3, Amazon Lex, AWS Recognition, and a Web Speech API.

To allow for microphone use, especially on Google Chrome, add the following steps:
1. Navigate to `chrome://flags/#unsafely-treat-insecure-origin-as-secure` in Chrome.
2. Find and enable the `Insecure origins treated as secure` section
3. Add any addresses you want to ignore the secure origin policy for. In this case, we add http://aiphotos-hw2.s3-website-us-east-1.amazonaws.com.
4. Relaunch Chrome to save the changes and allow the microphone to have access when prompted by a pop up on the page.
