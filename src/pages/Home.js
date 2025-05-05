import React from "react";
import Billboard from "./Billboard";
import BestSellingBook from "./BestSellingBook";
import FeaturedBooks from "./FeaturedBooks";
import PopularBooks from "./PopularBooks";
import Quotation from "./Quotation";
import SpecialOffer from "./SpecialOffer";
import LatestBlog from "./LatestBlog";
import DownloadApp from './DownloadApp';

const Home = () => {
  return (
    <>
    <Billboard /> 
    <Quotation />
    <FeaturedBooks />
    <BestSellingBook />
    <PopularBooks /> 
    <DownloadApp />
    <SpecialOffer />
    <LatestBlog />
    </>
  );
};

export default Home;
