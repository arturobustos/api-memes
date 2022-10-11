import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

//servicio de la api
private apiKey:string = 'EU4SjFwEWEuOv3I2Me8R718J4W3ecrsS';
private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
 private _historial:string[]=[];

 public resultados: Gif[] = []; //almacenar data 
 
 get historial(){
  return [...this._historial]; //rompemos la refernecia para no modificar el arreglo original
 }

 constructor(private http: HttpClient){ //nos permite hacer peticiones Http
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //devuelve el historial o un arreglo vacio.
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){ otra forma de mostrar el localStorage
  //   this._historial = JSON.parse(localStorage.getItem('historial')!); //mostrar informacion del localStorage en el sidebar. 
  // }
 }
 //insertar valores al historial
 buscarGifs(query:string = ''){
  query = query.trim().toLocaleLowerCase(); //transforma el query en minuscula
  
  
  if(!this._historial.includes(query)){ //preguntamos si no lo incluye entonces se incerta
    this._historial.unshift(query); //unshift inserta el elemento
    this._historial = this._historial.splice(0,10); //almacenar solo 10 elementos en el array
  
    localStorage.setItem('historial',JSON.stringify(this._historial)); //vuelve al historial en string y lo almacena

  }

  //parametros de la API
  const params = new HttpParams()
  .set('api_key', this.apiKey)
  .set('limit','10') 
  .set('q',query);

  //objeto encargado de hacer peticiones HTTP en angular
  this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp) =>{
    
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados)); //almacenar resultado de la busqueda en el localStorage
    });
}
}
