class UserEdit {
  textValue ?: string;
  idx ?: number;
  booleanValue ?: boolean;

  constructor(textValue?: string, idx ?: number, booleanValue ?: boolean) {
    this.textValue = textValue;
    this.idx = idx;
    this.booleanValue = booleanValue;
  }
}

export default UserEdit;
