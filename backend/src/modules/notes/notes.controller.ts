import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { SearchNotesParamsDto } from './dto/search-notes-dto';
import { MongoIdParamDto } from '../../common/dto/mongoId-param.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll(@Query() searchParams: SearchNotesParamsDto) {
    return this.notesService.findAll(searchParams);
  }

  @Get(':id')
  findOne(@Param() params: MongoIdParamDto) {
    return this.notesService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: MongoIdParamDto,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(params.id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param() params: MongoIdParamDto) {
    return this.notesService.remove(params.id);
  }
}
