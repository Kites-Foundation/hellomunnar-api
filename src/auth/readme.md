# Auth  Module
## Schema
```
users (tableName)
{
    id              : string
    name            : String
    username        : string
    email           : string
    password        : String (sha256 + Salt)
    token           : String (unique)
    googleId        : string
    googleImageUrl  : string
    facebookId      : string
    facebookImageurl: string
    status          : String
    type            : string
    sex             : string
    contactNumber   : string
    location        : string
    lastLogin       : DateTime
    createdAt       : DateTime
}
```

## Service Interfaces

```
authService.register(email,password);
authService.login(email,password);
authService.forgotPassword(email);
authService.resetPassword(token,newPassword,confirmPassword);
authService.changePassword(currentpassword,newPassword,confirmPassword) 
googleService(Google Social Auth)
```

## Api Interaces
```
GET /auth/user
POST /auth/login
POST /auth/register
GET /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
PUT /auth/change-password

```
