import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Types } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from '../src/modules/notes/notes.module';

describe('App (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;

    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), NotesModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
    await app.close();
  });

  describe('Notes', () => {
    const randomMongoId = new Types.ObjectId();
    let createdNoteId = '';

    describe('POST /notes', () => {
      it('should return 400 when no data was send', async () => {
        const res = await request(app.getHttpServer()).post('/notes');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBeInstanceOf(Array);
      });
      it('should return 400 when data is not correct', async () => {
        const res = await request(app.getHttpServer())
          .post('/notes')
          .send({ title: '', content: '' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBeInstanceOf(Array);
      });
      it('should return 201 when data is correct', async () => {
        const res = await request(app.getHttpServer())
          .post('/notes')
          .send({ title: 'title', content: 'content' });

        createdNoteId = res.body._id;

        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual('title');
        expect(res.body.content).toEqual('content');
        expect(res.body._id).toBeTruthy();
        expect(res.body.createdAt).toBeTruthy();
      });
    });

    describe('GET /notes', () => {
      it('should return 400 when no query was send', async () => {
        const res = await request(app.getHttpServer()).get('/notes');

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBeInstanceOf(Array);
      });
      it('should return 400 when query is not correct', async () => {
        const res = await request(app.getHttpServer())
          .get('/notes')
          .query({ itemsPerPage: -1, pageNumber: -1 });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBeInstanceOf(Array);
      });
      it('should return 200 when query is correct', async () => {
        const res = await request(app.getHttpServer())
          .get('/notes')
          .query({ itemsPerPage: 5, pageNumber: 1, title: 'title' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.content).toBeInstanceOf(Array);
        expect(res.body.content[0]._id).toEqual(createdNoteId);
        expect(res.body.searchParams).toEqual({
          itemsPerPage: 5,
          pageNumber: 1,
        });
        expect(res.body.totalItems).toEqual(1);
      });
    });

    describe('GET /notes/:id', () => {
      it('should return 400 when id is no correct', async () => {
        const res = await request(app.getHttpServer()).get(`/notes/123`);

        expect(res.statusCode).toEqual(400);
      });
      it('should return 404 when note not exists', async () => {
        const res = await request(app.getHttpServer()).get(
          `/notes/${randomMongoId}`,
        );

        expect(res.statusCode).toEqual(404);
      });
      it('should return 200 when note exists', async () => {
        const res = await request(app.getHttpServer()).get(
          `/notes/${createdNoteId}`,
        );

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('title');
        expect(res.body.content).toEqual('content');
        expect(res.body._id).toEqual(createdNoteId);
        expect(res.body.createdAt).toBeTruthy();
      });
    });

    describe('PUT /notes/:id', () => {
      it('should return 400 when id is no correct', async () => {
        const res = await request(app.getHttpServer()).put(`/notes/123`);

        expect(res.statusCode).toEqual(400);
      });
      it('should return 400 when data no data was send', async () => {
        const res = await request(app.getHttpServer()).put(
          `/notes/${createdNoteId}`,
        );

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBeInstanceOf(Array);
      });
      it('should return 400 when wrong data data was send', async () => {
        const res = await request(app.getHttpServer())
          .put(`/notes/${createdNoteId}`)
          .send({ title: '', content: '' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBeInstanceOf(Array);
      });
      it('should return 200 when id & data is correct', async () => {
        const res = await request(app.getHttpServer())
          .put(`/notes/${createdNoteId}`)
          .send({ title: 'new-title', content: 'new-content' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('new-title');
        expect(res.body.content).toEqual('new-content');
        expect(res.body._id).toEqual(createdNoteId);
        expect(res.body.createdAt).toBeTruthy();
      });
      it('should return 200 when data is correct & create new note', async () => {
        const res = await request(app.getHttpServer())
          .put(`/notes/${randomMongoId}`)
          .send({ title: 'title2', content: 'content2' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('title2');
        expect(res.body.content).toEqual('content2');
        expect(res.body._id).not.toEqual(createdNoteId);
        expect(res.body.createdAt).toBeTruthy();
      });
    });

    describe('DELETE /notes/:id', () => {
      it('should return 400 when id is no correct', async () => {
        const res = await request(app.getHttpServer()).delete(`/notes/123`);

        expect(res.statusCode).toEqual(400);
      });
      it('should return 404 when there is no note to remove', async () => {
        const id = new Types.ObjectId();
        const res = await request(app.getHttpServer()).delete(`/notes/${id}`);

        expect(res.statusCode).toEqual(404);
      });
      it('should return 200 when there note was removed', async () => {
        const res = await request(app.getHttpServer()).delete(
          `/notes/${createdNoteId}`,
        );

        expect(res.statusCode).toEqual(200);
      });
    });
  });
});
