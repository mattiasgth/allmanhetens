export class AllmanhetensDate {
  year: number;
  month: number; // 1-12
  day: number; // 1-31

  constructor(dateString: string|null) {
    let parsed = this.parseDateString(dateString);
    this.year = parsed.year;
    this.month = parsed.month;
    this.day = parsed.day;
  }

  private setTodayDate = (): AllmanhetensDate => {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1; // getMonth() returns 0-11, we want 1-12
    this.day = today.getDate();
    return this;
  };

  public parseDateString(dateString: string|null): AllmanhetensDate {

    // Validate format with regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateString === null || !dateRegex.test(dateString)) {
      return this.setTodayDate();
    }

    // Split and parse components
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // Validate ranges
    if (
      isNaN(year) || isNaN(month) || isNaN(day) ||
      year < 1000 || year > 9999 ||
      month < 1 || month > 12 ||
      day < 1 || day > 31
    ) {
      return this.setTodayDate();
    }

    // Additional validation: check if the date is actually valid
    // (handles cases like February 30th, April 31st, etc.)
    const testDate = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    if (
      testDate.getFullYear() !== year ||
      testDate.getMonth() !== month - 1 ||
      testDate.getDate() !== day
    ) {
      return this.setTodayDate();
    }

    this.year = year;
    this.month = month;
    this.day = day;
    return this;
  }

  public toString(): string {
    // Pad numbers with leading zeros if needed
    const year = this.year.toString();
    const month = this.month.toString().padStart(2, '0');
    const day = this.day.toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  public addDays(days: number): AllmanhetensDate {
    // Create a Date object (month is 0-indexed in Date constructor)
    const date = new Date(this.year, this.month - 1, this.day);

    // Add the specified number of days
    date.setDate(date.getDate() + days);
    let dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, "0")}`;
    let rslt = new AllmanhetensDate(dateString);
    return rslt;
  }
}



