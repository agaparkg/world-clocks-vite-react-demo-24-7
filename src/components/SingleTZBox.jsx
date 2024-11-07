const SingleTZBox = ({ id, zoneName, zoneTime }) => {
  return (
    <div className="single-timezone">
      <span>X</span>
      <h3 className="single-clock">{zoneName}</h3>
      <div>{zoneTime}</div>
    </div>
  );
};

export default SingleTZBox;
