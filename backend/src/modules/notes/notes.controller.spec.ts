import { Test, TestingModule } from '@nestjs/testing';
import { CreateNoteDto } from './dto/create-note.dto';
import { SearchNotesParamsDto } from './dto/search-notes-dto';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

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
const noteId = '123';

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
    });
    it('should call create once', () => {
      controller.create(noteDto);
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });
    it('should call create with {title:"title", content: "content"}', () => {
      controller.create(noteDto);
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
    });
    it('should call findAll once', () => {
      controller.findAll(noteSearchParams);
      expect(mockFindAll).toHaveBeenCalledTimes(1);
    });
    it('should call findAll with {pageNumber: 1, itemsPerPage: 1}', () => {
      controller.findAll(noteSearchParams);
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
    });
    it('should call findOne once', () => {
      controller.findOne(noteId);
      expect(mockFindOne).toHaveBeenCalledTimes(1);
    });
    it('should call findOne with 123', () => {
      controller.findOne(noteId);
      expect(mockFindOne).toHaveBeenCalledWith('123');
    });
  });
  describe('update note', () => {
    it('should call update', () => {
      controller.update(noteId, noteDto);
      expect(mockUpdate).toHaveBeenCalled();
    });
    it('should call update once', () => {
      controller.update(noteId, noteDto);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
    it('should call update with 123 & {title:"title", content: "content"} ', () => {
      controller.update(noteId, noteDto);
      expect(mockUpdate).toHaveBeenCalledWith('123', {
        title: 'title',
        content: 'content',
      });
    });
  });
  describe('delete note', () => {
    it('should call remove', () => {
      controller.remove(noteId);
      expect(mockRemove).toHaveBeenCalled();
    });
    it('should call remove once', () => {
      controller.remove(noteId);
      expect(mockRemove).toHaveBeenCalledTimes(1);
    });
    it('should call remove with 123', () => {
      controller.remove(noteId);
      expect(mockRemove).toHaveBeenCalledWith('123');
    });
  });
});
