import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  
})
export class SidebarComponent  {

 //recibir historial, conectarse con el service
 get historial(){
  return this.gifsService.historial;
 }

//inyectamos el service
constructor(private gifsService: GifsService){}
buscar(termino:string){
  this.gifsService.buscarGifs(termino); //cargar los gifs segun el historial del sidebar

}
}
