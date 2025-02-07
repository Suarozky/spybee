export async function getData() {
    const urls = [
      `${process.env.API_DEV_URL}/api/data`,
      `${process.env.API_URL}/api/data`,
    ];
  
    for (const url of urls) {
      const res = await fetch(url);
  
      if (res.ok) {
        return res.json();
      }
    }
  
    throw new Error("Products not found");
  }
  