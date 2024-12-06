import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import Link from "next/link";

const searchClient = algoliasearch(
  "1DNU60T3R9", // Your Algolia Application ID
  "87138654c84f1bd46e6c7ab71e4df437" // Your Algolia Search-Only API Key
);

type HitType = {
  title: string;
  author: string;
  objectID:string
};

const Hit: React.FC<{ hit: HitType }> = ({ hit }) => (
  <Link href={"/article/"+hit.objectID}>
    <div
      className="hit"
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
      }}
    >
      <h3>{hit.title}</h3>
      <h2>{hit.author}</h2>
    </div>
  </Link>
);

export default Hit;

export function Search() {
  return (
    <div
      className="search-container"
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <InstantSearchNext indexName="pawprint" searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearchNext>

      <style jsx>{`
        .search-container {
          padding: 20px;
          max-width: 800px;
          margin: auto;
        }
        .hit {
          border: 1px solid #ddd;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
