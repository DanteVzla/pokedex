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
    // console.log(fetch)
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=200')
    data.results.forEach(async({name, url}) =>{
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      const pokemon = await this.pokemonModel.create({name, no});
      // console.log({name, no});
    })
    return 'Seed Executed';
  }


 



}
