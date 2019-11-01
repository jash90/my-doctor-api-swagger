import { UserLoginRequestDto } from './../src/users/dto/user-login-request.dto';
import { UpdateUserDto } from './../src/users/dto/update-user.dto';
import { UserLoginResponseDto } from './../src/users/dto/user-login-response.dto';
import { UserDto } from './../src/users/dto/user.dto';
import { Gender, Specialist } from '../src/shared/enum/enums';
import { CreateUserDto } from './../src/users/dto/create-user.dto';
import { CreateDoctorDto } from '../src/doctors/dto/create-doctor.dto';
<<<<<<< HEAD
import { CreatePantientDto } from '../src/pantients/dto/create-pantient.dto';
=======
>>>>>>> 0b4cf4c482582d090e3efe8b6f0520d839aa9a87

export const createUserDto1: CreateUserDto = {
    email: 'testemail@gmail.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Smith',
    gender: Gender.male,
    birthday: '1986-07-17',
};

export const createUserDto2 = {
    email: 'testemail@gmail.com',
    password: 'password123',
    lastName: 'Smith',
    gender: Gender.male,
    birthday: '1986-07-17',
};

export const createUserDto3 = {
    ...createUserDto1,
    email: 'not-email',
};

export const createUserDto4 = {
    ...createUserDto1,
    birthday: 'not-valid-date',
};

export const createUserDto5 = {
    ...createUserDto1,
    gender: 'not-valid-gender',
};

export const userLoginRequestDto1: UserLoginRequestDto = {
    email: createUserDto1.email,
    password: createUserDto1.password,
};

export const userLoginRequestDto2: UserLoginRequestDto = {
    email: 'wrong-email',
    password: createUserDto1.password,
};

export const userLoginRequestDto3: UserLoginRequestDto = {
    email: 'wrong-email',
    password: createUserDto1.password,
};

export const userDto1: UserDto = {
    id: 'uuid/v4',
    email: 'testemail@gmail.com',
    firstName: 'John',
    lastName: 'Smith',
    gender: Gender.male,
    birthday: '1986-07-17',
};

export const userLoginResponseDto1: UserLoginResponseDto = {
    ...userDto1,
    token: 'token',
};

export const updateUserDto1: UpdateUserDto = {
    gender: Gender.female,
    birthday: '1996-07-17',
};

export const userDto2: UserDto = {
    ...userDto1,
    gender: Gender.female,
    birthday: '1996-07-17',
};

<<<<<<< HEAD

export const CreateDoctorDto2: CreateDoctorDto = {
        numberPwz: '14882137',
        firstName: 'Mark',
        lastName: 'Sloan',
        specialization: 'chirurg_ogólny',
};

export const CreatePantientDto1: CreatePantientDto ={
    firstName: 'Sweet',
    lastName: 'Johnson',
    postcode: 'SE8-3PG',
    street: 'Grove Street',
    city: 'San Andreas',
    phone: '111222333',
    pesel: '10987654321',
};

export const CreatePantientDto2: CreatePantientDto ={
    firstName: 'Carl',
    lastName: 'Johnson',
    postcode: 'SE8-3PG',
    street: 'Grove Street',
    city: 'San Andreas',
    phone: '666667668',
    pesel: '12345678910',
=======
export const createDoctorDto1: CreateDoctorDto = {
    numberPwz: '1234567',
    firstName: 'Zbigniew',
    lastName: 'Stonoga',
    specialization: Specialist.urolog
>>>>>>> 0b4cf4c482582d090e3efe8b6f0520d839aa9a87
};
