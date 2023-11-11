export const fetcher = (url: string, params?: any) => {
  if (params) url += "?" + new URLSearchParams(params);

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(async (res) => await res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
