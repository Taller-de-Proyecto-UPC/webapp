import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from 'src/app/interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  BASE_URL = 'https://neuralscanstorage.ue.r.appspot.com/api/v1'
  constructor(private http: HttpClient) {}

  updateImage(id: any, image: Image){
    console.log(image);

    this.http.put(`${this.BASE_URL}/image/`+ id, image).subscribe(
      (response: any) => {
        console.log('La imagen se actualizo satisfactoriamente:', response);
        location.reload();
      },
      (error: any) => {
        console.error('Error al actualizar la imagen', error);
      }
    );
  }
}
