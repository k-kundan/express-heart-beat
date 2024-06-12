
export const processMetricDate = async (metrics: {
  on_date: string,
  measurement: string
}[]) => {
  const result = [];
  let readsInTimeFrame = [];
  let prevDate: Date | undefined = undefined;
  for (let i = 1; i < metrics.length; i++) {
    if (!prevDate) {
      prevDate = new Date(metrics[i - 1]['on_date']);
    }
    const nextDate = new Date(metrics[i]['on_date']);
    const diff = Math.floor((nextDate.getTime() - prevDate.getTime()) / 60000);
    if (diff >= 15) {
      if (!readsInTimeFrame.length) {
        readsInTimeFrame.push(metrics[i - 1])
        readsInTimeFrame.push(metrics[i])
      }
      const reads = readsInTimeFrame.map((ele) => Number(ele.measurement));
      result.push({
        from_date: prevDate,
        to_date: nextDate,
        measurement: {
          low: String(Math.max(...reads)),
          high: String(Math.min(...reads))
        }
      });
      readsInTimeFrame = [];
      prevDate = undefined;
    } else {
      readsInTimeFrame.push(metrics[i]);
    }
  }
  return result;
}
