import React from "react";
import Billboard from "./Billboard";
import BestSellingBook from "./BestSellingBook";
import FeaturedBooks from "./FeaturedBooks";
import PopularBooks from "./PopularBooks";
import Quotation from "./Quotation";
// import SpecialOffer from "./SpecialOffer";
import LatestBlog from "./LatestBlog";

const Home = () => {
  return (
    <>
    <Billboard /> 
    <Quotation />
    <FeaturedBooks />
    <BestSellingBook />
    <PopularBooks /> 
    {/* <SpecialOffer /> */}
    <LatestBlog />
    </>
  );
};

export default Home;
