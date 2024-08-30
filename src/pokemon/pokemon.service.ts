import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    // const pokemon = await this.pokemonModel.create(createPokemonDto);
    // return pokemon;
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    //no aplica (no)
    if(!isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne({no: term});
    }
    //MOngoDB
    if (!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }
    //name
    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim() });
    }
    //si el pokemon no existe
    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`) 
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    if(updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.findOne(term);
      await pokemon.updateOne( updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto};
      
    } catch (error) {
      this.handlerExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id); [modo 1]
    // await pokemon.deleteOne();
    // return {id};

    // const result = await this.pokemonModel.findByIdAndDelete(id); [modo 2]
    // return result;

    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if (deletedCount === 0) throw new BadRequestException(`Pokemon with id "${id}"  not found`)
      return;
  }

  private handlerExceptions(error: any){
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon - Check server logs`);
  
  }
}
