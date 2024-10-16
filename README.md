# Employee API

NodeJS/Express Employee API to MongoDB Atlas

Uses API Key Authentication

Add a .env file to your NodeJS project to contain your API Key list and MongoDB username and password

```
MONGODBUSERNAME={{MongoDB Atlas username}}
MONGODBPASSWORD={{MongoDB Atlas password}}
API_KEYS={{apikey1}},{{apikey2}}, ...
```

Replace the MongoDB connection string in index.js with your MongoDB connection string

## Find All Employees

```bash
curl --location '{{BASEURL}}/employees' \
--header 'x-api-key: {{APIKEY}}'
```

## Find Employee By Id

```bash
curl --location '{{BASEURL}}/employees/670d632c840ce1ca9fdc38bc' \
--header 'x-api-key: {{APIKEY}}'
```

## Create Employee

```bash
curl --location '{{BASEURL}}/employees' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {{APIKEY}}' \
--data '{
  "name": "Juan O'\''Shevlan",
  "position": "Associate Professor",
  "department": "Engineering",
  "salary": 112477
}'
```

## Update Employee

```bash
curl --location --request PUT '{{BASEURL}}/employees/670d632c840ce1ca9fdc38bc' \
--header 'Content-Type: application/json' \
--header 'x-api-key: {{APIKEY}}' \
--data '{
    "name": "Philippine Mateev",
    "position": "Recruiting Manager",
    "department": "Accounting",
    "salary": 249999
}'
```

## Delete Employee

```bash
curl --location --request DELETE '{{BASEURL}}/employees/670d632c840ce1ca9fdc38bc' \
--header 'x-api-key: {{APIKEY}}'
```
