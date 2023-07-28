# Introduction of Project

This is Webhook URL. Here, I only introduced one API for this , which accept post request with secert key in Headers.

Based on that secert key my program do work further if key doesn't match then it will return 401 error otherwise it will proced further and send the notification in telegram.

---

# Setup

1. Clone the repo and run the command

   > npm install
   >
2. create a .env file and make these following variables with your values.

   1. TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   2. TELEGRAM_CHAT_ID=your_group_chat_id
   3. SECERTKEY=your_secert_key
3. Run the command

   > node index.js
   >
4. Hit the post request on api "/trading" with the your secert key in Headers. Your request header must contain following variable.

   ```
   x-secert = your_secert_key
   ```
