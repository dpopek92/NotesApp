import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, FlattenMaps, Model } from 'mongoose';
import { ISearchResult } from '../../common/interfaces/search-result.inteface';
import { CreateNoteDto } from './dto/create-note.dto';
import { SearchNotesParamsDto } from './dto/search-notes-dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NotesDocument } from './schema/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly notesModel: Model<NotesDocument>,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    return this.notesModel.create(createNoteDto);
  }

  async findAll(
    searchParams: SearchNotesParamsDto,
  ): Promise<ISearchResult<FlattenMaps<NotesDocument>>> {
    const { itemsPerPage, pageNumber, title } = searchParams;

    const query: FilterQuery<NotesDocument> = {};
    if (!!title)
      query.title = {
        $regex: title,
        $options: 'i',
      };

    const totalItems = await this.notesModel.countDocuments(query);
    const skip = (pageNumber - 1) * itemsPerPage;

    const notes = await this.notesModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .lean()
      .exec();

    const responseBody: ISearchResult<FlattenMaps<NotesDocument>> = {
      content: notes,
      searchParams: { itemsPerPage, pageNumber },
      totalItems,
    };
    return responseBody;
  }

  async findOne(id: string) {
    const note = await this.notesModel.findById(id).lean().exec();
    if (!note) throw new NotFoundException('There is no note with this id');

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.notesModel
      .findByIdAndUpdate(id, updateNoteDto, {
        upsert: true,
        new: true,
      })
      .lean()
      .exec();
  }

  async remove(id: string) {
    const isExists = await this.notesModel.exists({ _id: id });
    if (!isExists) throw new NotFoundException('There is no note to remove');

    await this.notesModel.findByIdAndDelete(id);
    return true;
  }
}
