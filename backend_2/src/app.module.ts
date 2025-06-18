import { Module } from '@nestjs/common';
import { FilmesModule } from './filmes/filmes.module';
import { SalaModule } from './Sala/sala.module';
import { SessaoModule } from './Sessao/sessao.module';

@Module({
  imports: [FilmesModule, SalaModule, SessaoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}