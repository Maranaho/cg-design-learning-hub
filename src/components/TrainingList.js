import React from 'react';
import HubTitle from './HubTitle';
import Filters from './Filters';
import VideoList from './VideoList';

const TrainingList = () => {
  return (
    <div className="TrainingList">
      <HubTitle />
      <Filters />
      <VideoList />
    </div>
  );
};

export default TrainingList;
