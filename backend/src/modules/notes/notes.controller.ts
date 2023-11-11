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
import { ValidateMongoIdParam } from '../../common/pipes/validate-mongoid-param.pipe';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @SkipThrottle()
  @Get()
  findAll(@Query() searchParams: SearchNotesParamsDto) {
    return this.notesService.findAll(searchParams);
  }

  @SkipThrottle()
  @Get(':id')
  findOne(@Param('id', ValidateMongoIdParam) id: string) {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ValidateMongoIdParam) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdParam) id: string) {
    return this.notesService.remove(id);
  }
}
