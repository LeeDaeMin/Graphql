import { Module } from '@nestjs/common';
import { SaludarResolver } from './saludar.resolver';
import { Args, Float, Int, Query } from '@nestjs/graphql';

@Module({
  providers: [SaludarResolver]
})
export class SaludarModule {

  @Query(() => String, { description: "Peticion del Paciente", name: 'pacientes' })
  saludar(): string {
    return 'Hola mundo'
  }

  @Query(() => Float, { name: 'RandomNumero' })
  getRandom(): number {
    return Math.random() * 100
  }

  @Query(() => Int, { name: 'randomFromZeroTo' })
  getRandomFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) to: number
    
    ): number {
    // numero randomico entre 0 y 10
    return Math.floor(Math.random() * to) + 1 
  }
}
