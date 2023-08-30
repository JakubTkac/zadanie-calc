export async function fetcher(url: string, option = {}) {
  let response;
  if (!option) {
    response = await fetch(url);
  } else {
    response = await fetch(url, option);
  }
  return await response.json();
}
