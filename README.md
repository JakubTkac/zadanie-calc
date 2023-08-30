# zadanie-calc
Kalkulacka je rozdelena na 2 casti /frontend /backend

na frontend bol pouzity JS kniznica React na backend nodeJS framework NestJS

# Instalacia

## 1.

1. cd backend
2. npm i
3. npm run start

4. localhost:3000

## 2.

1. cd frontend
2. npm i
3. npm run build
4. npm run preview

5. localhost:4173

# Backend API

prekonvertovany XML do JSON sa nachadza na adrese localhost:3000/EU

na fetchnutie dat je potreba pridat api key do query URL ktory sa nachadza v api-key guard "f32e39c8-caeb-4444-bca0-1b1a6efb4b34" 

http://localhost:3000/EU?api-key=f32e39c8-caeb-4444-bca0-1b1a6efb4b34

data v rates[] Arr sa daju filtrovat pomocou currency="rates.name" alebo rate="rates.rate" operacia pre rate ide taktiez zmenit pomocou dalsieho query filtra operation="$gt|$lt|$eq" defaultne je nsatavena greater Then

http://localhost:3000/EU?api-key=f32e39c8-caeb-4444-bca0-1b1a6efb4b34&rate=158&currency=J
