export const getPage = async (page: string) => {
    const index = await Bun.file("src/api/pages/index.html").text();
   const slot = await Bun.file("src/api/pages/"+page+".html").text();
   return `${index}<slot content>${slot}</slot>`;
};