CREATE TABLE submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL, -- In a real app, always hash this!
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);