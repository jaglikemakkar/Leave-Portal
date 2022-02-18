CREATE TABLE user(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    username VARCHAR(30) UNIQUE,
    position VARCHAR(10),
    department VARCHAR(10),
    total_leaves INTEGER,
    available_leaves INTEGER
);

CREATE TABLE leaves(
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    nature VARCHAR(10),
    purpose VARCHAR(200),
    is_station INT,
    request_date TIMESTAMP,
    start_date_of TIMESTAMP,
    authority_comment VARCHAR(200),
    duration_of_leave INT,
    status INT,
    level INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE log(

);

CREATE TABLE user_auth(
    username VARCHAR(30) PRIMARY KEY
);
