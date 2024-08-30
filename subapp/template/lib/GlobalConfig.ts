class GlobalConfig {
  private _url: string = '';
  private _token: string = '';

  public get url(): string {
    return this._url;
  }

  public set url(value: string) {
    this._url = value;
  }

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }
}

export const Global = new GlobalConfig();
