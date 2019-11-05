import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from './../src/shared/config/config.service';
import { User } from './../src/users/user.entity';
import {
    createUserDto1,
    createUserDto2,
    userLoginResponseDto1,
    createUserDto3,
    createUserDto4,
    createUserDto5,
    userLoginRequestDto1,
    userLoginRequestDto2,
    userLoginRequestDto3,
    createDoctorDto1,
    createDoctorDto2,
    createDoctorDto3,
    createDoctorDto4,
    createVisitDto1,
    createPantientDto1,
    createPantientDto5,
    createScheduleDto1,
    createScheduleDto2,
    createScheduleDto3,
    createVisitDto2,
    createVisitDto3,
    responseVisit
} from './test-data';
import { Doctor } from './../src/doctors/doctor.entity';
import { Pantient } from './../src/pantients/pantient.entity';
import { Schedule } from './../src/schedules/schedule.entity';
import { Visit } from './../src/visits/visit.entity';

import { } from "should";

describe('/', () => {
    let app: INestApplication;
    let sequelize: Sequelize;
    let userId: string;
    let token: string;

    beforeAll(async () => {
        //     process.env.NODE_ENV = 'test';
        const module = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: 'SEQUELIZE',
                    useFactory: (configService: ConfigService) => {
                        sequelize = new Sequelize(
                            configService.sequelizeOrmConfig,
                        );

                        sequelize.addModels([User, Doctor, Pantient, Schedule, Visit]);

                        return sequelize;
                    },
                    inject: [ConfigService],
                },
            ],
        }).compile();

        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    describe('/models', () => {

        it('should return 400 if email is not valid', () => {
            return request(app.getHttpServer())
                .post('/users/register')
                .send(createUserDto3)
                .expect(HttpStatus.BAD_REQUEST);
        });

        it('should return 400 if birthday is not ISO 8601 date string', () => {
            return request(app.getHttpServer())
                .post('/users/register')
                .send(createUserDto4)
                .expect(HttpStatus.BAD_REQUEST);
        });

        it('should return 400 if gender is not a valid enum value', () => {
            return request(app.getHttpServer())
                .post('/users/register')
                .send(createUserDto5)
                .expect(HttpStatus.BAD_REQUEST);
        });

        it('should return 400 if any of the required fields is missing', () => {
            return request(app.getHttpServer())
                .post('/users/register')
                .send(createUserDto2)
                .expect(HttpStatus.BAD_REQUEST);
        });

        it('should return 201 if user is created', () => {
            return request(app.getHttpServer())
                .post('/users/register')
                .send(createUserDto1)
                .expect(HttpStatus.CREATED)
                .expect(res => {
                    userId = res.body.id;
                    userLoginResponseDto1.id = res.body.id;
                    userLoginResponseDto1.token = res.body.token;
                    expect(res.body).toEqual(userLoginResponseDto1);
                });
        });

        it('should return 409 if user with given email already exists', () => {
            return request(app.getHttpServer())
                .post('/users/register')
                .send(createUserDto1)
                .expect(HttpStatus.CONFLICT);
        });

        it('should return 200 and jwt token', () => {
            return request(app.getHttpServer())
                .post('/users/login')
                .send(userLoginRequestDto1)
                .expect(HttpStatus.OK)
                .expect(res => {
                    token = res.body.token;
                    userLoginResponseDto1.id = res.body.id;
                    userLoginResponseDto1.token = token;
                    expect(res.body).toEqual(userLoginResponseDto1);
                });
        });

        it('should return 400 when user with given email not found', () => {
            return request(app.getHttpServer())
                .post('/users/login')
                .send(userLoginRequestDto2)
                .expect(HttpStatus.BAD_REQUEST);
        });

        it('should return 400 when wrong password inserted', () => {
            return request(app.getHttpServer())
                .post('/users/login')
                .send(userLoginRequestDto3)
                .expect(HttpStatus.BAD_REQUEST);
        });
        it('should return 400 when no data sent', () => {
            return request(app.getHttpServer())
                .post('/users/login')
                .send({})
                .expect(HttpStatus.BAD_REQUEST);
        });

        const loginUser = (token) => {
            return function (done) {
                request(app.getHttpServer())
                    .post('/users/login')
                    .send(userLoginRequestDto1)
                    .expect(HttpStatus.OK)
                    .expect(200)
                    .end(onResponse);

                function onResponse(err, res) {
                    token = res.body.token;
                    return done();
                }
            };
        }
        beforeEach(loginUser(token));

        it('create doctor', () => {
            return request(app.getHttpServer())
                .post('/doctors')
                .set('Authorization', 'Bearer ' + token)
                .send(createDoctorDto1)
                .expect(res => {
                    let createdDoctor: any = Object.assign({}, createDoctorDto1);
                    let { id, createdAt, updatedAt, deletedAt } = res.body;
                    createdDoctor.id = id;
                    createdDoctor.createdAt = createdAt;
                    createdDoctor.updatedAt = updatedAt;
                    createdDoctor.deletedAt = deletedAt;
                    expect(res.body).toEqual(createdDoctor);
                });
        });

        it('create pantient', () => {
            return request(app.getHttpServer())
                .post('/pantients')
                .set('Authorization', 'Bearer ' + token)
                .send(createPantientDto1)
                .expect(res => {
                    let createPantient: any = Object.assign({}, createPantientDto1);
                    let { id, createdAt, updatedAt, deletedAt } = res.body;
                    createPantient.id = id;
                    createPantient.createdAt = createdAt;
                    createPantient.updatedAt = updatedAt;
                    createPantient.deletedAt = deletedAt;
                    expect(res.body).toEqual(createPantient);
                });
        });

        it('create schedule', () => {
            return request(app.getHttpServer())
                .post('/schedules')
                .set('Authorization', 'Bearer ' + token)
                .send(createScheduleDto2)
                .expect(HttpStatus.CREATED)
                .expect(res => {
                    let createSchedule: any = Object.assign({}, createScheduleDto2);
                    let { id, createdAt, updatedAt, deletedAt } = res.body;
                    createSchedule.id = id;
                    createSchedule.doctorId = createScheduleDto2.doctorId.toString();
                    createSchedule.hourOpen += ":00";
                    createSchedule.hourClose += ":00";
                    createSchedule.createdAt = createdAt;
                    createSchedule.updatedAt = updatedAt;
                    createSchedule.deletedAt = deletedAt;
                    expect(res.body).toEqual(createSchedule);
                });
        });

        it('create visit', () => {
            return request(app.getHttpServer())
                .post('/visits')
                .set('Authorization', 'Bearer ' + token)
                .send(createVisitDto2)
                .expect(HttpStatus.CREATED)
                .expect(res => {
                    let createVisit: any = Object.assign({}, createVisitDto2);
                    let { id, createdAt, updatedAt, deletedAt, doctorId, pantientId, date } = res.body;
                    createVisit.id = id;
                    createVisit.doctorId = doctorId.toString();
                    createVisit.pantientId = pantientId.toString();
                    createVisit.date = date.toString();
                    createVisit.createdAt = createdAt;
                    createVisit.updatedAt = updatedAt;
                    createVisit.deletedAt = deletedAt;
                    expect(res.body).toEqual(createVisit);
                });
        });



        it('create schedule with not found doctor', () => {
            return request(app.getHttpServer())
                .post('/schedules')
                .set('Authorization', 'Bearer ' + token)
                .send(createScheduleDto1)
                .expect(HttpStatus.NOT_FOUND)
                .expect(res => {
                    expect(res.body.message).toEqual("Doctor not found");
                });
        });

        it('create pantient with empty data', () => {
            return request(app.getHttpServer())
                .post('/pantients')
                .set('Authorization', 'Bearer ' + token)
                .send(createPantientDto5)
                .expect(HttpStatus.BAD_REQUEST);
        });

        it('get list doctors', () => {
            return request(app.getHttpServer())
                .get('/doctors')
                .expect(HttpStatus.OK)
                .expect(res => {
                    let createdDoctor: any = Object.assign({}, createDoctorDto1);
                    createdDoctor.id = res.body[0].id;
                    expect(res.body).toEqual([createdDoctor]);
                });
        });

        it('specialization enum validation', async () => {
            return request(app.getHttpServer())
                .post('/doctors')
                .set('Authorization', 'Bearer ' + token)
                .send(createDoctorDto3)
                .expect(HttpStatus.BAD_REQUEST)
                .expect(res => {
                    expect(res.body.message[0].constraints.isEnum).toEqual('specialization must be a valid enum value');
                })
        });

        it('validation visit doctor or pantient dont exist', async () => {
            return request(app.getHttpServer())
                .post('/visits')
                .set('Authorization', 'Bearer ' + token)
                .send(createVisitDto1)
                .expect(HttpStatus.NOT_FOUND)
                .expect(res => {
                    expect(res.body.message).toEqual('Doctor not found');
                })
        });

        it('add visit when doctor not accept', () => {
            return request(app.getHttpServer())
                .post('/visits')
                .set('Authorization', 'Bearer ' + token)
                .send(createVisitDto3)
                .expect(HttpStatus.CONFLICT)
                .expect(res => {
                    expect(res.body.message).toEqual("Doctor nie przyjmuje danego dnia.");
                });
        });

        it('add schedule with incorrect dayOfWeek', () => {
            return request(app.getHttpServer())
                .post('/schedules')
                .set('Authorization', 'Bearer ' + token)
                .send(createScheduleDto3)
                .expect(HttpStatus.BAD_REQUEST)
                .expect(res => {
                    expect(res.body.message[0].constraints.max).toEqual("dayOfWeek must not be greater than 7");
                });
        });

        it('lista wizyt pacjenta', () => {
            return request(app.getHttpServer())
                .get('/visits/pantient/1')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.OK)
                .expect(res => {
                    responseVisit.id = res.body[0].id;
                    expect(res.body).toEqual([responseVisit]);
                });
        });

        it('pobranie wizyt i później pobranie danych pacjenta', () => {
            return request(app.getHttpServer())
                .get('/visits/doctor/1')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.OK)
                .expect(res => {
                    responseVisit.id = res.body[0].id;
                    expect(res.body).toEqual([responseVisit]);
                    request(app.getHttpServer())
                        .get(`/pantients/${responseVisit.pantientId}`)
                        .expect(HttpStatus.OK);
                });
        });

        it('=====', () => {
            return request(app.getHttpServer())
                .get('/doctors')
                .set('Authorization', 'Bearer ' + token)
                .expect(HttpStatus.OK)
                .expect(res => {
                    request(app.getHttpServer())
                        .get(`/visits/freeVisit/${res.body[0].id}`)
                        .expect(HttpStatus.OK)
                        .expect(res=>{
                            expect(res.body).toEqual(null);
                        })
                });
        });





    })

    afterAll(async done => {
        await app.close();
        await sequelize.drop();
        sequelize.close();
        done();
    });
});