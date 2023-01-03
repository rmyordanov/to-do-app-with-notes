const path =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=rating&q=time%20management&key=AIzaSyC4orojdavU7qNVYNoccwV1Ptn7PDziALs";
const apiKey = "AIzaSyC4orojdavU7qNVYNoccwV1Ptn7PDziALs";

export const getTopVideos = async () => {
  //   const options = {
  //     part:'snippet',
  //     key: apiKey,
  //     maxResults: 3,
  //     q: 'time management'
  //   }
  const result = await fetch(path);
  const data = await result.json();
  //   console.log(await result.json());
  console.log(data);
  return data;

  //   try {
  //     if (result) {
  //       return await result.json();
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
};
