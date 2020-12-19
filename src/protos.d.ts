import Long = require('long');
import * as $protobuf from "protobufjs";
/** Properties of a Timestamp. */
export interface ITimestamp {

    /** Timestamp seconds */
    seconds?: (number|Long|null);

    /** Timestamp nanos */
    nanos?: (number|null);
}

/** Represents a Timestamp. */
export class Timestamp implements ITimestamp {

    /**
     * Constructs a new Timestamp.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITimestamp);

    /** Timestamp seconds. */
    public seconds: (number|Long);

    /** Timestamp nanos. */
    public nanos: number;

    /**
     * Creates a new Timestamp instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Timestamp instance
     */
    public static create(properties?: ITimestamp): Timestamp;

    /**
     * Encodes the specified Timestamp message. Does not implicitly {@link Timestamp.verify|verify} messages.
     * @param message Timestamp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link Timestamp.verify|verify} messages.
     * @param message Timestamp message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Timestamp message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Timestamp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Timestamp;

    /**
     * Decodes a Timestamp message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Timestamp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Timestamp;

    /**
     * Verifies a Timestamp message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Timestamp
     */
    public static fromObject(object: { [k: string]: any }): Timestamp;

    /**
     * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
     * @param message Timestamp
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Timestamp to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Duration. */
export interface IDuration {

    /** Duration seconds */
    seconds?: (number|Long|null);

    /** Duration nanos */
    nanos?: (number|null);
}

/** Represents a Duration. */
export class Duration implements IDuration {

    /**
     * Constructs a new Duration.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDuration);

    /** Duration seconds. */
    public seconds: (number|Long);

    /** Duration nanos. */
    public nanos: number;

    /**
     * Creates a new Duration instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Duration instance
     */
    public static create(properties?: IDuration): Duration;

    /**
     * Encodes the specified Duration message. Does not implicitly {@link Duration.verify|verify} messages.
     * @param message Duration message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Duration message, length delimited. Does not implicitly {@link Duration.verify|verify} messages.
     * @param message Duration message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Duration message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Duration
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Duration;

    /**
     * Decodes a Duration message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Duration
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Duration;

    /**
     * Verifies a Duration message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Duration message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Duration
     */
    public static fromObject(object: { [k: string]: any }): Duration;

    /**
     * Creates a plain object from a Duration message. Also converts values to other types if specified.
     * @param message Duration
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Duration, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Duration to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WritingSession. */
export interface IWritingSession {

    /** WritingSession start */
    start?: (ITimestamp|null);

    /** WritingSession duration */
    duration?: (IDuration|null);
}

/** Represents a WritingSession. */
export class WritingSession implements IWritingSession {

    /**
     * Constructs a new WritingSession.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWritingSession);

    /** WritingSession start. */
    public start?: (ITimestamp|null);

    /** WritingSession duration. */
    public duration?: (IDuration|null);

    /**
     * Creates a new WritingSession instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WritingSession instance
     */
    public static create(properties?: IWritingSession): WritingSession;

    /**
     * Encodes the specified WritingSession message. Does not implicitly {@link WritingSession.verify|verify} messages.
     * @param message WritingSession message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWritingSession, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WritingSession message, length delimited. Does not implicitly {@link WritingSession.verify|verify} messages.
     * @param message WritingSession message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWritingSession, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WritingSession message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WritingSession
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WritingSession;

    /**
     * Decodes a WritingSession message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WritingSession
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WritingSession;

    /**
     * Verifies a WritingSession message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a WritingSession message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WritingSession
     */
    public static fromObject(object: { [k: string]: any }): WritingSession;

    /**
     * Creates a plain object from a WritingSession message. Also converts values to other types if specified.
     * @param message WritingSession
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WritingSession, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WritingSession to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WritingWorkspaceMetadata. */
export interface IWritingWorkspaceMetadata {

    /** WritingWorkspaceMetadata sessionHistory */
    sessionHistory?: (IWritingSession[]|null);
}

/** Represents a WritingWorkspaceMetadata. */
export class WritingWorkspaceMetadata implements IWritingWorkspaceMetadata {

    /**
     * Constructs a new WritingWorkspaceMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWritingWorkspaceMetadata);

    /** WritingWorkspaceMetadata sessionHistory. */
    public sessionHistory: IWritingSession[];

    /**
     * Creates a new WritingWorkspaceMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WritingWorkspaceMetadata instance
     */
    public static create(properties?: IWritingWorkspaceMetadata): WritingWorkspaceMetadata;

    /**
     * Encodes the specified WritingWorkspaceMetadata message. Does not implicitly {@link WritingWorkspaceMetadata.verify|verify} messages.
     * @param message WritingWorkspaceMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWritingWorkspaceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WritingWorkspaceMetadata message, length delimited. Does not implicitly {@link WritingWorkspaceMetadata.verify|verify} messages.
     * @param message WritingWorkspaceMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWritingWorkspaceMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WritingWorkspaceMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WritingWorkspaceMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WritingWorkspaceMetadata;

    /**
     * Decodes a WritingWorkspaceMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WritingWorkspaceMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WritingWorkspaceMetadata;

    /**
     * Verifies a WritingWorkspaceMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a WritingWorkspaceMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WritingWorkspaceMetadata
     */
    public static fromObject(object: { [k: string]: any }): WritingWorkspaceMetadata;

    /**
     * Creates a plain object from a WritingWorkspaceMetadata message. Also converts values to other types if specified.
     * @param message WritingWorkspaceMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WritingWorkspaceMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WritingWorkspaceMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WritingWorkspace. */
export interface IWritingWorkspace {

    /** WritingWorkspace name */
    name?: (string|null);

    /** WritingWorkspace metadata */
    metadata?: (IWritingWorkspaceMetadata|null);
}

/** Represents a WritingWorkspace. */
export class WritingWorkspace implements IWritingWorkspace {

    /**
     * Constructs a new WritingWorkspace.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWritingWorkspace);

    /** WritingWorkspace name. */
    public name: string;

    /** WritingWorkspace metadata. */
    public metadata?: (IWritingWorkspaceMetadata|null);

    /**
     * Creates a new WritingWorkspace instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WritingWorkspace instance
     */
    public static create(properties?: IWritingWorkspace): WritingWorkspace;

    /**
     * Encodes the specified WritingWorkspace message. Does not implicitly {@link WritingWorkspace.verify|verify} messages.
     * @param message WritingWorkspace message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWritingWorkspace, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WritingWorkspace message, length delimited. Does not implicitly {@link WritingWorkspace.verify|verify} messages.
     * @param message WritingWorkspace message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWritingWorkspace, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WritingWorkspace message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WritingWorkspace
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WritingWorkspace;

    /**
     * Decodes a WritingWorkspace message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WritingWorkspace
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WritingWorkspace;

    /**
     * Verifies a WritingWorkspace message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a WritingWorkspace message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WritingWorkspace
     */
    public static fromObject(object: { [k: string]: any }): WritingWorkspace;

    /**
     * Creates a plain object from a WritingWorkspace message. Also converts values to other types if specified.
     * @param message WritingWorkspace
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WritingWorkspace, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WritingWorkspace to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
