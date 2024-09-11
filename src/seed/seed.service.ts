import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel( Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}
  private readonly axios: AxiosInstance = axios
  
  async executedSeed() {
    
    //modo1
    // const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=200')
    // data.results.forEach(async({name, url}) =>{
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];

    //   const pokemon = await this.pokemonModel.create({name, no});
    // })
    // return 'Seed Executed';
    
    // modo2
    await this.pokemonModel.deleteMany({}); //equivalente ha delete* from pokemons - borrado total de la tabla
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonToInsert: {name: string, no: number}[] = [];

    data.results.forEach(({name, url})=> {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];
    
    pokemonToInsert.push({name, no});
    });
    await this.pokemonModel.insertMany(pokemonToInsert);

  }

}
