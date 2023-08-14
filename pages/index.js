import { Inter } from "next/font/google";
import { Fragment, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

const API_ROUTES = {
  GENRE_ANIME: "/genres/anime",
  SEASONS_NOW: "/seasons/now",
};

export default function Home() {
  const [animeList, setAnimeList] = useState(null);
  const [count, setCount] = useState(0);

  const { data = null } = useFetch(process.env.NEXT_PUBLIC_API_PATH.concat(API_ROUTES.SEASONS_NOW));

  useEffect(() => {
    if (data === null) return;

    setAnimeList(data);
  }, [data]);

  return (
    <main className={`w-full min-h-screen min-w-[640px] bg-white ${inter.className}`}>
      <div className="flex justify-center w-full bg-primary mb-2">
        <h1 className="text-white text-2xl font-medium p-3">Upcoming Anime</h1>
      </div>
      <button className="w-full bg-secondary p-5 text-white" onClick={() => setCount((current) => current + 1)}>
        {count}
      </button>
      <section className="grid grid-rows-25 grid-cols-1 lg:grid-rows-10 lg:grid-cols-3">
        {!!data?.length &&
          data.map(({ images, title, title_synonyms, synopsis, episodes, genres, score, scored_by, rank, popularity, members, favorites }, index) => {
            const props = {
              stats: {
                score,
                scored_by,
                rank,
                popularity,
                members,
                favorites,
              },
              synopsis,
              title,
              episodes,
              genres,
              altTitle: title_synonyms,
              imageSource: images.webp.image_url,
            };

            return (
              <Fragment key={index}>
                <Card {...props} />
              </Fragment>
            );
          })}
      </section>
    </main>
  );
}
