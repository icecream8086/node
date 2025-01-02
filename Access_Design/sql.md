# SQL 表

### Table: `Appointments`

| Column             | Type         | Nullable | Default Value  |
|--------------------|--------------|----------|----------------|
| AppointmentID      | int          | NO       | AUTO_INCREMENT |
| UserID             | bigint       | YES      | NULL           |
| CounselorID        | int          | YES      | NULL           |
| AppointmentDate    | datetime     | YES      | NULL           |
| AppointmentTime    | datetime     | YES      | NULL           |
| AppointmentStatus  | varchar(20)  | YES      | NULL           |

### Table: `CounselingRecords`

| Column            | Type           | Nullable | Default Value |
|-------------------|----------------|----------|---------------|
| RecordID          | bigint unsigned| NO       | AUTO_INCREMENT|
| AppointmentID     | int            | YES      | NULL          |
| StartTime         | datetime       | YES      | NULL          |
| EndTime           | datetime       | YES      | NULL          |
| Content           | text           | YES      | NULL          |
| CounselorFeedback | text           | YES      | NULL          |

### Table: `CounselorLogins`

| Column            | Type           | Nullable | Default Value  |
|-------------------|----------------|----------|----------------|
| LoginID           | bigint         | NO       | AUTO_INCREMENT |
| CounselorID       | int            | YES      | NULL           |
| Username          | varchar(50)    | YES      | NULL           |
| Password          | varchar(32)    | YES      | NULL           |
| LastLoginDateTime | datetime       | YES      | NULL           |
| IsAdmin           | tinyint(1)     | NO       | '0'            |

### Table: `Counselors`

| Column              | Type          | Nullable | Default Value    |
|---------------------|---------------|----------|------------------|
| CounselorID         | int           | NO       | AUTO_INCREMENT   |
| Name                | varchar(50)   | YES      | NULL             |
| Gender              | varchar(10)   | YES      | NULL             |
| Birthdate           | date          | YES      | NULL             |
| ContactInfo         | varchar(100)  | YES      | NULL             |
| CertificationNumber | varchar(50)   | YES      | NULL             |
| SpecialtyArea       | varchar(100)  | YES      | NULL             |
| Department          | varchar(100)  | YES      | NULL             |

### Table: `PsychologicalRecords`

| Column               | Type           | Nullable | Default Value  |
|----------------------|----------------|----------|----------------|
| RecordID             | bigint unsigned| NO       | AUTO_INCREMENT |
| UserID               | bigint         | YES      | NULL           |
| CreateDate           | datetime       | YES      | NULL           |
| UpdateDate           | datetime       | YES      | NULL           |
| PsychologicalStatus  | text           | YES      | NULL           |

### Table: `Users`

| Column      | Type          | Nullable | Default Value    |
|-------------|---------------|----------|------------------|
| UserID      | bigint        | NO       | AUTO_INCREMENT   |
| Name        | varchar(50)   | YES      | NULL             |
| Gender      | varchar(10)   | YES      | NULL             |
| Birthdate   | date          | YES      | NULL             |
| Phone       | varchar(20)   | YES      | NULL             |
| Password    | varchar(32)   | YES      | NULL             |
| Email       | varchar(100)  | YES      | NULL             |
