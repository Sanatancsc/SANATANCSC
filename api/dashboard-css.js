/*-------------------- Root Variables --------------------*/
:root {
  --primary-color: #4caf50;
  --primary-dark: #388e3c;
  --secondary-color: #333;
  --accent-color: #666;
  --light-bg: #f4f4f4;
  --white: #fff;
  --shadow: rgba(0, 0, 0, 0.1);
  --font-main: 'Inter', Arial, sans-serif;
}

/*-------------------- Base Styles --------------------*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-main);
  background-color: var(--light-bg);
  transition: background-color 0.3s ease;
  animation: bodyFadeIn 0.6s ease-in;
  scroll-behavior: smooth;
}

@keyframes bodyFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/*-------------------- Navbar --------------------*/
.navbar {
  width: 100%;
  background-color: var(--secondary-color);
  padding: 15px 0;
  text-align: center;
  box-shadow: 0 2px 5px var(--shadow);
  animation: slideDown 0.5s ease-out both;
}

@keyframes slideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.navbar h1 {
  color: var(--white);
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/*-------------------- Container --------------------*/
.container {
  background-color: var(--white);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px var(--shadow);
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin: 100px auto 20px auto;
  animation: fadeInScale 0.7s ease-out both;
}

@keyframes fadeInScale {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

/*-------------------- Input Group --------------------*/
.input-group {
  margin-bottom: 25px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: var(--secondary-color);
  transition: color 0.3s ease;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

input[type="text"]:hover,
input[type="password"]:hover {
  border-color: #aaa;
}

/*-------------------- Button --------------------*/
button {
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
  color: var(--white);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-family: var(--font-main);
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.25s ease, transform 0.15s ease, filter 0.2s ease;
  animation: fadeInScale 0.7s ease both;
}

button:hover {
  background: linear-gradient(90deg, #45a049, #2e7d32);
  transform: translateY(-2px) scale(1.03);
  filter: brightness(1.1);
}

button:active {
  animation: buttonPress 0.1s ease-in-out;
  filter: blur(1px) brightness(1.05);
}

@keyframes buttonPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.96); }
  100% { transform: scale(1); }
}

/*-------------------- Error Message --------------------*/
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
  opacity: 0;
  animation: errorFadeIn 0.5s forwards;
}

@keyframes errorFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/*-------------------- Dashboard Layout --------------------*/
.dashboard-container {
  display: flex;
  height: 100vh;
  transition: background-color 0.3s ease;
}

/*-------------------- Sidebar --------------------*/
.sidebar {
  width: 250px;
  background-color: #444;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  animation: slideInLeft 0.6s ease both;
}

@keyframes slideInLeft {
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 20px;
}

.sidebar ul li a {
  display: block;
  padding: 10px;
  background: linear-gradient(90deg, #555, #444);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.sidebar ul li a:hover {
  background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
  transform: translateX(5px);
}

/*-------------------- Content --------------------*/
.content {
  flex-grow: 1;
  padding: 20px;
  background-color: var(--white);
  box-shadow: 0 4px 8px var(--shadow);
  border-radius: 10px;
  animation: fadeInContent 0.6s ease both;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

@keyframes fadeInContent {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.content:hover {
  background-color: #f9f9f9;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/*-------------------- Responsive --------------------*/
@media (max-width: 100px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    box-shadow: none;
  }

  .container {
    margin: 60px 16px;
    padding: 20px;
    width: 95%;
  }

  button {
    width: 100%;
  }
}
