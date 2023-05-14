import { useEffect, useState } from 'react';
import { getRecommendList } from '../api/todo';

interface RecommendListType {
  searchTerm: string;
}

const RecommendList = ({ searchTerm }: RecommendListType) => {
  const [recommendList, setRecommendList] = useState([]);

  const onRecommendList = async () => {
    if (searchTerm) {
      const { data } = await getRecommendList(searchTerm);
      setRecommendList(data.result);
    }
  };
  useEffect(() => {
    onRecommendList();
  }, [searchTerm]);

  return (
    <ul>
      {recommendList.map((recommendWord, index) => (
        <li key={`recommend-${index}`}>{recommendWord}</li>
      ))}
    </ul>
  );
};

export default RecommendList;
