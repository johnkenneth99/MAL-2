import { Inter } from "next/font/google";
import { Fragment, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { FILTERS, API_ROUTES } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [animeList, setAnimeList] = useState(null);
  const [count, setCount] = useState(0);

  const { data = null } = useFetch(process.env.NEXT_PUBLIC_API_PATH.concat(API_ROUTES.SEASONS_NOW));

  useEffect(() => {
    if (data === null) return;

    setAnimeList(data);
  }, [data]);

  return (
    <main className={`w-full min-h-screen min-w-[640px] px-32 pb-10 bg-white ${inter.className}`}>
      <div className="flex justify-center w-full bg-primary">
        <h1 className="text-white text-2xl font-medium p-3">Upcoming Anime</h1>
      </div>
      <div className="flex flex-wrap justify-start w-full bg-white my-2">
        {FILTERS.map(({ label, value }, index) => (
          <Fragment key={label.concat(index)}>
            <Button label={label} onClick={() => console.log(value)} />
          </Fragment>
        ))}
      </div>
      <section className="grid grid-rows-25 grid-cols-1 gap-6 lg:grid-rows-10 lg:grid-cols-3">
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
