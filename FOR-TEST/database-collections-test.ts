
export let date: Date = new Date();



interface CategoryData {
  id: number
  description: string;
  label_name: string
  label_value: string
}


export interface ProductCategory {
  id: number;
  category_name: string;
  category_data: Array<CategoryData>

  created_at: Date;
  modified_at: Date;
}





export let productsCategory: ProductCategory[] = [
  {
    id: 1,
    category_name: 'iluminacion',
    category_data: [
      {
        id: 1, label_name: 'vatios',
        label_value: '9W',
        description: 'vatios',
      },
      {
        id: 2,
        
        label_name: 'vatios',
        label_value: '12W',
        description: 'vatios',
      },
      {
        id: 3,
        
        label_name: 'vatios',
        label_value: '15W',
        description: 'vatios',
      },
      {
        id: 4,
        
        label_name: 'vatios',
        label_value: '24W',
        description: 'vatios',
      },
      {
        id: 5,
        
        label_name: 'vatios',
        label_value: '40W',
        description: 'vatios',
      },
      {
        id: 6,
        
        label_name: 'voltaje',
        label_value: '110v',
        description: 'voltaje',
      },
      {
        id: 7,
        
        label_name: 'voltaje',
        label_value: '220v',
        description: 'voltaje',
      },
      {
        id: 8,
        
        label_name: 'voltaje',
        label_value: 'multivoltaje',
        description: 'voltaje',
      },
      {
        id: 9,
        
        label_name: 'rosca',
        label_value: 'E27',
        description: 'Rosca estandar',
      },
      {
        id: 10,
        
        label_name: 'rosca',
        label_value: 'E14',
        description: 'Rosca fina',
      },
      {
        id: 12,
        
        label_name: 'Tipo',
        label_value: 'Bombillo',
        description: 'Rosca fina',
      },
      {
        id: 13,
        
        label_name: 'Tipo',
        label_value: 'Lampara',
        description: 'Rosca fina',
      },
      {
        id: 14,
        
        label_name: 'Tipo',
        label_value: 'Dicroico',
        description: 'Rosca fina',
      },
      {
        id: 15,
        
        label_name: 'Tipo',
        label_value: 'Vela',
        description: 'Rosca fina',
      },
      {
        id: 16,
        
        label_name: 'Tipo',
        label_value: 'Reflector',
        description: 'Rosca fina',
      },
      {
        id: 15,
        
        label_name: 'Tipo',
        label_value: 'Tubo Led',
        description: 'Rosca fina',
      },


    ],
    created_at: date,
    modified_at: date,
  },
  {
    id: 1,
    category_name: 'Secadora',
    category_data: [
      {
        id: 1, label_name: 'Clase',
        label_value: 'Correas',
        description: 'vatios',
      },
      {
        id: 2,
        
        label_name: 'Clase',
        label_value: 'Resistencias',
        description: 'vatios',
      },
      {
        id: 3,
        
        label_name: 'Clase',
        label_value: 'Switches',
        description: 'vatios',
      },
      {
        id: 4,
        
        label_name: 'Clase',
        label_value: 'Ductos',
        description: 'vatios',
      },
      {
        id: 5,
        
        label_name: 'Clase',
        label_value: 'Fieltros',
        description: 'vatios',
      },
      {
        id: 6,
        
        label_name: 'Marca',
        label_value: 'Whirlpool ',
        description: 'voltaje',
      },
      {
        id: 7,
        
        label_name: 'Marca',
        label_value: 'Frigidaire',
        description: 'voltaje',
      },
      {
        id: 8,
        
        label_name: 'Marca',
        label_value: 'General Electric',
        description: 'voltaje',
      },
      // {
      //   id: 9,
        
      //   label_name: 'rosca',
      //   label_value: 'E27',
      //   description: 'Rosca estandar',
      // },
      // {
      //   id: 10,
        
      //   label_name: 'rosca',
      //   label_value: 'E14',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 12,
        
      //   label_name: 'Tipo',
      //   label_value: 'Bombillo',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 13,
        
      //   label_name: 'Tipo',
      //   label_value: 'Lampara',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 14,
        
      //   label_name: 'Tipo',
      //   label_value: 'Dicroico',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 15,
        
      //   label_name: 'Tipo',
      //   label_value: 'Vela',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 16,
        
      //   label_name: 'Tipo',
      //   label_value: 'Reflector',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 15,
        
      //   label_name: 'Tipo',
      //   label_value: 'Tubo Led',
      //   description: 'Rosca fina',
      // },


    ],
    created_at: date,
    modified_at: date,
  },
  {
    id: 1,
    category_name: 'Herramientas',
    category_data: [
      {
        id: 1,
        label_name: 'Tipo',
        label_value: 'Destornillador de estria',
        description: 'Destornilladores '
      },
      {
        id: 2,
        label_name: 'Tipo',
        label_value: 'Destornillador de copa',
        description: 'Destornilladores '
      },
      {
        id: 3,
        label_name: 'Tipo',
        label_value: 'Destornillador de paleta',
        description: 'Destornilladores '
      },
        {
        id: 4,
        label_name: 'Tipo',
        label_value: 'Alicates',
        description: 'Destornilladores '
      },
      {
        id: 5,
        label_name: 'Tipo',
        label_value: 'Picos para soldar',
        description: 'Destornilladores '
      },
      {
        id: 6,
        label_name: 'Tipo',
        label_value: 'Corta capilar',
        description: 'Destornilladores '
      },
      {
        id: 7,
        label_name: 'Tipo',
        label_value: 'Herramientas electricas',
        description: 'Destornilladores '
      },
      {
        id: 8,
        label_name: 'Tipo',
        label_value: 'LLaves allen',
        description: 'Destornilladores '
      },
   
      {
        id: 9,
        label_name: 'Tipo',
        label_value: 'Llaves torx',
        description: 'Destornilladores '
      },
   
      {
        id: 10,
        label_name: 'Tipo',
        label_value: 'Seguetas',
        description: 'Destornilladores '
      },
   
      {
        id: 11,
        label_name: 'Tipo',
        label_value: 'Herramientas para tuberia plastica',
        description: 'Destornilladores '
      },
   


    ],
    created_at: date,
    modified_at: date,
  },
  {
    id: 3,
    category_name: 'Lavadora',
    category_data: [
      {
        id: 1, label_name: 'clase',
        label_value: 'Bomba de agua',
        description: 'vatios',
      },
      {
        id: 2,
        
        label_name: 'Clase',
        label_value: 'Mangueras',
        description: 'vatios',
      },
      {
        id: 3,
        
        label_name: 'Clase',
        label_value: 'Presostatos',
        description: 'vatios',
      },
      {
        id: 4,
        
        label_name: 'Clase',
        label_value: 'Valvulas de entrada de agua',
        description: 'vatios',
      },
      {
        id: 5,
        
        label_name: 'Clase',
        label_value: 'Sellos',
        description: 'vatios',
      },
      {
        id: 6,
        
        label_name: 'Clase',
        label_value: 'Rolineras',
        description: 'voltaje',
      },
      {
        id: 7,
        
        label_name: 'Clase',
        label_value: 'Transmisiones',
        description: 'voltaje',
      },
      {
        id: 8,
        
        label_name: 'Clase',
        label_value: 'Switches',
        description: 'voltaje',
      },
      {
        id: 9,
        
        label_name: 'Clase',
        label_value: 'Partes para transmision',
        description: 'Rosca estandar',
      },
      {
        id: 10,
        
        label_name: 'Clase',
        label_value: 'Partes para agitador',
        description: 'Rosca fina',
      },
      {
        id: 12,
        
        label_name: 'Marca',
        label_value: 'Whirlpool',
        description: 'Rosca fina',
      },
      {
        id: 13,
        
        label_name: 'Marca',
        label_value: 'Frigidaire',
        description: 'Rosca fina',
      },
      {
        id: 14,
        
        label_name: 'Marca',
        label_value: 'General electric',
        description: 'Rosca fina',
      },
      {
        id: 15,
        
        label_name: 'Marca',
        label_value: 'Haier',
        description: 'Rosca fina',
      },
      {
        id: 16,
        
        label_name: 'Marca',
        label_value: 'Samsung',
        description: 'Rosca fina',
      },
      {
        id: 15,
        
        label_name: 'Marca',
        label_value: 'LG',
        description: 'Rosca fina',
      },
      {
        id: 16,
        
        label_name: 'Marca',
        label_value: 'Maytag',
        description: 'Rosca fina',
      },
      {
        id: 17,
        
        label_name: 'Marca',
        label_value: 'Westinghouse',
        description: 'Rosca fina',
      },
      {
        id: 18,
        
        label_name: 'Marca',
        label_value: 'Kenmore',
        description: 'Rosca fina',
      },
      {
        id: 19,
        
        label_name: 'Marca',
        label_value: 'Mabe',
        description: 'Rosca fina',
      },
      {
        id: 20,
        
        label_name: 'Marca',
        label_value: 'LG',
        description: 'Rosca fina',
      },


    ],
    created_at: date,
    modified_at: date,
  },
  {
    id: 1,
    category_name: 'Automotriz',
    category_data: [
      {
        id: 1, label_name: 'Clase',
        label_value: 'Evaporadores',
        description: 'vatios',
      },
      {
        id: 2,
        
        label_name: 'Clase',
        label_value: 'Condensadores',
        description: 'vatios',
      },
      {
        id: 3,
        
        label_name: 'Clase',
        label_value: 'Valvula block',
        description: 'vatios',
      },
      {
        id: 4,
        
        label_name: 'Clase',
        label_value: 'Valvula de expansion',
        description: 'vatios',
      },
      {
        id: 5,
        
        label_name: 'Clase',
        label_value: 'Presostatos',
        description: 'vatios',
      },
      {
        id: 6,
        
        label_name: 'Clase',
        label_value: 'Sellos',
        description: 'voltaje',
      },
      {
        id: 7,
        
        label_name: 'Clase',
        label_value: 'Mitsubishi',
        description: 'voltaje',
      },
      {
        id: 8,
        
        label_name: 'Marca',
        label_value: 'Hyundai',
        description: 'voltaje',
      },
      {
        id: 9,
        
        label_name: 'Marca',
        label_value: 'Chevrolet',
        description: 'Rosca estandar',
      },
      {
        id: 10,
        
        label_name: 'Marca',
        label_value: 'Ford',
        description: 'Rosca fina',
      },
      // {
      //   id: 12,
        
      //   label_name: 'Marca',
      //   label_value: 'Bombillo',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 13,
        
      //   label_name: 'Marca',
      //   label_value: 'Lampara',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 14,
        
      //   label_name: 'Marca',
      //   label_value: 'Dicroico',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 15,
        
      //   label_name: 'Marca',
      //   label_value: 'Vela',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 16,
        
      //   label_name: 'Marca',
      //   label_value: 'Reflector',
      //   description: 'Rosca fina',
      // },
      // {
      //   id: 15,
        
      //   label_name: 'Marca',
      //   label_value: 'Tubo Led',
      //   description: 'Rosca fina',
      // },


    ],
    created_at: date,
    modified_at: date,
  },
  {
    id: 1,
    category_name: 'Marcas',
    category_data: [
      {
        id: 1, label_name: 'Marca',
        label_value: 'Embraco',
        description: 'vatios',
      },
      {
        id: 2,
        
        label_name: 'Marca',
        label_value: 'Whirlpool',
        description: 'vatios',
      },
      {
        id: 3,
        
        label_name: 'Marca',
        label_value: 'Frigidaire',
        description: 'vatios',
      },
      {
        id: 4,
        
        label_name: 'Marca',
        label_value: 'Whirlpool',
        description: 'vatios',
      },
      {
        id: 5,
        
        label_name: 'Marca',
        label_value: 'General Electric',
        description: 'vatios',
      },
      {
        id: 6,
        
        label_name: 'Marca',
        label_value: 'Robertshaw',
        description: 'voltaje',
      },
      {
        id: 7,
        
        label_name: 'Marca',
        label_value: 'Maytag',
        description: 'voltaje',
      },
      {
        id: 8,
        
        label_name: 'Marca',
        label_value: 'Danfoss',
        description: 'voltaje',
      },
      {
        id: 9,
        
        label_name: 'Marca',
        label_value: 'RUN',
        description: 'Rosca estandar',
      },
      {
        id: 10,
        
        label_name: 'Marca',
        label_value: 'Ingco',
        description: 'Rosca fina',
      },
      {
        id: 12,
        
        label_name: 'Marca',
        label_value: 'Full gauge',
        description: 'Rosca fina',
      },
      {
        id: 13,
        
        label_name: 'Marca',
        label_value: 'Motorvenca',
        description: 'Rosca fina',
      },
      {
        id: 14,
        
        label_name: 'Marca',
        label_value: 'Dicroico',
        description: 'Rosca fina',
      },
      {
        id: 15,
        
        label_name: 'Marca',
        label_value: 'Vela',
        description: 'Rosca fina',
      },
      {
        id: 16,
        
        label_name: 'Tipo',
        label_value: 'Reflector',
        description: 'Rosca fina',
      },
      {
        id: 15,
        
        label_name: 'Tipo',
        label_value: 'Tubo Led',
        description: 'Rosca fina',
      },


    ],
    created_at: date,
    modified_at: date,
  },





];