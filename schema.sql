CREATE TABLE User(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30),
    username VARCHAR(30) UNIQUE,
    level INTEGER,
    department VARCHAR(10),
    total_leaves INTEGER,
    available_leaves INTEGER
)

CREATE TABLE Leaves(
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(30),
    nature VARCHAR(10),
    purpose VARCHAR(500),
    is_station BOOLEAN,
    request_date TIMESTAMP,
    start_date_of TIMESTAMP,
    authority_comment VARCHAR
    duration_of_leave INTEGER,
    status BOOLEAN,
    level INT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
)