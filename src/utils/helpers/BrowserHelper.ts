class BrowserHelper {
  static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  static getLocalStorageItem(key: string): string {
    if (!BrowserHelper.isBrowser()) {
      return '';
    }

    return window.localStorage.getItem(key) || '';
  }

  static setLocalStorageItem(key: string, value: string | undefined): void {
    if (!BrowserHelper.isBrowser()) {
      return;
    }

    if (typeof key === 'string' && key.length > 0 && typeof value === 'string' && value.length > 0) {
      window.localStorage.setItem(key, value);
    }
  }

  static deleteLocalStorageItem(key: string): void {
    if (!BrowserHelper.isBrowser()) {
      return;
    }

    window.localStorage.removeItem(key);
  }
}

export default BrowserHelper;
