export class AuthState {
  static Authenticated = new AuthState('authenticated');
  static Unauthenticated = new AuthState('unauthenticated');
  static Pending = new AuthState('pending')

  constructor(name) {
    this.name = name;
  }
}
