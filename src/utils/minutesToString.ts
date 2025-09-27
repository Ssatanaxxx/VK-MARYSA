export default function minutesToString(minutesTotal: number): string {
  const hours: number = Math.floor(minutesTotal / 60);
  const minutes: number = minutesTotal % 60;

  function getWordEnding(number: number, wordEndForms: string[]): string {
    const lastTwoDigits: number = Math.abs(number) % 100;
    if (lastTwoDigits > 10 && lastTwoDigits < 20) {
      return wordEndForms[2];
    }
    const lastDigit: number = lastTwoDigits % 10;
    if (lastDigit > 1 && lastDigit < 5) {
      return wordEndForms[1];
    }
    if (lastDigit === 1) {
      return wordEndForms[0];
    }
    return wordEndForms[2];
  }

  const hourWordEndForms: string[] = ["час", "часа", "часов"];
  const minuteWordEndForms: string[] = ["минута", "минуты", "минут"];

  const hoursStr: string =
    hours > 0 ? `${hours} ${getWordEnding(hours, hourWordEndForms)}` : "";
  const minutesStr: string =
    minutes > 0
      ? `${minutes} ${getWordEnding(minutes, minuteWordEndForms)}`
      : "";

  if (hours > 0 && minutes === 0) {
    return hoursStr;
  } else if (hours > 0 && minutes > 0) {
    return `${hoursStr} ${minutesStr}`;
  } else {
    return minutesStr;
  }
}
