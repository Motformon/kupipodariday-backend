import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offersService.findById(id);
  }

  @Post()
  create(@Body() offer: CreateOfferDto) {
    return this.offersService.create(offer);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() offer: UpdateOfferDto,
  ) {
    const findOffer = await this.offersService.findById(id);
    if (!findOffer) {
      throw new NotFoundException();
    }
    await this.offersService.updateById(id, offer);
  }

  @Delete(':id')
  async removeById(@Param('id', ParseIntPipe) id: number) {
    const offer = await this.offersService.findById(id);
    if (!offer) {
      throw new NotFoundException();
    }
    await this.offersService.removeById(id);
  }
}
