declare namespace App {
  type ContentType = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data';
  interface DataType {
    number: number;
    string: string;
    boolean: boolean;
    null: null;
    undefined: undefined;
    symbol: symbol;
    bigInt: bigint;
    object: Record<string, any>;
    array: Array<any>;
    function: (...args: any[]) => any | void;
    date: Date;
    regExp: RegExp;
    promise: Promise<any>;
    set: Set<any>;
    map: Map<any, any>;
    file: File;
  }
  type DataTypeStringKey = keyof DataType;
  type Capitalize<S extends string> = intrinsic;
  type DataTypeString<T extends DataTypeStringKey = DataTypeStringKey> = `[object ${Capitalize<T>}]`;
  /** The strategic pattern */
  interface StrategicPattern {
    /** The condition */
    condition: boolean;
    /** If the condition is true, then call the action function */
    callback: () => void;
  }

  /**
   * The option type
   *
   * @property value: The option value
   * @property label: The option label
   */
  type Option<K = string> = { value: K; label: string };

  type YesOrNo = 'Y' | 'N';

  /** add null to all properties */
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | null;
  };
}
