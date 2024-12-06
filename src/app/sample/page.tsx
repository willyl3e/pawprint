import "./styles.css";

export default function sampleArticle() {
  return (
    <>
      <div className="articleHead">
        <span className="title">
          White house is in big trouble! The british are coming
        </span>
        <span className="subTitle">Read the title</span>
        <span className="datePub">JANUARY 3RD, 2024 </span>
      </div>
      <div className="imgContainer">
        <img src="/whitehouse.jpg" width="100%"></img>
        <span className="caption">The White House earlier this year.</span>
      </div>
      <main>
        <div className="infoBox">
          <div className="authorImageBox">
            <img src="/rochelle.jpg" className="authorImage" width="70px"></img>
            <img src="/rochelle.jpg" className="authorImage" width="70px"></img>
          </div>
          <span className="authorNames">
            <span className="authorNameLink">William Lee</span> and{" "}
            <span className="authorNameLink">John Doe</span>
          </span>
        </div>
        <p>
          The British today announced their decision to invade the United States
          again in order to burn down and defenestrate the people in the White
          House.
        </p>
      </main>
    </>
  );
}
