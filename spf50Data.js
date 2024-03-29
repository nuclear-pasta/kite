let cachedSpf50Data = [];

export async function fetchSpf50Data() {
  if (cachedSpf50Data.length === 0) {
    const res = await fetch('https://sheetdb.io/api/v1/pbw45bqdwlytn');
    const data = await res.json();

    // Modify each image URL to route through the cacheImage serverless function
    cachedSpf50Data = data.map(item => ({
      ...item,
      Image: `/api/cacheImage?imageUrl=${encodeURIComponent(item.Image)}`
    }));
  }
  return cachedSpf50Data;
}

export async function fetchSpf50Ids() {
  const spf50Data = await fetchSpf50Data();
  const ids = spf50Data.map((item) => item.ID.toString());
  return ids;
}
