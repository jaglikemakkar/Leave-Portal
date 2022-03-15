CREATE TABLE user(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    email_id VARCHAR(50) UNIQUE,
    position VARCHAR(30),
    department VARCHAR(10),
    total_leaves INTEGER,
    available_leaves INTEGER
);

CREATE TABLE leaves(
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(10),
    user_id INT,
    nature VARCHAR(10),
    purpose VARCHAR(200),
    is_station VARCHAR(10),
    request_date TIMESTAMP,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    authority_comment VARCHAR(200),
    duration INT,
    status VARCHAR(30),
    level VARCHAR(30),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- CREATE TABLE log(

-- );

CREATE TABLE user_auth(
    email_id VARCHAR(50) PRIMARY KEY
);
