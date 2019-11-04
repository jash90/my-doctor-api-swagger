import { UserLoginRequestDto } from './../src/users/dto/user-login-request.dto';
import { UpdateUserDto } from './../src/users/dto/update-user.dto';
import { UserLoginResponseDto } from './../src/users/dto/user-login-response.dto';
import { UserDto } from './../src/users/dto/user.dto';
import { Gender, Specialist } from '../src/shared/enum/enums';
import { CreateUserDto } from './../src/users/dto/create-user.dto';
import { CreateDoctorDto } from '../src/doctors/dto/create-doctor.dto';
import { CreatePantientDto } from '../src/pantients/dto/create-pantient.dto';
import { CreateScheduleDto } from '../src/schedules/dto/create-schedule.dto';
import { CreateVisitDto } from '../src/visits/dto/create-visit.dto';

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

export const createDoctorDto1: CreateDoctorDto = {
    numberPwz: '1234567',
    firstName: 'Zbigniew',
    lastName: 'Stonoga',
    specialization: Specialist.urolog
};

export const CreateDoctorDto2: CreateDoctorDto = {
        numberPwz: '14882137',
        firstName: 'Mark',
        lastName: 'Sloan',
        specialization: Specialist.chirurg_ogólny,
};

export const CreateDoctorDto3: CreateDoctorDto = {
    numberPwz: '7654321',
    firstName: 'Alfred',
    lastName: 'Zygrfryd',
    specialization: Specialist.diabetolog,
};

export const CreateDoctorDto4: CreateDoctorDto = {
    numberPwz: '1234568',
    firstName: 'Zorak',
    lastName: 'Zorakowsi',
    specialization: Specialist.dermatolog,
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
};

export class DoctorResponse extends CreateDoctorDto{
    id: number;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
}
export const CreatePantientDto3: CreatePantientDto ={
    firstName: 'Karl',
    lastName: 'Marx',
    postcode: 'CC-CP1',
    street: 'Karl Marx St.',
    city: 'Tier',
    phone: '444333222',
    pesel: '05051811111',
};

export const CreatePantientDto4: CreatePantientDto ={
    firstName: 'Ludwig',
    lastName: 'von Misses',
    postcode: '89-ABC',
    street: 'Captializm Street',
    city: 'Wien',
    phone: '111333999',
    pesel: '1231233219',
};

export const CreateScheduleDto1: CreateScheduleDto ={
    doctorId: 2,
    lastName: 'Sloan',
    dayOfWeek: 1,
    hourOpen:'12:00',
    hourClose:'14:00',

};


export const CreateScheduleDto2: CreateScheduleDto ={
    doctorId: 2,
    lastName: 'Sloan',
    dayOfWeek: 2,
    hourOpen:'12:00',
    hourClose:'14:00',

};
export const CreateScheduleDto3: CreateScheduleDto ={
    doctorId: 1,
    lastName: 'Stonoga',
    dayOfWeek: 3,
    hourOpen:'08:00',
    hourClose:'16:00',

};

export const CreateScheduleDto4: CreateScheduleDto ={
    doctorId: 2,
    lastName: 'Sloan',
    dayOfWeek: 1,
    hourOpen:'08:00',
    hourClose:'14:00',

};

export const CreateScheduleDto5: CreateScheduleDto ={
    doctorId: 1,
    lastName: 'Stonoga',
    dayOfWeek: 5,
    hourOpen:'13:00',
    hourClose:'16:00',

};
export const CreateScheduleDto6: CreateScheduleDto ={
    doctorId: 1,
    lastName: 'Stonoga',
    dayOfWeek: 4,
    hourOpen:'10:00',
    hourClose:'11:00',

};

export const CreateScheduleDto7: CreateScheduleDto ={
    doctorId: 3,
    lastName: 'Zorakowsi',
    dayOfWeek: 4,
    hourOpen:'06:00',
    hourClose:'07:20',

};

export const CreateScheduleDto8: CreateScheduleDto ={
    doctorId: 4,
    lastName: 'Zygrfryd',
    dayOfWeek: 3,
    hourOpen:'19:00',
    hourClose:'21:00',

};

export const CreateVisitDto1 : CreateVisitDto ={
    doctorId: 2,
    pantientId: 2,
    date: new Date('2019-11-04T12:50:57'),
    description: 'need operation of brain'
};

export const CreateVisitDto2 : CreateVisitDto ={
    doctorId: 2,
    pantientId: 1,
    date: new Date('2019-11-04T13:20:57'),
    description: 'consultation'
};

export const CreateVisitDto3 : CreateVisitDto ={
    doctorId: 1,
    pantientId: 3,
    date: new Date('2019-11-08T14:11:57'),
    description: 'consultation'
};

export const CreateVisitDto4 : CreateVisitDto ={
    doctorId: 1,
    pantientId: 4,
    date: new Date('2019-11-07T10:23:57'),
    description: 'consultation'
};
