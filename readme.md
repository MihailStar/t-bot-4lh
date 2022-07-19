# Учебный Telegram бот «T Bot 4LH»

## Установка

```bash
npm install

echo -e "\
NODE_ENV = <'development'> | <'production'>\n\
BOT_TOKEN = <bot_token>\n\
DB_URL = <db_url>/t_bot_4lh\
" > ./.env

# либо

cat > ./.env << EOF
NODE_ENV = <'development'> | <'production'>
BOT_TOKEN = <bot_token>
DB_URL = <db_url>/t_bot_4lh
EOF
```

```sql
CREATE DATABASE "t_bot_4lh";
```

## Запуск

```bash
npm start
```
