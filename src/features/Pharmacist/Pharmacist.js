class Pharmacist {
  constructor({ id, firstname, lastname, email, phoneNumber, address, password, photo, availability, shifts }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.password = password;
    this.photo = photo;
    this.availability = availability;
    this.shifts = shifts;
  }
}

export default Pharmacist;
