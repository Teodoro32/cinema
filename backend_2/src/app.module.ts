import { Module } from '@nestjs/common';
import { FilmesModule } from './filmes/filmes.module';
import { SalaModule } from './Sala/sala.module';

@Module({
  imports: [FilmesModule, SalaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}