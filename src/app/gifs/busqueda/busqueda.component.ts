import { Component,ViewChild,ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  
})
export class BusquedaComponent  {

@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //buscamos el input y le asignamos un elemento

//inyectamos el service, esto nos da acceso a todas sus propiedades y metodos
constructor(private gifsService: GifsService){

}

 buscar( ){ //recibir dato del input 
 const valor = this.txtBuscar.nativeElement.value; //guardar el valor del input
  
  //validar input vacio
  if(valor.trim().length === 0 ){
    return; //evitar que podamos precionar enter
  }


 //insertar valores al historial
 this.gifsService.buscarGifs(valor);

 this.txtBuscar.nativeElement.value='';
 }

}
