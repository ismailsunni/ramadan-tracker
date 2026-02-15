declare module "dayjs-hijri" {
  const hijriPlugin: any;
  export default hijriPlugin;
}

import "dayjs";

declare module "dayjs" {
  interface Dayjs {
    iYear(): number;
    iYear(value: number): Dayjs;
    iMonth(): number;
    iMonth(value: number): Dayjs;
    iDate(): number;
    iDate(value: number): Dayjs;
  }
}
