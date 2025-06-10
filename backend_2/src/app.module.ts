import { Module } from '@nestjs/common';
import { FilmesModule } from './filmes/filmes.module';

@Module({
  imports: [FilmesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}