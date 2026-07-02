import React from "react";

const NewsItem = (props) => {
  const {
    title = "No title",
    description = "No description available",
    imageUrl,
    newsUrl,
    author = "author",
    date,
    name,
  } = props;
  const fallbackImage =
    "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/10/breakingnews-live-blog-1568185450-1595123397-1601776308.jpg";

  const displayTitle = title.length > 70 ? `${title.slice(0, 67)}...` : title;
  const displayDescription =
    description.length > 100 ? `${description.slice(0, 97)}...` : description;

  return (
    <div className="card mx-4" style={{ width: "18rem", height: "100%" , backgroundColor: "#1E293B" , color : "#ffffff"  , borderRadius:"20px"}}>
      <img
        src={imageUrl || fallbackImage}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
        className="card-img-top"
        alt={title}
        style={{
          height: "200px",
          objectFit: "cover",
          padding:"8px",
          borderRadius: "5px",
        }}
      />
      <div className="card-body" >
        <h5 className="card-title">{displayTitle}</h5>
        <span
          className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
          style={{ left: "10%", zIndex: "1" }}
        >
          {name}
          <span className="visually-hidden">unread messages</span>
        </span>
        <p className="card-text">{displayDescription}</p>
        <p className="card-text" >
          <small className="text-white"  style={{ color: "#ffffff" }}>
            By {!author ? "Unknown" : author.slice(0, 10)}... on Date :{" "}
            {new Date(date).toGMTString()}
          </small>
        </p>
        {newsUrl ? (
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-primary"
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              zIndex: "1",
            }}
          >
            Read More
          </a>
        ) : (
          <button className="btn btn-sm btn-secondary" disabled>
            No link
          </button>
        )}
      </div>
    </div>
  );
};
export default NewsItem;
