    import adanaKebab from '../assets/images/adana-kebab.png'
    import ayran from '../assets/images/ayran.jpg'
    import baklava from '../assets/images/baklava.png'
    import beyti from '../assets/images/beyti.png'
    import borek from '../assets/images/borek.jpg'
    import cay from '../assets/images/cay.jpg'
    import cobanSalata from '../assets/images/cobanSalata.jpg'
    import dolma from '../assets/images/dolma.png'
    import etSis from '../assets/images/et-sis.png'
    import ezoGelin from '../assets/images/ezoGelin.jpg'
    import gavurdagiSalata from '../assets/images/gavurdagiSalata.jpg'
    import gazoz from '../assets/images/gazoz.png'
    import icliKofte from '../assets/images/iciliKofte.jpg'
    import kasarliPide from '../assets/images/kasarliPide.jpg'
    import kiymaliPide from '../assets/images/kiymaliPide.jpg'
    import kunefe from '../assets/images/kunefe.jpg'
    import lahmacun from '../assets/images/lahmacun.jpg'

    import mercimekCorba from '../assets/images/mercimekCorba.jpg'
    import mevsimSalata from '../assets/images/mevsimSalta.jpg'
    import patlicanKebab from '../assets/images/patlican-kebab.png'
    import pide from '../assets/images/pide.png'
    import pilavEt from '../assets/images/pilav-ustu-et.png'

    import salep from '../assets/images/salep.png'
    import salgam from '../assets/images/salgam.jpg'
    import sutlac from '../assets/images/sutlac.png'
    import tantuni from '../assets/images/tantuni.jpg'
    import tarhana from '../assets/images/tarhana.jpg'
    import turkKahvesi from '../assets/images/turkKahvesi.jpg'





    export const popularDishes = [
        {
          id: 1,
          image: pilavEt,
          name: 'Pilav Et',
          numberOfOrders: 250,
        },
        {
          id: 2,
          image: beyti,
          name: 'Beyti',
          numberOfOrders: 190,
        },
        {
          id: 3,
          image: tantuni,
          name: 'Tantuni',
          numberOfOrders: 300,
        },
        {
          id: 4,
          image: baklava,
          name: 'Baklava',
          numberOfOrders: 220,
        },
        {
          id: 5,
          image: adanaKebab,
          name: 'Adana Kebab',
          numberOfOrders: 270,
        },
        {
          id: 6,
          image: patlicanKebab,
          name: 'Patlıcan Kebab',
          numberOfOrders: 180,
        },
        {
          id: 7,
          image: sutlac,
          name: 'Sütlaç',
          numberOfOrders: 210,
        },
        {
          id: 8,
          image: etSis,
          name: 'Et Şiş',
          numberOfOrders: 310,
        },
        {
          id: 9,
          image: pide,
          name: 'Pide',
          numberOfOrders: 140,
        },
        {
          id: 10,
          image: lahmacun,
          name: 'Lahmacun',
          numberOfOrders: 160,
        },
      ];
   export const tables = [
  { id: 1,  name: "Masa 1",  status: "Meşgul", initials: "AM", seats: 4 },
  { id: 2,  name: "Masa 2",  status: "uygun",  initials: "MB", seats: 6 },
  { id: 3,  name: "Masa 3",  status: "Meşgul", initials: "YS", seats: 2 },
  { id: 4,  name: "Masa 4",  status: "uygun",  initials: "HR", seats: 4 },
  { id: 5,  name: "Masa 5",  status: "Meşgul", initials: "PL", seats: 3 },
  { id: 6,  name: "Masa 6",  status: "uygun",  initials: "RT", seats: 4 },
  { id: 7,  name: "Masa 7",  status: "Meşgul", initials: "LC", seats: 5 },
  { id: 8,  name: "Masa 8",  status: "uygun",  initials: "DP", seats: 5 },
  { id: 9,  name: "Masa 9",  status: "Meşgul", initials: "NK", seats: 6 },
  { id: 10, name: "Masa 10", status: "uygun",  initials: "SB", seats: 6 },
  { id: 11, name: "Masa 11", status: "Meşgul", initials: "GT", seats: 4 },
  { id: 12, name: "Masa 12", status: "uygun",  initials: "ZY", seats: 6 },
  { id: 13, name: "Masa 13", status: "Meşgul", initials: "EK", seats: 2 },
  { id: 14, name: "Masa 14", status: "uygun",  initials: "MN", seats: 5 },
  { id: 15, name: "Masa 15", status: "Meşgul", initials: "TO", seats: 3 },
];


    // Başlangıçlar
    // Başlangıçlar
    // Başlangıçlar
    export const baslangicYemek = [
      { id: 1, name: "Sigara Böreği", price: 80, category: "Vejetaryen", image: borek },
      { id: 2, name: "Zeytinyağlı Yaprak Sarma", price: 90, category: "Vejetaryen", image: dolma },
      { id: 3, name: "İçli Köfte", price: 120, category: "Etli", image: icliKofte }
    ];

    // Ana Yemekler
    export const anaYemek = [
      { id: 1, name: "Adana Kebap", price: 250, category: "Etli", image: adanaKebab },
      { id: 2, name: "Beyti", price: 240, category: "Etli", image: beyti },
      { id: 3, name: "Tavuk Şiş", price: 180, category: "Tavuk", image: etSis }
    ];

    // Soğuk İçecekler
    export const sogukIcecekler = [
      { id: 1, name: "Ayran", price: 25, category: "Soğuk", image: ayran },
      { id: 2, name: "Şalgam", price: 30, category: "Soğuk", image: salgam },
      { id: 3, name: "Gazoz", price: 35, category: "Soğuk", image: gazoz }
    ];

    // Çorbalar
    export const corba = [
      { id: 1, name: "Mercimek Çorbası", price: 60, category: "Vejetaryen", image: mercimekCorba },
      { id: 2, name: "Ezogelin Çorbası", price: 65, category: "Vejetaryen", image: ezoGelin  }, 
      { id: 3, name: "Tarhana Çorbası", price: 70, category: "Vejetaryen", image: tarhana }
    ];

    // Tatlılar
    export const tatlılar = [
      { id: 1, name: "Baklava", price: 120, category: "Şerbetli", image: baklava },
      { id: 2, name: "Künefe", price: 140, category: "Şerbetli", image: kunefe },
      { id: 3, name: "Sütlaç", price: 100, category: "Sütlü", image: sutlac }
    ];

    // Pideler
    export const pideler = [
      { id: 1, name: "Kaşarlı Pide", price: 150, category: "Vejetaryen", image: kasarliPide },
      { id: 2, name: "Kıymalı Pide", price: 170, category: "Etli", image: kiymaliPide },
      { id: 3, name: "Kuşbaşılı Pide", price: 180, category: "Etli", image: pide }
    ];

    // Sıcak İçecekler
    export const sicakIcecek = [
      { id: 1, name: "Çay", price: 15, category: "Sıcak", image: cay },
      { id: 2, name: "Türk Kahvesi", price: 30, category: "Sıcak", image: turkKahvesi },
      { id: 3, name: "Salep", price: 40, category: "Sıcak", image: salep }
    ];

    // Salatalar
    export const salatalar = [
      { id: 1, name: "Çoban Salata", price: 60, category: "Vejetaryen", image: cobanSalata },
      { id: 2, name: "Mevsim Salata", price: 55, category: "Vejetaryen", image: mevsimSalata },
      { id: 3, name: "Gavurdağı Salatası", price: 70, category: "Vejetaryen", image: gavurdagiSalata }
    ];

      export const menus = [
      { id: 1, name: "Başlangıç", bgColor: "#b73e3e" ,icon: "🍲", items: baslangicYemek },
      { id: 2, name: "Ana Yemek", bgColor: "#5b45b0" ,icon: "🍛", items: anaYemek },
      { id: 3, name: "Soğuk İçecekler", bgColor: "#7f167f" ,icon: "🍹", items: sogukIcecekler },
      { id: 4, name: "Çorbalar", bgColor: "#735f32" ,icon: "🥣", items: corba },
      { id: 5, name: "Tatlılar", bgColor: "#1d2569" ,icon: "🍰", items: tatlılar },
      { id: 6, name: "Pizzalar", bgColor: "#285430" ,icon: "🍕", items: pideler },
      { id: 7, name: "Sıcak İçecekler", bgColor: "#b73e3e" ,icon: "☕", items: sicakIcecek},
      { id: 8, name: "Salatalar", bgColor: "#5b45b0" ,icon: "🥗", items: salatalar }
    ]

    // METRİKLER (Revenue, Outbound Clicks, Total Customer, Event Count)
export const metricsData = [
  { title: "Gelir", value: "₺50.846,90", percentage: "12%", color: "#025cca", isIncrease: false },
  { title: "Tıklamalar", value: "10.342", percentage: "16%", color: "#02ca3a", isIncrease: true },
  { title: "Müşteri Sayısı", value: "19.720", percentage: "10%", color: "#f6b100", isIncrease: true },
  { title: "Etkinlik Sayısı", value: "20.000", percentage: "10%", color: "#be3e3f", isIncrease: false },
];

// KALEMLER (Kategoriler, Yemekler, Aktif Siparişler, Masalar)
export const itemsData = [
  { title: "Toplam Kategori", value: "8",  percentage: "12%", color: "#5b45b0", isIncrease: false },
  { title: "Toplam Yemek",    value: "50", percentage: "12%", color: "#285430", isIncrease: true  },
  { title: "Aktif Sipariş",   value: "12", percentage: "12%", color: "#735f32", isIncrease: true  },
  { title: "Toplam Masa",     value: "10",                       color: "#7f167f"                  },
];

// SİPARİŞLER (örnek kayıtlar)
export const orders = [
  {
    id: "101",
    customer: "Ahmet Demir",
    status: "Hazır",
    dateTime: "18 Ocak 2025 20:32",
    items: 8,
    tableNo: 3,
    total: 250.0,
  },
  {
    id: "102",
    customer: "Mehmet Yılmaz",
    status: "Hazırlanıyor",
    dateTime: "18 Ocak 2025 20:45",
    items: 5,
    tableNo: 4,
    total: 180.0,
  },
  {
    id: "103",
    customer: "Elif Kaya",
    status: "Hazır",
    dateTime: "18 Ocak 2025 21:00",
    items: 3,
    tableNo: 5,
    total: 120.0,
  },
  {
    id: "104",
    customer: "Canan Çelik",
    status: "Hazırlanıyor",
    dateTime: "18 Ocak 2025 21:15",
    items: 6,
    tableNo: 6,
    total: 220.0,
  },
];



    







