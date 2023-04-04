import React from 'react';
import { useParams } from 'react-router-dom';
import useAsset from '../hooks/useAsset';
import Loading from './Loading';

const Detail = () => {
  const { assetID } = useParams();
  const dbAsset = useAsset(assetID);

  if (!dbAsset) return <Loading />;

  return <p>Detail</p>;
};
export default Detail;
