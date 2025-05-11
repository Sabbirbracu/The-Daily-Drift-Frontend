const CommentCard = ({ comments }) => {
  return (
    <div className="flex items-center mt-10">
      <div className="felx gap-1 items-center">
        {/* <img src="" alt="" /> */}
        <h3>author name</h3>
      </div>
      <p>comment</p>
    </div>
  );
};

export default CommentCard;
