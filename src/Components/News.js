import React, { useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
const [articles,setArticles]=React.useState([]);
const [page,setPage]=React.useState(1);
const pageSize=8;
const [totalResults,setTotalResults]=React.useState(null);
const [error,setError]=React.useState(null);

 const capitalizeFirstLetter=(string)=>{
    return string[0].toUpperCase()+string.slice(1);
  }
 

  const componentDidMount =async () =>{
    // it is used for api date get from third party or api .. it runs after render happens..
    setArticles([]);
    setPage(1);
    fetchNews(1);
  }
useEffect(()=>{
  componentDidMount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.category])
  const fetchMoreData = async () => {
    const nextPageNum = page + 1;
    setPage(nextPageNum);
    setError(null);
    await fetchNews(nextPageNum, true);
  }

 const fetchNews = async (pageNum, append = false) => {
    props.setProgress(0);
    if (!append) {
       setError(null);
    }
    try {
      let url = `http://localhost:5000/news?category=${props.category}&page=${pageNum}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
        props.setProgress(20);
      let parsedData = await data.json();
      props.setProgress(60);
      setArticles(prevArticles => append ? prevArticles.concat(parsedData.articles || []) : (parsedData.articles || []));
      setTotalResults(Math.min(parsedData.totalResults || 0, 100));
      if (!append) {
        setPage(pageNum);
      } else {
        setPage(pageNum);
      }
      setError(
        parsedData.status && parsedData.status !== "ok"
          ? parsedData.message || "Failed to fetch news"
          : null
      );
       document.title=`${capitalizeFirstLetter(props.category)}-NewsApp`;
    } 
    catch (error) {
      setError(error.message || "Failed to fetch news");
      
    }
     props.setProgress(100);
  };

  const getMaxPage = () => {
    const cappedResults = Math.min(totalResults || 0, 100);
    if (!Number.isFinite(cappedResults) || cappedResults <= 0) return null;
    return Math.ceil(cappedResults / pageSize);
  };

  // handlenextclick = async () => {
  //   const maxPage = this.getMaxPage();
  //   if (maxPage !== null && page + 1 >= maxPage) return;
  //   const nextPage = page + 1;
  //   this.fetchNews(nextPage);
  // };

  // handlepreviousclick = async () => {
  //   if (page > 1) {
  //     const prevPage = page - 1;
  //     this.fetchNews(prevPage);
  //   }
  // };

    const filteredArticles = (articles || []).filter(
      (article) => article.url
    );
    return (
      <div className="container my-2">
        <h1 className="text-center" style={{margin:"55px 0px" , marginTop:"53px"}}>NewsApp : Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}

         <InfiniteScroll
          dataLength={filteredArticles.length}
          next={fetchMoreData}
          hasMore={getMaxPage() === null || page < getMaxPage()}
          loader={<Spinner />}
        >
        <div className="row">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {filteredArticles.map((element) => (
              <div className="col-md-3 my-4" key={element.url || element.title}>
                <NewsItem
                  title={element.title ? element.title : "No title"}
                  description={
                    element.description
                      ? element.description
                      : "No description available"
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  name={element.source.name}
                />
              </div>
            ))}
        </div>
        </InfiniteScroll> 
        {/* <div className="d-flex justify-content-between my-2 ">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-secondary"
            onClick={this.handlepreviousclick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.getMaxPage() !== null &&
              page >= this.getMaxPage()
            }
            type="button"
            className="btn btn-secondary"
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }

News.propTypes={
  category: PropTypes.string,
  pageSize: PropTypes.number,
  totalResults: PropTypes.number,
  setProgress: PropTypes.func.isRequired
};

News.defaultProps={
    pageSize : 8,
    category:"sports"
  };

export default News;
  News.propTypes={
    pageSize: PropTypes.number,
    category: PropTypes.string
  }