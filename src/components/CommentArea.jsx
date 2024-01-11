import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = ({ asin }) => {
  const [comments, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [asin]);

  const fetchComments = async () => {
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTliZmRlYmUwZGQxZDAwMTgyZDE3NjgiLCJpYXQiOjE3MDQ3MjE4OTksImV4cCI6MTcwNTkzMTQ5OX0.KUa3ZuV_ghbFwVz_BnfoQ5cTvW0KWN-D73DAZ1a0Ebw",
        },
      });
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        setComment(comments);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      {asin && <AddComment asin={asin} />}
      {asin && <CommentList commentsToShow={comments} />}
    </div>
  );
};

export default CommentArea;
