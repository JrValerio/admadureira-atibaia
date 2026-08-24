import type { MetadataRoute } from "next";
import { getEventosFuturos } from "@/lib/agenda-utils";
import { getCongregacoes } from "@/data/congregacoes";
import { getDevotionals } from "@/data/devocionais";
import {
  hasConfiguredPodcastFeed,
  hasConfiguredRadioStream,
} from "@/data/espiritualidade";
import {
  getClassesEbdPublicadas,
  getTrimestrePublicLessonCount,
  getTrimestresPorClasse,
  isLicaoPubliclyAvailable,
  isTrimestreDraft,
} from "@/lib/ebd-utils";
import { getMensagens } from "@/data/mensagens";
import { getMinisterios } from "@/data/ministerios";
import { getPastores } from "@/data/pastores";
import { getReadingPlans } from "@/data/plano-de-leitura";
import { getTestemunhos } from "@/data/testemunhos";
import { getGaleriaAlbuns, getGaleriaLatestDate } from "@/data/galeria";
import { resolveSiteUrl } from "@/lib/site";
import { getYouTubeChannelVideos } from "@/lib/youtube";

function parseContentDate(date: string) {
  return new Date(`${date}T12:00:00-03:00`);
}

function getLatestDate(dates: Date[]): Date | undefined {
  if (dates.length === 0) {
    return undefined;
  }

  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

// Prioridade das páginas para o Google
// 1.0 = home | 0.9 = páginas principais | 0.7 = páginas secundárias
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generatedAt = new Date();
  const availabilityDate = generatedAt;
  const [mensagens, testemunhos, channelVideos] = await Promise.all([
    getMensagens(),
    getTestemunhos(),
    getYouTubeChannelVideos(),
  ]);
  const devotionals = getDevotionals();
  const classesEbd = getClassesEbdPublicadas(availabilityDate);
  const galeriaAlbuns = getGaleriaAlbuns();
  const readingPlans = getReadingPlans();
  const eventosFuturos = getEventosFuturos();

  const latestMensagemDate = getLatestDate(
    mensagens.map((mensagem) => parseContentDate(mensagem.data))
  );
  const latestTestemunhoDate = getLatestDate(
    testemunhos.map((testemunho) => parseContentDate(testemunho.data))
  );
  const latestChannelVideoDate = getLatestDate(
    channelVideos.videos
      .map((video) => video.publishedAt)
      .filter((publishedAt): publishedAt is string => Boolean(publishedAt))
      .map((publishedAt) => new Date(publishedAt))
  );
  const latestDevotionalDate = getLatestDate(
    devotionals.map((devotional) => parseContentDate(devotional.data))
  );
  const latestEbdDate = getLatestDate(
    classesEbd.flatMap((classe) =>
      getTrimestresPorClasse(classe.slug).flatMap((trimestre) =>
        isTrimestreDraft(trimestre)
          ? []
          : trimestre.licoes
          .filter((licao) =>
            isLicaoPubliclyAvailable(trimestre, licao, availabilityDate)
          )
          .map((licao) => parseContentDate(licao.data))
      )
    )
  );
  const latestGaleriaDate = getGaleriaLatestDate() ?? undefined;

  const paginasBase: MetadataRoute.Sitemap = [
    {
      url: resolveSiteUrl(""),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: resolveSiteUrl("/programacao"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: resolveSiteUrl("/programacao/curso-de-teologia"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/eventos"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: resolveSiteUrl("/eventos/congresso-mocidade-rios-de-uncao-2026"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: resolveSiteUrl("/sobre"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/historia"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/congregacoes"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/pastores"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/ministerios"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/mensagens"),
      lastModified: latestMensagemDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/galeria"),
      lastModified: latestGaleriaDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/testemunhos"),
      lastModified: latestTestemunhoDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/videos"),
      lastModified: latestChannelVideoDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/oracao"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/contato"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/oferta"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/espiritualidade"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/espiritualidade/versiculo-do-dia"),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/espiritualidade/biblia"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/espiritualidade/plano-de-leitura"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: resolveSiteUrl("/espiritualidade/devocional"),
      lastModified: latestDevotionalDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: resolveSiteUrl("/ebd"),
      lastModified: latestEbdDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const paginasEvento: MetadataRoute.Sitemap = eventosFuturos.map((evento) => ({
    url: resolveSiteUrl(`/eventos/${evento.slug}`),
    // A data do evento não representa a data de modificação do conteúdo; omitir é melhor que inventar.
    changeFrequency: "weekly",
    priority: evento.destaque ? 0.9 : 0.8,
  }));

  const paginasPastores: MetadataRoute.Sitemap = getPastores().map((pastor) => ({
    url: resolveSiteUrl(`/pastores/${pastor.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const paginasCongregacoes: MetadataRoute.Sitemap = getCongregacoes().map(
    (congregacao) => ({
      url: resolveSiteUrl(`/congregacoes/${congregacao.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const paginasMinisterios: MetadataRoute.Sitemap = getMinisterios().map(
    (ministerio) => ({
      url: resolveSiteUrl(`/ministerios/${ministerio.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const paginasMensagens: MetadataRoute.Sitemap = mensagens.map(
    (mensagem) => ({
      url: resolveSiteUrl(`/mensagens/${mensagem.slug}`),
      lastModified: parseContentDate(mensagem.data),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const paginasTestemunhos: MetadataRoute.Sitemap = testemunhos.map(
    (testemunho) => ({
      url: resolveSiteUrl(`/testemunhos/${testemunho.slug}`),
      lastModified: parseContentDate(testemunho.data),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const paginasGaleria: MetadataRoute.Sitemap = galeriaAlbuns.map((album) => ({
    url: resolveSiteUrl(`/galeria/${album.slug}`),
    lastModified: parseContentDate(album.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const paginasDevocionais: MetadataRoute.Sitemap = devotionals.map(
    (devotional) => ({
      url: resolveSiteUrl(`/espiritualidade/devocional/${devotional.slug}`),
      lastModified: parseContentDate(devotional.data),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const paginasPlanosLeitura: MetadataRoute.Sitemap = readingPlans.map((plan) => ({
    url: resolveSiteUrl(`/espiritualidade/plano-de-leitura/${plan.slug}`),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const paginasAudioEspiritualidade: MetadataRoute.Sitemap = [
    ...(hasConfiguredRadioStream
      ? [
          {
            url: resolveSiteUrl("/espiritualidade/radio"),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...(hasConfiguredPodcastFeed
      ? [
          {
            url: resolveSiteUrl("/espiritualidade/podcast"),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
  ];

  const paginasEbdClasse: MetadataRoute.Sitemap = classesEbd.map((classe) => {
    const trimestres = getTrimestresPorClasse(classe.slug).filter(
      (trimestre) => getTrimestrePublicLessonCount(trimestre, availabilityDate) > 0
    );
    const lastModified = getLatestDate(
      trimestres.flatMap((trimestre) =>
        trimestre.licoes
          .filter((licao) =>
            isLicaoPubliclyAvailable(trimestre, licao, availabilityDate)
          )
          .map((licao) => parseContentDate(licao.data))
      )
    );

    return {
      url: resolveSiteUrl(`/ebd/${classe.slug}`),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });

  const paginasEbdTrimestre: MetadataRoute.Sitemap = classesEbd.flatMap((classe) =>
    getTrimestresPorClasse(classe.slug)
      .filter((trimestre) => getTrimestrePublicLessonCount(trimestre, availabilityDate) > 0)
      .map((trimestre) => ({
        url: resolveSiteUrl(`/ebd/${classe.slug}/${trimestre.slug}`),
        lastModified: getLatestDate(
          trimestre.licoes
            .filter((licao) =>
              isLicaoPubliclyAvailable(trimestre, licao, availabilityDate)
            )
            .map((licao) => parseContentDate(licao.data))
        ),
        changeFrequency: "weekly",
        priority: getTrimestrePublicLessonCount(trimestre, availabilityDate) >= 13 ? 0.7 : 0.6,
      }))
  );

  const paginasEbdLicao: MetadataRoute.Sitemap = classesEbd.flatMap((classe) =>
    getTrimestresPorClasse(classe.slug)
      .filter((trimestre) => getTrimestrePublicLessonCount(trimestre, availabilityDate) > 0)
      .flatMap((trimestre) =>
      trimestre.licoes
        .filter((licao) =>
          isLicaoPubliclyAvailable(trimestre, licao, availabilityDate)
        )
        .map((licao) => ({
          url: resolveSiteUrl(`/ebd/${classe.slug}/${trimestre.slug}/${licao.slug}`),
          lastModified: parseContentDate(licao.data),
          changeFrequency: "weekly",
          priority: 0.7,
        }))
    )
  );

  const paginasDiasPlanoLeitura: MetadataRoute.Sitemap = readingPlans.flatMap((plan) =>
    plan.dias.map((day) => ({
      url: resolveSiteUrl(
        `/espiritualidade/plano-de-leitura/${plan.slug}/dia/${day.dia}`
      ),
      changeFrequency: "weekly",
      priority: 0.6,
    }))
  );

  return [
    ...paginasBase,
    ...paginasEvento,
    ...paginasPastores,
    ...paginasCongregacoes,
    ...paginasMinisterios,
    ...paginasMensagens,
    ...paginasGaleria,
    ...paginasTestemunhos,
    ...paginasDevocionais,
    ...paginasPlanosLeitura,
    ...paginasDiasPlanoLeitura,
    ...paginasAudioEspiritualidade,
    ...paginasEbdClasse,
    ...paginasEbdTrimestre,
    ...paginasEbdLicao,
  ];
}
