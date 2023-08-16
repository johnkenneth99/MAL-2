import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import {
  FaChartLine,
  FaRectangleList,
  FaLink,
  FaCirclePlay,
  FaHandBackFist,
  FaHatWizard,
  FaPiedPiperHat,
  FaHeart,
  FaMasksTheater,
  FaGhost,
} from "react-icons/fa6";

import { GiUfo, GiDragonShield, GiTheaterCurtains } from "react-icons/gi";
import { PiDetectiveFill, PiHandEyeFill } from "react-icons/pi";
import classNames from "classnames";

const TABS = {
  SUMMARY: 0,
  STATS: 1,
  STREAM: 2,
  LINKS: 3,
};

export default function Card({ imageSource, episodes, genres, title, altTitle, synopsis, stats }) {
  const [activeTab, setActiveTab] = useState(TABS.SUMMARY);

  const isSummary = activeTab === TABS.SUMMARY;
  const isStats = activeTab === TABS.STATS;

  const summaryClassName = classNames("p-4", { "bg-accent": isSummary }, { " hover:bg-secondary": !isSummary });
  const statsClassName = classNames("p-4", { "bg-accent": isStats }, { " hover:bg-secondary": !isStats });

  return (
    <div className="flex flex-row outline outline-1 outline-slate-300 rounded">
      <div className="relative min-w-[175px] max-w-[175px] overflow-hidden">
        <Image className="absolute" src={imageSource} alt="Thumbnail" width={1920} height={1080} />
      </div>
      <nav role="tabList" className="flex flex-col align-center bg-primary text-white">
        <button className={summaryClassName} onClick={() => setActiveTab(TABS.SUMMARY)}>
          <FaRectangleList size="1.5rem" />
        </button>
        <button className={statsClassName} onClick={() => setActiveTab(TABS.STATS)}>
          <FaChartLine size="1.5rem" />
        </button>
        <button className="p-4 py-5 hover:bg-secondary" onClick={() => setActiveTab(TABS.STREAM)}>
          <FaCirclePlay size="1.5rem" />
        </button>
        <button className="p-4  hover:bg-secondary" onClick={() => setActiveTab(TABS.LINKS)}>
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
  DRAMA: <GiTheaterCurtains color="brown" />,
  COMEDY: <FaMasksTheater />,
  HORROR: <FaGhost />,
  SUSPENSE: <PiDetectiveFill />,
  FANTASY: <GiDragonShield />,
  SUPERNATURAL: <PiHandEyeFill />,
  ["SCI-FI"]: <GiUfo />,
};

function Summary({ title, altTitle, synopsis, genres, episodes }) {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-medium">{title}</h1>
        <h2 className="text-sm text-slate-600">{altTitle.at(0)}</h2>
      </div>
      <div className="">
        <p>{synopsis}</p>
        {/* <p>
          <strong>Episodes:</strong> {episodes || "N/A"}
        </p> */}
        {/* <span>
          <strong>Genres:</strong>
          {!!genres.length &&
            genres.map(({ name }) => (
              <>
                <Button icon={GENRE_ICONS[name.toUpperCase()]} label={name} />
              </>
            ))}
        </span> */}
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
