class UIHelpers {

  static delay(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export default UIHelpers;