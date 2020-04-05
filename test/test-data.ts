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
    firstname: 'John',
    lastname: 'Smith',
    gender: Gender.male,
    birthday: '1986-07-17',
};

export const createUserDto2 = {
    email: 'testemail@gmail.com',
    password: 'password123',
    lastname: 'Smith',
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
    firstname: 'John',
    lastname: 'Smith',
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
    firstname: 'Zbigniew',
    lastname: 'Stonoga',
    specialization: Specialist.urolog
};

export const createDoctorDto2: CreateDoctorDto = {
    numberPwz: '14882137',
    firstname: 'Mark',
    lastname: 'Sloan',
    specialization: Specialist.chirurg_ogólny,
};

export const createDoctorDto3: any = {
    numberPwz: '7654321',
    firstname: 'Alfred',
    lastname: 'Zygrfryd',
    specialization: 'test',
};

export const createDoctorDto4: CreateDoctorDto = {
    numberPwz: '1234568',
    firstname: 'Zorak',
    lastname: 'Zorakowsi',
    specialization: Specialist.dermatolog,
};


export const createPantientDto1: CreatePantientDto = {
    firstname: 'Sweet',
    lastname: 'Johnson',
    postcode: 'SE-3PG',
    street: 'Grove Street',
    city: 'San Andreas',
    phone: '729141234',
    pesel: '10987654321',
};

export const createPantientDto2: CreatePantientDto = {
    firstname: 'Carl',
    lastname: 'Johnson',
    postcode: 'SE-3PG',
    street: 'Grove Street',
    city: 'San Andreas',
    phone: '666667668',
    pesel: '12345678910',
};

export const createPantientDto3: CreatePantientDto = {
    firstname: 'Ayn',
    lastname: 'Rand',
    postcode: '10-001',
    street: 'Kensico Cemetery Valhalla',
    city: 'New York',
    phone: '444333222',
    pesel: '43020211111',
};

export const createPantientDto4: CreatePantientDto = {
    firstname: 'Ludwig',
    lastname: 'von Misses',
    postcode: '89-ABC',
    street: 'Captializm Street',
    city: 'Wien',
    phone: '111333999',
    pesel: '1231233219',
};

export const createPantientDto5: CreatePantientDto = {
    firstname: '',
    lastname: '',
    postcode: '',
    street: '',
    city: '',
    phone: '',
    pesel: '',
};

export const createScheduleDto1: CreateScheduleDto = {
    doctorId: 2,
    dayOfWeek: 1,
    hourOpen: '12:00',
    hourClose: '14:00',

};


export const createScheduleDto2: CreateScheduleDto = {
    doctorId: 1,
    dayOfWeek: 3,
    hourOpen: '12:00',
    hourClose: '14:00',

};
export const createScheduleDto3: CreateScheduleDto = {
    doctorId: 1,
    dayOfWeek: 8,
    hourOpen: '08:00',
    hourClose: '16:00',

};

export const createScheduleDto4: CreateScheduleDto = {
    doctorId: 2,
    dayOfWeek: 1,
    hourOpen: '08:00',
    hourClose: '14:00',

};

export const createScheduleDto5: CreateScheduleDto = {
    doctorId: 1,
    dayOfWeek: 5,
    hourOpen: '13:00',
    hourClose: '16:00',

};
export const createScheduleDto6: CreateScheduleDto = {
    doctorId: 1,
    dayOfWeek: 4,
    hourOpen: '10:00',
    hourClose: '11:00',

};

export const createScheduleDto7: CreateScheduleDto = {
    doctorId: 3,
    dayOfWeek: 4,
    hourOpen: '06:00',
    hourClose: '07:20',

};

export const createScheduleDto8: CreateScheduleDto = {
    doctorId: 4,
    dayOfWeek: 3,
    hourOpen: '19:00',
    hourClose: '21:00',

};

export const createVisitDto1: CreateVisitDto = {
    doctorId: 2,
    pantientId: 2,
    date: new Date('2019-11-04T12:50:57'),
    description: 'need operation of brain'
};

export const createVisitDto2: CreateVisitDto = {
    doctorId: 1,
    pantientId: 1,
    date: new Date('2019-11-06T13:20:57'),
    description: 'consultation'
};

export const createVisitDto3: CreateVisitDto = {
    doctorId: 1,
    pantientId: 1,
    date: new Date('2019-11-05T14:11:57'),
    description: 'consultation'
};

export const responseVisit: any = {
    date: "2019-11-06T12:20:57.000Z",
    description: "consultation",
    doctorfirstname: "Zbigniew",
    doctorId: "1",
    doctorLastname: "Stonoga",
    pantientfirstname: "Sweet",
    pantientId: "1",
    pantientLastname: "Johnson",
};