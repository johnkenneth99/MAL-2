import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChartLine, FaRectangleList, FaLink, FaCirclePlay, FaHandBackFist, FaHatWizard, FaPiedPiperHat, FaHeart } from "react-icons/fa6";
import { truncateText } from "@/functions/helpers";

const TABS = {
  SUMMARY: 0,
  STATS: 1,
  STREAM: 2,
  LINKS: 3,
};

export default function Card({ imageSource, episodes, genres, title, altTitle, synopsis, stats }) {
  const [activeTab, setActiveTab] = useState(TABS.SUMMARY);

  return (
    <div className="flex flex-row max-h-[250px] outline outline-1 outline-slate-300 m-5 rounded">
      <div className="relative min-w-[175px] max-w-[175px]">
        <Image src={imageSource} alt="Thumbnail" width={1920} height={1080} objectFit="contain" />
      </div>
      <nav role="tabList" className="flex flex-col align-center justify-between bg-primary text-white">
        <button className="p-4 py-5 bg-accent" onClick={() => setActiveTab(TABS.SUMMARY)}>
          <FaRectangleList size="1.5rem" />
        </button>
        <button className="p-4 py-5" onClick={() => setActiveTab(TABS.STATS)}>
          <FaChartLine size="1.5rem" />
        </button>
        <button className="p-4 py-5" onClick={() => setActiveTab(TABS.SUMMARY)}>
          <FaCirclePlay size="1.5rem" />
        </button>
        <button className="px-4 py-5" onClick={() => setActiveTab(TABS.SUMMARY)}>
          <FaLink size="1.5rem" />
        </button>
      </nav>
      <div className="m-2 max-h-60 overflow-auto">
        {activeTab === TABS.SUMMARY && <Summary title={title} altTitle={altTitle} synopsis={synopsis} genres={genres} episodes={episodes} />}
        {activeTab === TABS.STATS && <Stats {...stats} />}
      </div>
    </div>
  );
}

const GENRE_ICONS = {
  ACTION: <FaHandBackFist color="" />,
  ADVENTURE: <FaPiedPiperHat />,
  FANTASY: <FaHatWizard color="purple" />,
  ROMANCE: <FaHeart color="pink" />,
};

function Summary({ title, altTitle, synopsis, genres, episodes }) {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-medium">{title}</h1>
        <h2 className="text-sm text-slate-600">{altTitle.at(0)}</h2>
      </div>
      <div className="">
        <p>
          <strong>Episodes:</strong> {episodes || "N/A"}
        </p>
        <span>
          <strong>Genres:</strong>
          {!!genres.length &&
            genres.map(({ name }) => (
              <button className="outline outline-1 outline-slate-300 rounded py-1 px-3 mx-1 m-2 hover:bg-secondary">
                <div className="flex flex-row justify-center align-center">
                  <span className="mt-1 mr-1">{GENRE_ICONS[name.toUpperCase()]}</span>
                  <p>{name}</p>
                </div>
              </button>
            ))}
        </span>
        <p>
          <strong>Synopsis:</strong> {synopsis}
        </p>
      </div>
    </>
  );
}

function Stats({ score, scored_by, rank, popularity, members, favorites }) {
  return (
    <>
      <h1>Stats page</h1>
      <p>
        <strong>Score:</strong> {score}
      </p>
      <p>
        <strong>Scored By:</strong> {scored_by}
      </p>
      <p>
        <strong>Rank:</strong> {rank}
      </p>
      <p>
        <strong>Popularity:</strong> {popularity}
      </p>
      <p>
        <strong>Members:</strong> {members}
      </p>
      <p>
        <strong>Favorites:</strong> {favorites}
      </p>
    </>
  );
}
