import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public todoService : TodoService, 
    private router : Router,
    private alertController : AlertController
    ) {}


  async addList(){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs:[
      {
        name:'titulo',
        type:'text',
        placeholder:'Nombre de la lista'
      }
    ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler:()=>{
            console.log('cancelar')
          }
        },
        {
          text:'Crear',
          handler:(data)=>{
            if (data.titulo.length === 0) {
              return;
            }
            //crear la lista
            const listId = this.todoService.crearLista(data.titulo);
            this.router.navigateByUrl(`tabs/tab1/add/${listId}`);
          }
        }
      ]
    });

    await alert.present();
  }


}
