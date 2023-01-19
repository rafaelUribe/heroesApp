import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { HeroeTarjetaComponent } from '../../components/heroe-tarjeta/heroe-tarjeta.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  heroes: Heroe[] = []

  constructor(private heroesService: HeroesService){}

  ngOnInit(): void{
    this.heroesService.getHeroes()
      .subscribe( heroes => this.heroes = heroes)
  }
}
