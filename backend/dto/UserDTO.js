class UserDTO {
  id;
  email;
  countryCode;
  phone;
  isActivated;

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.countryCode = user.countryCode;
    this.phone = user.phone;
    this.isActivated = user.isActivated === 1 ? true : false;
  }
}

export { UserDTO };