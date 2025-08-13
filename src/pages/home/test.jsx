import { useEffect, useState } from 'react';
import ImageList from './Components/ImageList';
import { useScrollObserver } from './Hooks/useScrollObserver';

function App() {
  const [imageList, setImageList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isBottom = useScrollObserver();
  console.log('isBottom: ', isBottom);

  useEffect(() => {
    if (isBottom && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isBottom]);

  async function fetchImages(pageNumber) {
    setIsLoading(true);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=5`);

      if (!response.ok) {
        throw new Error('네트워크에 문제가 있습니다!');
      }

      const data = await response.json();
      setImageList((prevImageList) => [...prevImageList, ...data]);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  return (
    <div>
      <ImageList imageList={imageList} />
    </div>
  );
}

export default App;
