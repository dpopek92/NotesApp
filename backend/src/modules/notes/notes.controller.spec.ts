import { Test, TestingModule } from '@nestjs/testing';
import { CreateNoteDto } from './dto/create-note.dto';
import { SearchNotesParamsDto } from './dto/search-notes-dto';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Types } from 'mongoose';

const mockCreate = jest.fn();
const mockFindAll = jest.fn();
const mockFindOne = jest.fn();
const mockUpdate = jest.fn();
const mockRemove = jest.fn();

const mockNotesService = {
  create: mockCreate,
  findAll: mockFindAll,
  findOne: mockFindOne,
  update: mockUpdate,
  remove: mockRemove,
};

const noteDto: CreateNoteDto = {
  title: 'title',
  content: 'content',
};
const noteSearchParams: SearchNotesParamsDto = {
  pageNumber: 1,
  itemsPerPage: 1,
};
const noteId = new Types.ObjectId().toString();

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    })
      .overrideProvider(NotesService)
      .useValue(mockNotesService)
      .compile();

    controller = module.get<NotesController>(NotesController);
  });
  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create note', () => {
    it('should call create', () => {
      controller.create(noteDto);
      expect(mockCreate).toHaveBeenCalled();
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith({
        title: 'title',
        content: 'content',
      });
    });
  });
  describe('find notes', () => {
    it('should call findAll', () => {
      controller.findAll(noteSearchParams);
      expect(mockFindAll).toHaveBeenCalled();
      expect(mockFindAll).toHaveBeenCalledTimes(1);
      expect(mockFindAll).toHaveBeenCalledWith({
        pageNumber: 1,
        itemsPerPage: 1,
      });
    });
  });
  describe('find note', () => {
    it('should call findOne', () => {
      controller.findOne(noteId);
      expect(mockFindOne).toHaveBeenCalled();
      expect(mockFindOne).toHaveBeenCalledTimes(1);
      expect(mockFindOne).toHaveBeenCalledWith(noteId);
    });
  });
  describe('update note', () => {
    it('should call update', () => {
      controller.update(noteId, noteDto);
      expect(mockUpdate).toHaveBeenCalled();
      expect(mockUpdate).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalledWith(noteId, {
        title: 'title',
        content: 'content',
      });
    });
  });
  describe('delete note', () => {
    it('should call remove', () => {
      controller.remove(noteId);
      expect(mockRemove).toHaveBeenCalled();
      expect(mockRemove).toHaveBeenCalledTimes(1);
      expect(mockRemove).toHaveBeenCalledWith(noteId);
    });
  });
});
