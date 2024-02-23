class Shift {
    constructor({id, place, date, start, end, location, rate, pharmacistId, createdAt, updatedAt, isActive}) {
      this.id = id ?? new Date().getTime().toString();
      this.place = place;
      this.date = date;
      this.start = start;
      this.end = end;
      this.location = location;
      this.rate = rate;
      this.pharmacistId = pharmacistId;
      this.createdAt = createdAt ?? new Date();
      this.updatedAt = updatedAt ?? new Date();
      this.isActive = isActive ?? true;
    }

    // id: 1,
    // place: 'RightHealth Pharmacy',
    // date: '2022-07-01',
    // start: '08:00',
    // end: '16:00',
    // location: 'Ifako-Agege',
    // rate: 2400,
    // total: (16 - 8) * 2400,
  
  }
  
  export default Shift;
  