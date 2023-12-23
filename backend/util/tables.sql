--user table 

CREATE TABLE IF NOT EXISTS users (
   userid SERIAL PRIMARY KEY,
   username VARCHAR(100) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
   gender VARCHAR(10),
   phone VARCHAR(20) NOT NULL,
   password VARCHAR(255) NOT NULL,
   adharCardNo VARCHAR(12) UNIQUE,
   bloodGroup VARCHAR(3),
   age INT,
   weight VARCHAR(20),
   CHECK (gender in ('male', 'female', 'others'))
);

-- activity table 

CREATE TABLE IF NOT EXISTS activity(
   activityId SERIAL PRIMARY KEY,
   activityName VARCHAR(255) NOT NULL,
   distance VARCHAR(255) NOT NULL,
   time TIME NOT NULL,
   userid INT REFERENCES users(userId)
);