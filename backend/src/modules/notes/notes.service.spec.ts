import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateNoteDto } from './dto/create-note.dto';
import { SearchNotesParamsDto } from './dto/search-notes-dto';
import { NotesService } from './notes.service';
import { Note } from './schema/note.schema';

const mockCreate = jest.fn().mockReturnValue({
  _id: '123',
  title: 'title',
  content: 'content',
});
const mockCountDocuments = jest.fn().mockReturnValue(1);
const mockExists = jest.fn();
const mockFind = jest.fn().mockImplementation(() => ({
  sort: jest.fn().mockImplementation(() => ({
    skip: jest.fn().mockImplementation(() => ({
      limit: jest.fn().mockImplementation(() => ({
        lean: jest.fn().mockImplementation(() => ({
          exec: jest.fn().mockReturnValue([]),
        })),
      })),
    })),
  })),
}));
const mockFindById = jest.fn().mockImplementation(() => ({
  lean: jest.fn().mockImplementation(() => ({
    exec: jest
      .fn()
      .mockReturnValue({ _id: '123', title: 'title', content: 'content' }),
  })),
}));
const mockFindByIdAndUpdate = jest.fn().mockImplementation(() => ({
  lean: jest.fn().mockImplementation(() => ({
    exec: jest
      .fn()
      .mockReturnValue({ _id: '123', title: 'title', content: 'content' }),
  })),
}));
const mockFindByIdAndDelete = jest.fn();

const mockNotesModel = {
  create: mockCreate,
  countDocuments: mockCountDocuments,
  exists: mockExists,
  find: mockFind,
  findById: mockFindById,
  findByIdAndUpdate: mockFindByIdAndUpdate,
  findByIdAndDelete: mockFindByIdAndDelete,
};

const noteDto: CreateNoteDto = {
  title: 'title',
  content: 'content',
};
const noteSearchParams: SearchNotesParamsDto = {
  title: 'title',
  pageNumber: 1,
  itemsPerPage: 1,
};
const noteId = '123';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getModelToken(Note.name),
          useValue: mockNotesModel,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });
  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a note', async () => {
      await service.create(noteDto);

      expect(mockCreate).toHaveBeenCalled();
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith({
        title: 'title',
        content: 'content',
      });
      expect(mockCreate).not.toHaveBeenCalledWith({
        _id: '123',
        title: 'title',
        content: 'content',
      });
      expect(mockCreate).toHaveReturnedWith({
        _id: '123',
        title: 'title',
        content: 'content',
      });
    });
  });
  describe('findAll', () => {
    it('should find all notes', async () => {
      const res = await service.findAll(noteSearchParams);

      expect(mockFind).toHaveBeenCalled();
      expect(mockFind).toHaveBeenCalledTimes(1);
      expect(mockCountDocuments).toHaveBeenCalled();
      expect(mockCountDocuments).toHaveBeenCalledTimes(1);
      expect(mockFind).toHaveBeenCalledWith({
        title: { $options: 'i', $regex: 'title' },
      });
      expect(mockFind).not.toHaveBeenCalledWith({
        title: '',
      });
      expect(res).toEqual({
        content: [],
        searchParams: { itemsPerPage: 1, pageNumber: 1 },
        totalItems: 1,
      });
    });
  });
  describe('findOne', () => {
    it('should find one note', async () => {
      const res = await service.findOne(noteId);

      expect(mockFindById).toHaveBeenCalled();
      expect(mockFindById).toHaveBeenCalledTimes(1);
      expect(mockFindById).toHaveBeenCalledWith('123');
      expect(mockFind).not.toHaveBeenCalledWith('');
      expect(res).toEqual({ _id: '123', title: 'title', content: 'content' });
    });
  });
  describe('update', () => {
    it('should update note', async () => {
      mockExists.mockReturnValueOnce(true);
      const res = await service.update(noteId, noteDto);

      expect(mockExists).toHaveBeenCalled();
      expect(mockExists).toHaveBeenCalledTimes(1);
      expect(mockFindByIdAndUpdate).toHaveBeenCalled();
      expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        '123',
        {
          title: 'title',
          content: 'content',
        },
        { upsert: true, new: true },
      );
      expect(mockFind).not.toHaveBeenCalledWith('');
      expect(res).toEqual({ _id: '123', title: 'title', content: 'content' });
    });
    it('should create new note', async () => {
      mockExists.mockReturnValueOnce(false);
      const res = await service.update(noteId, noteDto);

      expect(mockExists).toHaveBeenCalled();
      expect(mockExists).toHaveBeenCalledTimes(1);
      expect(mockFindByIdAndUpdate).not.toHaveBeenCalled();
      expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(0);
      expect(mockCreate).toHaveBeenCalled();
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith({
        title: 'title',
        content: 'content',
      });

      expect(res).toEqual({ _id: '123', title: 'title', content: 'content' });
    });
    it('should remove note', async () => {
      mockExists.mockReturnValueOnce(true);
      await service.remove(noteId);

      expect(mockExists).toHaveBeenCalled();
      expect(mockExists).toHaveBeenCalledTimes(1);
      expect(mockFindByIdAndDelete).toHaveBeenCalled();
      expect(mockFindByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(mockFindByIdAndDelete).toHaveBeenCalledWith('123');
    });
  });
});
