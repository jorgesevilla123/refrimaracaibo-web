







// 









import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-main-section-templates',
  templateUrl: './main-section-templates.component.html',
  styleUrls: ['./main-section-templates.component.scss']
})
export class MainSectionTemplatesComponent implements OnInit {

  products: any


  // implement the logic for templating the sections here



  sections = [
    
      {section_name: 'Comprar por  categorias', cols: 3, route:"/sections", query: 'all', all_button: 'Ver todas las categorias', rowHeight: '300px', sections_template: [
        { category_name: 'Repuestos de aire acondicionado',  route: "/categories", query: 'aire-acondicionado',  img_src: '../assets/finishedlogo.png', img_w: '400px', img_h: '200px'},
        { category_name: 'Repuestos de nevera', route:"/categories", query: 'nevera',   img_src: '../assets/finishedlogo.png', img_w: '400px', img_h: '200px'},
        { category_name: 'Repuestos de linea blanca', route: "/categories", query: 'lavadora-secadora',  img_src: '../assets/finishedlogo.png', img_w: '400px', img_h: '200px'}

      ]
     },
     {
      section_name: 'Productos mas comprados', route:"/sections",query: 'nevera',  all_button: 'Ver todo sobre nevera', cols: 6, rowHeight: '200px', sections_template: [
        { category_name: 'Valvula  gusanillo',  route:"/categories", query: '', img_src: '../assets/finishedlogo.png', img_w: '50px', img_h: '50px'},
        { category_name: 'Varilla de plata',  route: "/categories", query: '', img_src: '../assets/finishedlogo.png', img_w: '50px', img_h: '50px'},
        { category_name: 'Relay PTC', route: "/categories", query: '', img_src: '../assets/finishedlogo.png', img_w: '50px', img_h: '50px'},
        { category_name: 'Termico PTC',  route:"/categories", query: '',  img_src: '../assets/finishedlogo.png', img_w: '50px', img_h: '50px'},
         { category_name: 'Capilar 031',  route: "/categories", query: '', img_src: '../assets/finishedlogo.png', img_w: '50px', img_h: '50px'},
         { category_name: 'Capilar 036', route: "/categories", query: '',  img_src: '../assets/finishedlogo.png', img_w: '50px', img_h: '50px'},

      ]
     },
     {
      section_name: 'Iluminacion', route:"/iluminacion", query: 'iluminacion',  all_button: 'Ver toda la iluminacion', cols: 4, rowHeight: '220px', sections_template: [
        { category_name: 'Bombillos LED', route: "sectionss", query: 'bombillos',  img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Bombillos dicroicos', route: "/sections", query: 'dicroicos',  img_src: '../assets/bombillo dicroico.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Tubos LED', route: "/sections", query: 'Tubos LED',  img_src: '../assets/bombillo emergencia.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Reflectores', route: "/sections", query: 'reflectores',  img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Lamparas', route: "/sections", query: 'lamparas LED',  img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Lamparas empotrables', route: "/sections", query: 'Lamparas empotrables',  img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Lamparas tungsteno', route: "/sections", query: 'Lamparas de tungsteno',  img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Paneles LED',  route:"/sections", query: 'Lamparas ufo',  img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px'},

      ]
     },
     {
      section_name: 'Herramientas', route:"/herramientas", query: 'herramientas',  all_button: 'Ver todas las herramientas', cols: 4, rowHeight: '220px', sections_template: [
        { category_name: 'Alicates', route:  "/categories", query: 'alicates', img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Pinzas',  route: "/categories",  query: 'pinzas',img_src: '../assets/bombillo dicroico.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Destornilladores de estria', route: "/categories",  query: 'destornilladores-estria', img_src: '../assets/bombillo emergencia.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Destornilladores de paleta',  route: "/categories", query: 'destornilladores-paleta', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Taladros',  route: "/categories", query: 'taladros', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Emeriles ',  route: "/categories", query: 'emeril', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Corta capilares',  route: "/categories", query: 'corta-capilares', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Corta tubos',  route: "/categories", query: 'corta-tubos', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Expansores', route: "/categories",  query: 'expansores', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Multimetros',  route: "/categories", query: 'mulitmetros', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Llaves de copa', route: "/categories",  query: 'LLaves-copa', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Picos de soldar',  route: "/categories", query: 'Picos-soldar', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px'},

      ]
     },

     {
      section_name: 'Repuestos de lavadora por categorias', route:"/lavadora", query: 'lavadora',  all_button: 'Ver todas las categorias de repuestos para lavadora', cols: 4, rowHeight: '220px', sections_template: [
        { category_name: 'Switches de lavadora',  route: "/categories", query: 'switch-lavadora', img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Bombas de agua', route: "/categories", query: 'Bomba-agua-lavadora',  img_src: '../assets/bombillo dicroico.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Transmisiones de lavadora',  route: "/categories",  query: 'transmision-lavadora',img_src: '../assets/bombillo emergencia.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Agitadores', route: "/categories",  query: 'agitador-lavadoar', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Mangueras de lavadora', route: "/categories",  query: 'manguera-lavadora', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Valvulas de entrada de agua',  route: "/categories",   query: 'valvulas-entrada-agua',img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Presostatos de lavadora',  route: "/categories", query: 'presostato-lavadora', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Actuadores',  route: "/categories",  query: 'actuador',img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Sellos de lavadora',  route: "/categories", query: 'sello-lavadora', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Relojes de lavadora', route:  "/categories", query: 'reloj-lavadora', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Motores de lavadora',  route: "/categories",  query: 'motor-lavadora',img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Sensores de lavadora', route:  "/categories", query: '', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px'},
      ]
     },
     {
      section_name: 'Repuestos por marca', route:"/marcas", query: 'marcas', all_button: 'Ver todas las marcas', cols: 6, rowHeight: '220px', sections_template: [
        { category_name: 'Danfoss', route: "/categories", query: 'danfoss', img_src: '../assets/embraco.png', img_w: '180px', img_h: '100px'},
        { category_name: 'Embraco', route: "/categories", query: 'embraco', img_src: '../assets/frigidaire.png', img_w: '180px', img_h: '100px'},
        { category_name: 'Whirlpool',  route:"/categories", query: 'whirlpool', img_src: '../assets/whirlpool.png', img_w: '180px', img_h: '100px'},
        { category_name: 'Danfoss', route: "/categories", query: 'danfoss', img_src: '../assets/embraco.png', img_w: '180px', img_h: '100px'},
        { category_name: 'Embraco', route: "/categories", query: 'embraco', img_src: '../assets/frigidaire.png', img_w: '180px', img_h: '100px'},
        { category_name: 'Whirlpool',  route:"/categories", query: 'whirlpool', img_src: '../assets/whirlpool.png', img_w: '180px', img_h: '100px'},
   
      ]
     },
{
      section_name: 'Repuestos de secadora por categorias', route:"/secadora", query: 'secadora',  all_button: 'Ver todas las categorias de repuestos para secadora', cols: 3, rowHeight: '220px', sections_template: [
        { category_name: 'Switches de secadora', route: "/categories",  query: 'switch-secadora', img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Correas de secadora',  route: "/categories",  query: 'correa-secadora',img_src: '../assets/bombillo dicroico.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Ignitores', route: "/categories",  query: 'ignitor-secadora', img_src: '../assets/bombillo emergencia.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Resistencias de secadora',  route: "/categories", query: 'resistencia-secadora', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Termicos de secadora', route: "/categories", query: 'termico-secadora',  img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Turbinas de secadora',  route: "/categories", query: 'turbina-secadora', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
      ]
     },
     {
      section_name: 'Repuestos de refrigeracion automotriz', route:"/automotriz", query: 'automotriz', all_button: 'Ver todas las categorias de repuestos automotriz', cols: 4, rowHeight: '220px', sections_template: [
        { category_name: 'Evaporadores',  route:"/categories", query: 'evaporador-auto',  img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Condensadores',  route: "/categories",  query: 'condensador-auto',img_src: '../assets/bombillo dicroico.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Sellos autommotriz', route: "/categories",  query: 'sello-auto', img_src: '../assets/bombillo emergencia.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Deshidratadores', route: "/categories",  query: 'deshidratador-auto', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Blowers',  route: "/categories", query: 'blower-auto', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Presostatos automotriz', route: "/categories",  query: 'presostato-auto', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Rolineras automotriz', route:  "/categories",  query: 'rolinera-auto',img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
        { category_name: 'Valvulas block',  route:"/categories",  query: 'valvula-block', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px'},
      ]
     },
     
  ]





  constructor(
    public productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }


  getProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        console.log(products.splice(4))
      }
    )

    
  }







}
