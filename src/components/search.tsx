import algoliasearch from "algoliasearch";
import { SearchBox, Hits } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import Link from "next/link";
import "./components.css";
import "@/styles/globals.css";
import returnDateDetails from "./date";

const searchClient = algoliasearch(
  "1DNU60T3R9", // Your Algolia Application ID
  "07d6377fd2941f9a30964bcfbe03680c" // Your Algolia Search-Only API Key
);

type HitType = {
  title: string;
  author: string;
  objectID: string;
  img: string;
  date: string;
};

const Hit: React.FC<{ hit: HitType }> = ({ hit }) => {
  console.log(hit.date);

  const { monthString, dayString, numberday, year } = returnDateDetails(
    hit.date
  );
  
  return (
    <>
      <Link href={`/article/${hit.objectID}`}>
        <div key={hit.objectID} className="articleBlock mb-6">
          <img src={hit.img} width="100%"></img>
          <div className="ml-7">
            <span className="block text-[2em] leading-9 mb-3 mt-1">
              {hit.title}
            </span>
            <span className="WorkSans text-[#969696] text-[.8em]">
              {hit.author} ∙{" "}
            </span>
            <span className="WorkSans text-[#969696] text-[.8em]">{`${dayString}, ${monthString} ${numberday}, ${year}`}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Hit;

export function Search() {
  return (
    <div
      className="search-container"
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        placeSelf:"start"
      }}
    >
      <InstantSearchNext indexName="pawprint" searchClient={searchClient}>
        <SearchBox
          placeholder="Search articles..."
          className="custom-search-box"
          autoFocus={true}
        />{" "}
        <Hits hitComponent={Hit} />
      </InstantSearchNext>
    </div>
  );
}