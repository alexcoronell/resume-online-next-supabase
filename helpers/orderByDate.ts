export const orderByYearAndMonth = (data: any) => {
    return data.sort((a: any, b: any) => {
      if (a.year < b.year) return 1;
      if (a.year > b.year) return -1;
      if(a.year === b.year && a.month < b.month) return 1;
      if(a.year === b.year && a.month > b.month) return -1;
      return 0;
    });
  };