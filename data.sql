USE mailmanagejs;

INSERT INTO post(post_id,post,discription) VALUES(1,'administrator','Person who manage the site');
INSERT INTO  recipient(email,user_password,recip_name,post_id) VALUES('admin@email.com','admin12345','admin',1);

