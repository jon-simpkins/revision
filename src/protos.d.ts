import * as $protobuf from "protobufjs";
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

/** Properties of a WritingWorkspaceMetadata. */
export interface IWritingWorkspaceMetadata {

    /** WritingWorkspaceMetadata numberOfSessions */
    numberOfSessions?: (number|null);
}

/** Represents a WritingWorkspaceMetadata. */
export class WritingWorkspaceMetadata implements IWritingWorkspaceMetadata {

    /**
     * Constructs a new WritingWorkspaceMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWritingWorkspaceMetadata);

    /** WritingWorkspaceMetadata numberOfSessions. */
    public numberOfSessions: number;

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
