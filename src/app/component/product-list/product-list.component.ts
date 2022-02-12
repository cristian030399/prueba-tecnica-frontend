import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productos:any = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((data:any) => {
      this.productos = data;
    })
  }

  mostrarDetalles(idx: any) {
    let cardProducto = document.querySelector(`.producto:nth-of-type(${idx})`);
    let contenedorProducto = document.querySelector('.productos');
    let cardEstaActiva = cardProducto?.classList.contains('producto--ver-detalles');
    if (cardEstaActiva) {
      cardProducto?.classList.remove('producto--ver-detalles');
      contenedorProducto?.classList.remove('productos--mostrando-detalles');
    } else {
      let cardActiva = document.querySelector(`.producto--ver-detalles`);
      cardActiva?.classList.remove('producto--ver-detalles');
      cardProducto?.classList.add('producto--ver-detalles');
      contenedorProducto?.classList.add('productos--mostrando-detalles');
    }
  }

}
