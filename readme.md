# GoIT Node.js Course Template Homework

Даний бекенд призначений для реєстрації користувачів і роботи із
колекціями контактів. Запускається на порті 3000. В якості бази
даних використано MongoDB.

Бібліотеки використані при розробці:

- "@sendgrid/mail": "^7.7.0",
- "bcryptjs": "^2.4.3",
- "cors": "2.8.5",
- "cross-env": "7.0.3",
- "dotenv": "^16.0.1",
- "express": "4.17.1",
- "gravatar": "^1.8.2",
- "jimp": "^0.16.1",
- "joi": "^17.6.0",
- "jsonwebtoken": "^8.5.1",
- "mongoose": "^6.5.2",
- "morgan": "1.10.0",
- "multer": "^1.4.5-lts.1",
- "nanoid": "^3.3.4"

## Команди CLI

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## API

### User

Користувачі зберігаються в базі у наступному вигляді:

```bash
_id: <user id>
email: <user email>
password: <user password>
subscription: <user subscription>
avatarURL: <user avatar>
token: null
verify: true
verificationToken: null
createdAt: <date/time>
updatedAt: <date/time>
```

Реєстрація нового користувача &mdash; POST запит на адресу
http://localhost:3000/api/users/signup
Обов'язкові поля - email, password.
Варіанти для subscription &mdash; "starter", "pro", "business".
За замовчуванням subscription: "starter".
Тіло запиту (JSON):

```bash
{
    "email": <user email>,
    "password": <user password>,
    "subscription": <user subscription>
}
```

Вхід в систему (login) &mdash; POST запит на адресу
http://localhost:3000/api/users/login

Тіло запиту JSON (обов'язкові поля - email, password):

```bash
{
    "email": <user email>,
    "password": <user password>
}
```

При успішному запиті у відповідь бекенд повертає токен авторизації "Bearer token".

Вихід із системи (logout) &mdash; GET запит на адресу
http://localhost:3000/api/users/logout
В заголовках необхідно додати токен авторизації
Bearer token: <token>

Отримання інформації про поточного користувача &mdash;
GET запит на адресу
http://localhost:3000/api/users/current
В заголовках необхідно додати токен авторизації
Bearer token: <token>

Зміна типу підписки &mdash; PATCH запит на адресу
http://localhost:3000/api/users/
В заголовках необхідно додати токен авторизації
Bearer token: <token>
Тіло запиту (JSON) &mdash; новий тип підписки.
Варіанти для subscription -"starter", "pro", "business"

```bash
{
    "subscription": <new user subscription>
}
```

Зміна аватару користувача &mdash; PATCH запит на адресу
http://localhost:3000/api/users/avatars
В заголовках необхідно додати токен авторизації
Bearer token: <token>.
Тіло запиту &mdash; файл з новою аватаркою.

Верифікація пошти користувача при реєстрації &mdash;
GET запит на адресу
http://localhost:3000/api/users/verify/:verificationToken
Дане посилання буде відправлене користувачу на email,
вказаний при реєстрації.

Повторна відправка листа для верифікації email &mdash;
POST запит на адресу
http://localhost:3000/api/users/verify
Тіло запиту (JSON) &mdash; email користувача.

```bash
{
    "email": <user email>
}
```

### Contacts

Контакти зберігаються в базі у наступному вигляді:

```bash
_id: <contact id>
name: <name>
email: <email>
phone: <phone>
favorite: <true/false>
owner: <user id>
createdAt: <date/time>
updatedAt: <date/time>
```

Робота з колекціями контактів доступна лише для авторизованих
користувачів. Кожен користувач може працювати лише зі
своєю колекцією.
Всі маршрути є захищеними і при запитах в заголовках необхідно додавати токен авторизації &mdash; Bearer token: <token>.

Отримання колекції контактів &mdash; GET запит на адресу
http://localhost:3000/api/contacts/

Отримання одного контакту &mdash; GET запит на адресу
http://localhost:3000/api/contacts/:contactId

Видалення контакту з колекції &mdash; DELETE запит на адресу
http://localhost:3000/api/contacts/:contactId

Додавання контакту в колекцію &mdash; POST запит на адресу
http://localhost:3000/api/contacts/
Тіло запиту JSON (Обов'язкове поле - name):

```bash
{
  "name": <name>,
  "email": <email>,
  "phone": <phone>,
  "favorite": <true/false>
}
```

Редагування контакту &mdash; PUT запит на адресу
http://localhost:3000/api/contacts/:contactId
Тіло запиту JSON (Обов'язкове поле - name):

```bash
{
  "name": <name>,
  "email": <email>,
  "phone": <phone>,
  "favorite": <true/false>
}
```

Зміна параметру "favorite" &mdash; PATCH запит на адресу
http://localhost:3000/api/contacts/:contactId/favorite
Тіло запиту JSON (Обов'язкове поле - favorite):

```bash
{
  "favorite": <true/false>
}
```
