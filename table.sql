USE mailmanagejs;

CREATE TABLE post(
    post_id INT PRIMARY KEY,
    post VARCHAR(255),
    discription VARCHAR(255)
);

CREATE TABLE recipient(
    email VARCHAR(50) PRIMARY KEY,
    user_password VARCHAR(50) NOT NULL,
    recip_name VARCHAR(100) NOT NULL,
    nick_name VARCHAR(50),
    post_id INT,
    birthday DATE,
    state INT
    FOREIGN KEY(post_id) REFERENCES post(post_id)
);

CREATE TABLE message_data(
    message_id INT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    heading VARCHAR(255),
    body VARCHAR(255),
    sent_date DATE,
    sent_time TIME,
    FOREIGN KEY(email) REFERENCES recipient(email)
);
