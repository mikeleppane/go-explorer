export class LocalStorage<Type> {
  private readonly _state: Type;
  private readonly _key: string;

  constructor(initialState: Type, key: string) {
    this._key = key;
    const storage = localStorage.getItem(this._key);
    if (storage) {
      this._state = JSON.parse(storage) as Type;
    } else {
      this._state = initialState;
      localStorage.setItem(this._key, JSON.stringify(this._state));
    }
  }

  get state(): Type {
    const storage = localStorage.getItem(this._key);
    if (storage) {
      return JSON.parse(storage) as Type;
    }
    return this._state;
  }

  set state(state: Type) {
    localStorage.setItem(this._key, JSON.stringify(state));
  }
}
