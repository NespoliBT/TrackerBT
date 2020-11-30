class Task {
  desc: string;
  hours: number;
  date: Date;

  constructor(desc: string, hours: number, date: Date) {
    this.desc = desc;
    this.hours = hours;
    this.date = date;
  }
}

export default Task;
