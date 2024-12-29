-- 用户信息表
CREATE TABLE IF NOT EXISTS Users (
    UserID BIGINT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50),
    Gender VARCHAR(10),
    Birthdate DATE,
    ContactInfo VARCHAR(100),
    Password VARCHAR(32) -- 使用MD5加密后的密码
);

-- 心理健康档案表
CREATE TABLE IF NOT EXISTS PsychologicalRecords (
    RecordID INT PRIMARY KEY,
    UserID BIGINT,
    CreateDate DATE,
    UpdateDate DATE,
    PsychologicalStatus TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- 预约记录表
CREATE TABLE IF NOT EXISTS Appointments (
    AppointmentID INT PRIMARY KEY,
    UserID BIGINT,
    CounselorID INT,
    AppointmentDate DATE,
    AppointmentTime TIME,
    AppointmentStatus VARCHAR(20),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CounselorID) REFERENCES Counselors(CounselorID)
);

-- 咨询记录表
CREATE TABLE IF NOT EXISTS CounselingRecords (
    RecordID INT PRIMARY KEY,
    AppointmentID INT,
    StartTime TIME,
    EndTime TIME,
    Content TEXT,
    CounselorFeedback TEXT,
    FOREIGN KEY (AppointmentID) REFERENCES Appointments(AppointmentID)
);

-- 心理咨询师表
CREATE TABLE IF NOT EXISTS Counselors (
    CounselorID INT PRIMARY KEY,
    Name VARCHAR(50),
    Gender VARCHAR(10),
    Birthdate DATE,
    ContactInfo VARCHAR(100),
    CertificationNumber VARCHAR(50),
    SpecialtyArea VARCHAR(100),
    Department VARCHAR(100)
);

-- 咨询师登录表
CREATE TABLE IF NOT EXISTS CounselorLogins (
    LoginID INT PRIMARY KEY,
    CounselorID INT,
    Username VARCHAR(50),
    Password VARCHAR(32), -- 使用MD5加密后的密码
    LastLoginDateTime DATETIME,
    IsAdmin BOOLEAN DEFAULT FALSE;
    FOREIGN KEY (CounselorID) REFERENCES Counselors(CounselorID)
);
