export type City = {
  slug: string;
  name: string;
  nameLocative: string;
  nameGenitive: string;
  region: string;
  population?: string;
  intro: string;
  routes: string[];
  districts: string[];
  useCases: string[];
  formats: string[];
  faqs: { q: string; a: string }[];
};

export const cities: City[] = [
  {
    slug: "warszawa",
    name: "Warszawa",
    nameLocative: "Warszawie",
    nameGenitive: "Warszawy",
    region: "województwo mazowieckie",
    population: "1,86 mln",
    intro:
      "Warszawa to największy rynek reklamy outdoorowej w Polsce. Nasze nośniki billboardowe obejmują wyloty z miasta, główne arterie, dzielnice biznesowe i osiedla mieszkaniowe - od Mokotowa i Wilanowa, przez Wolę i Ochotę, po Białołękę i Targówek.",
    routes: [
      "Trasa S8 / Wisłostrada",
      "Trasa Toruńska / S8",
      "Aleje Jerozolimskie",
      "Trasa Łazienkowska",
      "Wał Miedzeszyński",
      "DK7 wylot na Gdańsk",
      "DK17 wylot na Lublin",
    ],
    districts: [
      "Mokotów",
      "Wola",
      "Praga-Południe",
      "Praga-Północ",
      "Ursynów",
      "Bemowo",
      "Białołęka",
      "Targówek",
      "Bielany",
      "Ochota",
      "Włochy",
      "Wilanów",
    ],
    useCases: [
      "Kampanie zasięgowe na arteriach śródmiejskich",
      "Reklama korporacyjna w dzielnicach biznesowych",
      "Eventy i wydarzenia kulturalne",
      "Otwarcia sklepów i punktów usługowych",
      "Kampanie polityczne i społeczne",
    ],
    formats: ["Billboard 12×3 m", "Billboard 6×3 m", "Citylight 1,2×1,8 m", "Frontlight i backlight"],
    faqs: [
      {
        q: "Ile kosztuje wynajem billboardu w Warszawie?",
        a: "Ceny w Warszawie zaczynają się od ok. 1 200 zł netto za 2 tygodnie ekspozycji na lokalizacjach osiedlowych. Topowe nośniki przy Wisłostradzie, S8 czy w Śródmieściu osiągają 3 500-4 500 zł netto za 2 tygodnie. Pełny kosztorys zależy od formatu, lokalizacji i długości kampanii.",
      },
      {
        q: "Które dzielnice Warszawy mają największy zasięg?",
        a: "Najwyższy ruch dobowy generują wyloty z miasta (S8, S2, Wisłostrada) oraz arterie śródmiejskie - Aleje Jerozolimskie, Marszałkowska, Puławska. Dla kampanii zasięgowych B2C polecamy mix tras wlotowych i Śródmieścia.",
      },
      {
        q: "Czy mogę zarezerwować billboard tylko w wybranej dzielnicy Warszawy?",
        a: "Tak. Możesz wybrać konkretną dzielnicę, np. Mokotów, Wola czy Bemowo, a my dobierzemy dostępne nośniki w zadanym promieniu lub przy konkretnej ulicy.",
      },
    ],
  },
  {
    slug: "otwock",
    name: "Otwock",
    nameLocative: "Otwocku",
    nameGenitive: "Otwocka",
    region: "powiat otwocki",
    population: "44 tys.",
    intro:
      "Otwock to ważny węzeł komunikacyjny w południowo-wschodniej części aglomeracji warszawskiej. Nasze nośniki obsługują głównie ruch tranzytowy na DK17 oraz lokalny ruch w stronę Warszawy i Józefowa - idealny region dla kampanii dojazdowych i lokalnego handlu.",
    routes: [
      "DK17 (Lublin - Warszawa)",
      "DW801 (Wał Miedzeszyński / Karczew)",
      "Trasa kolei mazowieckich Otwock - Warszawa",
    ],
    districts: ["Centrum", "Świder", "Soplicowo", "Mlądz", "Wólka Mlądzka"],
    useCases: [
      "Kampanie dla lokalnego handlu i usług",
      "Promocja deweloperska osiedli i inwestycji",
      "Reklama serwisów samochodowych przy DK17",
      "Otwock jako uzupełnienie kampanii warszawskiej (wschód)",
    ],
    formats: ["Billboard 6×3 m", "Billboard 12×3 m", "Citylight"],
    faqs: [
      {
        q: "Ile kosztuje billboard w Otwocku?",
        a: "Wynajem billboardu w Otwocku zaczyna się od ok. 800 zł netto za 2 tygodnie na lokalizacjach osiedlowych, a topowe nośniki przy DK17 osiągają 1 500-1 800 zł netto za 2 tygodnie.",
      },
      {
        q: "Czy macie nośniki przy trasie do Lublina?",
        a: "Tak, mamy nośniki bezpośrednio przy DK17, która jest główną trasą wylotową w kierunku Lublina i Lubelszczyzny - z dziennym ruchem rzędu kilkudziesięciu tysięcy pojazdów.",
      },
    ],
  },
  {
    slug: "marki",
    name: "Marki",
    nameLocative: "Markach",
    nameGenitive: "Marek",
    region: "powiat wołomiński",
    population: "39 tys.",
    intro:
      "Marki leżą przy trasie S8 - jednej z najbardziej obciążonych ruchowo dróg ekspresowych w Polsce. Nasze nośniki w Markach docierają zarówno do mieszkańców miasta, jak i do tysięcy kierowców z Wołomina, Ząbek i Warszawy dziennie.",
    routes: [
      "S8 (trasa Warszawa - Białystok)",
      "DK8 (Aleja Marszałka Piłsudskiego)",
      "DW631 (Marki - Nieporęt)",
    ],
    districts: ["Centrum", "Pustelnik", "Struga", "Hosanna"],
    useCases: [
      "Reklama dla branży motoryzacyjnej i salonów",
      "Kampanie deweloperskie",
      "Reklama centrów handlowych i marketów budowlanych",
      "Reklama dojazdowa dla kierowców z Warszawy",
    ],
    formats: ["Billboard 12×3 m (frontlight)", "Billboard 6×3 m", "Wielkoformat 30+ m²"],
    faqs: [
      {
        q: "Dlaczego warto reklamować się w Markach?",
        a: "Marki to brama wjazdowa do Warszawy od strony wschodniej i północno-wschodniej. Ruch na S8 i DK8 przekracza 50 000 pojazdów dziennie, co daje wyjątkowo wysoki zasięg kampanii.",
      },
      {
        q: "Czy w Markach są nośniki podświetlane?",
        a: "Tak, dysponujemy billboardami frontlight i backlight przy głównych arteriach - widoczność jest zachowana również po zmroku, co istotnie zwiększa ekspozycję wieczornej kampanii.",
      },
    ],
  },
  {
    slug: "piaseczno",
    name: "Piaseczno",
    nameLocative: "Piasecznie",
    nameGenitive: "Piaseczna",
    region: "powiat piaseczyński",
    population: "50 tys.",
    intro:
      "Piaseczno to dynamicznie rozwijające się miasto na południu aglomeracji warszawskiej, z dużą populacją osób dojeżdżających do pracy do stolicy. Nasze billboardy obsługują DK79, S7 oraz lokalne arterie - to mocny region dla reklamy dojazdowej i kampanii rodzinnych.",
    routes: [
      "DK79 (Warszawa - Góra Kalwaria)",
      "S7 (wylot na Kraków)",
      "DW721 (Piaseczno - Konstancin)",
    ],
    districts: ["Centrum", "Józefosław", "Julianów", "Zalesie Dolne", "Zalesie Górne"],
    useCases: [
      "Reklama deweloperska dla osiedli premium",
      "Kampanie dla branży edukacyjnej (szkoły, przedszkola)",
      "Reklama centrów handlowych i marketów",
      "Promocja usług medycznych i SPA",
    ],
    formats: ["Billboard 6×3 m", "Billboard 12×3 m", "Citylight"],
    faqs: [
      {
        q: "Czy w Piasecznie warto reklamować ofertę dla rodzin?",
        a: "Tak. Piaseczno to jedno z miast z najwyższym dochodem rozporządzalnym w okolicach Warszawy i wysokim odsetkiem młodych rodzin - idealny region dla reklam premium dóbr i usług dla dzieci.",
      },
      {
        q: "Czy obsługujecie również Konstancin?",
        a: "Tak, w ramach kampanii piaseczyńskiej możemy uzupełnić ofertę o nośniki w Konstancinie-Jeziornie oraz Górze Kalwarii.",
      },
    ],
  },
  {
    slug: "pruszkow",
    name: "Pruszków",
    nameLocative: "Pruszkowie",
    nameGenitive: "Pruszkowa",
    region: "powiat pruszkowski",
    population: "63 tys.",
    intro:
      "Pruszków to największe miasto powiatu pruszkowskiego, leżące na trasie A2 oraz S8. Nasze nośniki w Pruszkowie obsługują zarówno tranzyt międzymiastowy, jak i lokalne wyjazdy do Warszawy - to atrakcyjny rynek dla reklamy ogólnopolskiej i lokalnej.",
    routes: ["A2 (Warszawa - Berlin)", "S8", "DW719 (Pruszków - Żyrardów)", "Al. Wojska Polskiego"],
    districts: ["Centrum", "Żbików", "Bąki", "Malichy", "Tworki"],
    useCases: [
      "Reklama dla logistyki i transportu (A2)",
      "Kampanie centrów handlowych",
      "Promocja inwestycji deweloperskich",
      "Reklama dla branży produkcyjnej",
    ],
    formats: ["Billboard 12×3 m", "Billboard 6×3 m"],
    faqs: [
      {
        q: "Ile pojazdów dziennie przejeżdża przez Pruszków?",
        a: "Główne arterie Pruszkowa, w tym wjazdy na A2 i S8, obsługują dziennie ponad 30 000 pojazdów. To stawia Pruszków w czołówce miast Mazowsza pod względem efektywności kampanii outdoorowych.",
      },
    ],
  },
  {
    slug: "lomianki",
    name: "Łomianki",
    nameLocative: "Łomiankach",
    nameGenitive: "Łomianek",
    region: "powiat warszawski zachodni",
    population: "26 tys.",
    intro:
      "Łomianki leżą na trasie wylotowej z Warszawy w kierunku Gdańska (DK7 / S7). To miasto z wysokim wskaźnikiem zamożności mieszkańców i ważny korytarz tranzytowy - silna lokalizacja dla kampanii premium oraz reklamy dojazdowej.",
    routes: ["DK7 / S7 (Warszawa - Gdańsk)", "DW630 (Łomianki - Nowy Dwór Mazowiecki)"],
    districts: ["Centrum", "Dąbrowa", "Kiełpin", "Buraków", "Sadowa"],
    useCases: [
      "Reklama dla biznesu premium",
      "Promocja inwestycji deweloperskich",
      "Reklama dla branży motoryzacyjnej (S7)",
      "Kampanie wakacyjne dla ruchu turystycznego nad morze",
    ],
    formats: ["Billboard 12×3 m", "Billboard 6×3 m"],
    faqs: [
      {
        q: "Dlaczego billboard w Łomiankach to dobry wybór?",
        a: "DK7 / S7 to jedna z najpopularniejszych tras wakacyjnych Polaków. W sezonie letnim dzienny ruch wzrasta nawet o 40%, co zwiększa zasięg kampanii kierowanych do podróżujących.",
      },
    ],
  },
  {
    slug: "legionowo",
    name: "Legionowo",
    nameLocative: "Legionowie",
    nameGenitive: "Legionowa",
    region: "powiat legionowski",
    population: "54 tys.",
    intro:
      "Legionowo to ważny ośrodek mieszkaniowy na północ od Warszawy. Nasze nośniki obsługują DK61 oraz lokalne arterie miasta i okolicznych gmin (Jabłonna, Nieporęt) - region o dużej gęstości zaludnienia i wysokim popycie konsumenckim.",
    routes: ["DK61 (Warszawa - Augustów)", "DW632"],
    districts: ["Centrum", "Bukowiec", "Piaski"],
    useCases: [
      "Reklama dla lokalnego handlu",
      "Kampanie dla branży gastronomicznej",
      "Promocja usług medycznych i edukacyjnych",
      "Reklama deweloperska (Jabłonna, Wieliszew)",
    ],
    formats: ["Billboard 6×3 m", "Billboard 12×3 m"],
    faqs: [
      {
        q: "Czy macie też nośniki w Jabłonnie i Nieporęcie?",
        a: "Tak, w ramach kampanii legionowskiej możemy uzupełnić ofertę o nośniki w pobliskich gminach - Jabłonna, Nieporęt, Wieliszew i Serock.",
      },
    ],
  },
  {
    slug: "zabki",
    name: "Ząbki",
    nameLocative: "Ząbkach",
    nameGenitive: "Ząbek",
    region: "powiat wołomiński",
    population: "37 tys.",
    intro:
      "Ząbki to gęsto zaludnione miasto graniczące bezpośrednio z warszawskim Targówkiem. Nasze billboardy w Ząbkach obsługują głównie ruch lokalny i dojazdowy do Warszawy - to atrakcyjny rynek dla reklamy lokalnej i kampanii kierowanych do mieszkańców wschodniej Warszawy.",
    routes: ["DW634 (Warszawa - Wołomin)", "ul. Piłsudskiego", "ul. Andersa"],
    districts: ["Centrum", "Drewnica", "Zaciszne"],
    useCases: [
      "Reklama dla lokalnego handlu",
      "Promocja gabinetów medycznych i usług",
      "Kampanie deweloperskie",
      "Reklama dla branży spożywczej (sieci marketów)",
    ],
    formats: ["Billboard 6×3 m", "Citylight"],
    faqs: [
      {
        q: "Jak duży zasięg ma billboard w Ząbkach?",
        a: "DW634 to droga, którą codziennie przejeżdża ponad 25 000 pojazdów. Dodatkowo nośniki w Ząbkach docierają do mieszkańców wschodniej Warszawy (Targówek, Bródno).",
      },
    ],
  },
  {
    slug: "wolomin",
    name: "Wołomin",
    nameLocative: "Wołominie",
    nameGenitive: "Wołomina",
    region: "powiat wołomiński",
    population: "37 tys.",
    intro:
      "Wołomin to stolica powiatu wołomińskiego - rynek o silnym lokalnym popycie i rozwiniętym handlu. Nasze nośniki obsługują arterie wylotowe i centra miasta, docierając do mieszkańców Wołomina, Kobyłki, Marek i Zielonki.",
    routes: ["DW634 (Wołomin - Warszawa)", "DW635", "ul. Lipińska"],
    districts: ["Centrum", "Sławek", "Lipiny"],
    useCases: [
      "Reklama dla lokalnego handlu i gastronomii",
      "Promocja salonów samochodowych",
      "Reklama dla branży budowlanej i wykończeniowej",
    ],
    formats: ["Billboard 6×3 m", "Billboard 12×3 m"],
    faqs: [
      {
        q: "Czy kampania w Wołominie obejmie też Kobyłkę?",
        a: "Tak. Wołomin i Kobyłka tworzą jeden obszar funkcjonalny - kampania w obu miastach jednocześnie daje pełne pokrycie powiatu wołomińskiego.",
      },
    ],
  },
  {
    slug: "minsk-mazowiecki",
    name: "Mińsk Mazowiecki",
    nameLocative: "Mińsku Mazowieckim",
    nameGenitive: "Mińska Mazowieckiego",
    region: "powiat miński",
    population: "40 tys.",
    intro:
      "Mińsk Mazowiecki leży na strategicznej trasie A2 / DK2 w stronę Białorusi. To ważny rynek dla reklamy tranzytowej i logistycznej, a jednocześnie silna lokalizacja dla kampanii lokalnych w powiecie mińskim.",
    routes: ["A2 (Warszawa - Terespol)", "DK2", "DK50"],
    districts: ["Centrum", "Anielew", "Stare Miasto", "Stankowizna"],
    useCases: [
      "Reklama dla logistyki i transportu międzynarodowego",
      "Reklama dla branży motoryzacyjnej",
      "Kampanie centrów handlowych",
      "Reklama dla lokalnego handlu",
    ],
    formats: ["Billboard 12×3 m", "Billboard 6×3 m"],
    faqs: [
      {
        q: "Czy nośniki w Mińsku Mazowieckim docierają do kierowców jadących na wschód?",
        a: "Tak. Lokalizacje przy A2 i DK2 to jedne z najlepszych w regionie pod kątem ruchu tranzytowego w kierunku Białorusi i Litwy - szczególnie wartościowe dla firm logistycznych i przewoźników.",
      },
    ],
  },
  {
    slug: "grodzisk-mazowiecki",
    name: "Grodzisk Mazowiecki",
    nameLocative: "Grodzisku Mazowieckim",
    nameGenitive: "Grodziska Mazowieckiego",
    region: "powiat grodziski",
    population: "32 tys.",
    intro:
      "Grodzisk Mazowiecki to dynamicznie rozwijające się miasto na zachód od Warszawy, połączone WKD i drogą A2. Nasze billboardy obsługują ruch dojazdowy do Warszawy oraz lokalne arterie - to mocny rynek dla reklamy deweloperskiej i kampanii premium.",
    routes: ["A2 / DK50", "DW719 (Grodzisk - Pruszków)", "DW579"],
    districts: ["Centrum", "Łąki", "Kałęczyn"],
    useCases: [
      "Reklama deweloperska dla osiedli",
      "Kampanie dla branży edukacyjnej",
      "Promocja usług medycznych i SPA",
      "Reklama dla logistyki (A2)",
    ],
    formats: ["Billboard 6×3 m", "Billboard 12×3 m"],
    faqs: [
      {
        q: "Czy Grodzisk Mazowiecki to opłacalna lokalizacja kampanii?",
        a: "Tak. Mieszkańcy Grodziska mają jeden z wyższych wskaźników zamożności w regionie, a połączenie WKD z Warszawą zwiększa ruch dojazdowy - idealne dla reklamy premium produktów i usług.",
      },
    ],
  },
  {
    slug: "jozefow",
    name: "Józefów",
    nameLocative: "Józefowie",
    nameGenitive: "Józefowa",
    region: "powiat otwocki",
    population: "21 tys.",
    intro:
      "Józefów to ekskluzywne miasto willowe na południowy wschód od Warszawy, sąsiadujące z Otwockiem i Wisłą. Nasze nośniki w Józefowie obsługują DK801 oraz lokalne arterie - to wyjątkowo wartościowy rynek dla reklamy premium i kampanii kierowanych do zamożnych konsumentów.",
    routes: ["DK801 (Wał Miedzeszyński)", "DW721"],
    districts: ["Centrum", "Świder", "Michalin", "Błota"],
    useCases: [
      "Reklama premium produktów i usług",
      "Promocja branży motoryzacyjnej (klasa wyższa)",
      "Reklama deweloperska osiedli premium",
      "Promocja restauracji i konceptów lifestyle",
    ],
    formats: ["Billboard 6×3 m", "Citylight"],
    faqs: [
      {
        q: "Dlaczego Józefów to dobry wybór dla reklamy premium?",
        a: "Józefów ma jedne z najwyższych cen nieruchomości w okolicach Warszawy i znaczący odsetek mieszkańców z wysokim dochodem rozporządzalnym - idealne otoczenie dla reklamy marek premium.",
      },
    ],
  },
  {
    slug: "radom",
    name: "Radom",
    nameLocative: "Radomiu",
    nameGenitive: "Radomia",
    region: "subregion radomski",
    population: "200 tys.",
    intro:
      "Radom to drugie co do wielkości miasto województwa mazowieckiego. Nasze nośniki obsługują arterie miejskie, S7 oraz wyloty na Kielce i Lublin - to silny rynek dla kampanii regionalnych i ogólnopolskich z dużym zasięgiem.",
    routes: ["S7 (Warszawa - Kraków)", "DK9", "DK12"],
    districts: ["Śródmieście", "Borki", "Glinice", "Michałów", "Gołębiów"],
    useCases: [
      "Kampanie ogólnopolskie z silnym zasięgiem regionalnym",
      "Reklama dla logistyki (S7)",
      "Promocja sieci handlowych",
      "Reklama deweloperska",
    ],
    formats: ["Billboard 12×3 m", "Billboard 6×3 m", "Wielkoformat 30+ m²"],
    faqs: [
      {
        q: "Czy macie nośniki w centrum Radomia?",
        a: "Tak, dysponujemy lokalizacjami w Śródmieściu Radomia oraz przy głównych arteriach wlotowych. Dodatkowo mamy nośniki tranzytowe przy S7, która jest kluczową drogą krajową.",
      },
    ],
  },
  {
    slug: "plock",
    name: "Płock",
    nameLocative: "Płocku",
    nameGenitive: "Płocka",
    region: "subregion płocki",
    population: "115 tys.",
    intro:
      "Płock to istotny ośrodek przemysłowy w północno-zachodniej części Mazowsza. Nasze nośniki obsługują główne arterie miejskie oraz DK62 i DK60 - to dobry rynek dla reklamy regionalnej, B2B oraz kampanii adresowanych do branży chemicznej i logistycznej.",
    routes: ["DK62", "DK60", "DW567"],
    districts: ["Śródmieście", "Podolszyce", "Borowiczki", "Radziwie"],
    useCases: [
      "Reklama B2B i przemysłowa (PKN Orlen)",
      "Kampanie regionalne",
      "Reklama dla branży motoryzacyjnej",
    ],
    formats: ["Billboard 12×3 m", "Billboard 6×3 m"],
    faqs: [
      {
        q: "Czy macie nośniki przy zakładach Orlen?",
        a: "Tak, dysponujemy lokalizacjami przy głównych trasach dojazdowych do zakładów PKN Orlen - idealne dla reklamy B2B kierowanej do pracowników i kontrahentów przemysłu chemicznego.",
      },
    ],
  },
  {
    slug: "siedlce",
    name: "Siedlce",
    nameLocative: "Siedlcach",
    nameGenitive: "Siedlec",
    region: "subregion siedlecki",
    population: "77 tys.",
    intro:
      "Siedlce to stolica wschodniego Mazowsza, leżąca na trasie A2 w kierunku Białorusi. Nasze nośniki obsługują arterie miejskie i ruch tranzytowy - to wartościowy rynek dla kampanii regionalnych i reklamy ogólnopolskiej.",
    routes: ["A2", "DK2", "DK63"],
    districts: ["Śródmieście", "Roskosz", "Nowe Siedlce"],
    useCases: [
      "Reklama dla logistyki (A2)",
      "Kampanie regionalne",
      "Reklama dla sieci handlowych",
    ],
    formats: ["Billboard 12×3 m", "Billboard 6×3 m"],
    faqs: [
      {
        q: "Czy Siedlce to dobre miasto na kampanię ogólnopolską?",
        a: "Siedlce są strategicznym punktem dla kampanii zasięgowych skierowanych na wschód Polski. Lokalizacje przy A2 zapewniają wysoki dzienny ruch tranzytowy.",
      },
    ],
  },
  {
    slug: "ostroleka",
    name: "Ostrołęka",
    nameLocative: "Ostrołęce",
    nameGenitive: "Ostrołęki",
    region: "subregion ostrołęcki",
    population: "51 tys.",
    intro:
      "Ostrołęka to ważny ośrodek północno-wschodniego Mazowsza. Nasze nośniki obsługują DK61, DK53 oraz arterie miejskie - to dobry wybór dla kampanii skierowanych do mieszkańców regionu kurpiowskiego i ruchu tranzytowego na Mazury.",
    routes: ["DK61 (Warszawa - Augustów)", "DK53", "DK63"],
    districts: ["Śródmieście", "Stacja", "Wojciechowice"],
    useCases: [
      "Kampanie wakacyjne (ruch na Mazury)",
      "Reklama regionalna dla Kurpiów",
      "Promocja lokalnego handlu",
    ],
    formats: ["Billboard 6×3 m", "Billboard 12×3 m"],
    faqs: [
      {
        q: "Czy w sezonie letnim ruch w Ostrołęce wzrasta?",
        a: "Tak. DK61 to popularna trasa wjazdowa na Mazury, dzięki czemu w sezonie letnim dzienny ruch znacząco wzrasta - to dobry moment na kampanie turystyczne i wakacyjne.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const citySlugs = cities.map((c) => c.slug);
