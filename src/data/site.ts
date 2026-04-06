export const CHURCH_OFFICIAL_NAME =
  "Igreja Assembleia de Deus - Ministério Madureira";
export const CHURCH_DISPLAY_NAME = "Assembleia de Deus Madureira Atibaia";
export const CHURCH_SHORT_NAME = "AD Madureira Atibaia";
export const CHURCH_FIELD_NAME = "Campo de Atibaia";
export const CHURCH_SCRIPT_NAME = "Assembleia de Deus";

export const SEDE_CONTACT = {
  whatsappNumber: "5511916116102",
  whatsappDisplay: "(11) 91611-6102",
  telephoneDisplay: "(11) 4411-6116",
  schemaTelephone: "+55-11-91611-6102",
} as const;

export const SEDE_WHATSAPP_URL = `https://wa.me/${SEDE_CONTACT.whatsappNumber}`;
export const SEDE_WHATSAPP_CONGREGACAO_URL =
  `${SEDE_WHATSAPP_URL}?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20a%20congregação.`;

export const SEDE_MAPS_URL =
  "https://www.google.com/maps/place/Assembleia+de+Deus+Ministerio+do+Madureira+Campo+de+Atibaia/@-23.1138703,-46.5602967,3a,75y,354.67h,95.37t/data=!3m7!1e1!3m5!1s72i0JDXKPIfhEeF7ZyK18Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-5.3700000000000045%26panoid%3D72i0JDXKPIfhEeF7ZyK18Q%26yaw%3D354.67!7i16384!8i8192!4m7!3m6!1s0x94cec17bc3bbfe13:0x7d8b6d61fad55210!8m2!3d-23.1136683!4d-46.5603364!10e5!16s%2Fg%2F11j833c2dh?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D";
export const SEDE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!4v1774042286295!6m8!1m7!1s72i0JDXKPIfhEeF7ZyK18Q!2m2!1d-23.11387028758019!2d-46.56029672665636!3f354.669383463814!4f5.373921824982375!5f0.7820865974627469";

export const SEDE_COORDINATES = {
  lat: -23.1136683,
  lng: -46.5603364,
} as const;

export const SEDE_ADDRESS = {
  streetAddress: "Praça Pio XII, 122",
  neighborhood: "Centro",
  city: "Atibaia",
  state: "SP",
  postalCode: "12940-160",
  country: "BR",
} as const;

export const SEDE_ADDRESS_LINES = [
  SEDE_ADDRESS.streetAddress,
  `${SEDE_ADDRESS.neighborhood} - ${SEDE_ADDRESS.city}/${SEDE_ADDRESS.state}`,
  `CEP ${SEDE_ADDRESS.postalCode}`,
] as const;

export const SEDE_ADDRESS_INLINE = `${SEDE_ADDRESS.streetAddress} · ${SEDE_ADDRESS.neighborhood} - ${SEDE_ADDRESS.city}/${SEDE_ADDRESS.state}`;
export const SEDE_ADDRESS_PRINT = `${SEDE_ADDRESS.streetAddress} · ${SEDE_ADDRESS.neighborhood} · ${SEDE_ADDRESS.city}/${SEDE_ADDRESS.state} · CEP ${SEDE_ADDRESS.postalCode}`;
export const SEDE_ADDRESS_SEO = `${SEDE_ADDRESS.streetAddress} – ${SEDE_ADDRESS.neighborhood}, ${SEDE_ADDRESS.city}/${SEDE_ADDRESS.state}`;
export const SEDE_ADDRESS_CONGREGACAO = `${SEDE_ADDRESS.streetAddress} – ${SEDE_ADDRESS.neighborhood} – ${SEDE_ADDRESS.city}/${SEDE_ADDRESS.state}`;
export const SEDE_EVENT_LOCATION = `Sede - ${SEDE_ADDRESS.streetAddress}, ${SEDE_ADDRESS.neighborhood}, ${SEDE_ADDRESS.city}/${SEDE_ADDRESS.state}`;
export const SEDE_PROGRAMACAO_LOCATION = `Sede — ${SEDE_ADDRESS.streetAddress}, ${SEDE_ADDRESS.neighborhood}, ${SEDE_ADDRESS.city}/${SEDE_ADDRESS.state}`;
export const SEDE_PLACE_NAME = "Assembleia de Deus Madureira — Sede";

export const SEDE_POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: SEDE_ADDRESS.streetAddress,
  addressLocality: SEDE_ADDRESS.city,
  addressRegion: SEDE_ADDRESS.state,
  postalCode: SEDE_ADDRESS.postalCode,
  addressCountry: SEDE_ADDRESS.country,
} as const;

export const SEDE_GEO_COORDINATES = {
  "@type": "GeoCoordinates",
  latitude: SEDE_COORDINATES.lat,
  longitude: SEDE_COORDINATES.lng,
} as const;

export const SEDE_PROGRAMACAO_HORARIOS = {
  oracaoMatinalSemana: "06h00 – 07h00",
  cursoTeologia: "19h30",
  cultoEnsino: "19h30",
  consagracao: "09h00",
  circuloOracao: "15h00",
  ensaioIrmas: "19h00",
  quintaVitoria: "19h30",
  tardeLibertacao: "14h30",
  oracaoMatinalDomingo: "08h00",
  ebdDomingo: "09h00",
  ensaioJovensDomingo: "11h00",
  cultoFamiliaDomingo: "18h30",
} as const;

export const SEDE_HORARIOS_CONTATO = [
  "Segunda a Sexta · 06:00 – 07:00 · Oração Matinal",
  "Segunda · 19:30 – Curso de Teologia",
  "Terça · 19:30 – Culto de Ensino",
  "Quarta · 09:00 – Consagração",
  "Quarta · 15:00 – Círculo de Oração",
  "Quarta · 19:00 – Ensaio das Irmãs",
  "Quinta · 19:30 – Culto de Quinta",
  "Sexta · 14:30 – Tarde de Libertação",
  "Domingo · 08:00 – Oração Matinal",
  "Domingo · 09:00 – Escola Bíblica Dominical (EBD)",
  "Domingo · 11:00 – Ensaio Jovens Rios de Unção",
  "Domingo · 18:30 – Culto da Família",
] as const;

export const SEDE_HORARIOS_CONGREGACAO = [
  "Segunda a Sexta · 06h00 – 07h00 · Oração Matinal",
  "Segunda · 19h30 · Curso de Teologia",
  "Terça · 19h30 · Culto de Ensino",
  "Quarta · 09h00 · Consagração",
  "Quarta · 15h00 · Círculo de Oração",
  "Quarta · 19h00 · Ensaio das Irmãs",
  "Quinta · 19h30 · Culto de Quinta",
  "Sexta · 14h30 · Tarde de Libertação",
  "Domingo · 08h00 · Oração Matinal",
  "Domingo · 09h00 · Escola Bíblica Dominical (EBD)",
  "Domingo · 11h00 · Ensaio Jovens Rios de Unção",
  "Domingo · 18h30 · Culto da Família",
] as const;

export const SEDE_HORARIOS_RESUMIDOS = [
  "Segunda a Sexta — 06:00 / 07:00",
  "Segunda — 19:30",
  "Terça — 19:30",
  "Quarta — 09:00 / 15:00 / 19:00",
  "Quinta — 19:30",
  "Sexta — 14:30",
  "Domingo — 08:00 / 09:00 / 11:00 / 18:30",
] as const;

export const OFFICIAL_SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@midia.ad.madureira",
  instagram: "https://www.instagram.com/admadureira_atibaia/",
  youtube: "https://www.youtube.com/@ADMadureiraAtibaia",
  facebook: "https://www.facebook.com/ADMadureiraSedeAtibaia/",
} as const;

export const CHURCH_SCHEMA_SAME_AS = [
  OFFICIAL_SOCIAL_LINKS.instagram,
  OFFICIAL_SOCIAL_LINKS.youtube,
] as const;
