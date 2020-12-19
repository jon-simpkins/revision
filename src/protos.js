/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.WritingWorkspace = (function() {
    
        /**
         * Properties of a WritingWorkspace.
         * @exports IWritingWorkspace
         * @interface IWritingWorkspace
         * @property {string|null} [name] WritingWorkspace name
         * @property {IWritingWorkspaceMetadata|null} [metadata] WritingWorkspace metadata
         */
    
        /**
         * Constructs a new WritingWorkspace.
         * @exports WritingWorkspace
         * @classdesc Represents a WritingWorkspace.
         * @implements IWritingWorkspace
         * @constructor
         * @param {IWritingWorkspace=} [properties] Properties to set
         */
        function WritingWorkspace(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * WritingWorkspace name.
         * @member {string} name
         * @memberof WritingWorkspace
         * @instance
         */
        WritingWorkspace.prototype.name = "";
    
        /**
         * WritingWorkspace metadata.
         * @member {IWritingWorkspaceMetadata|null|undefined} metadata
         * @memberof WritingWorkspace
         * @instance
         */
        WritingWorkspace.prototype.metadata = null;
    
        /**
         * Creates a new WritingWorkspace instance using the specified properties.
         * @function create
         * @memberof WritingWorkspace
         * @static
         * @param {IWritingWorkspace=} [properties] Properties to set
         * @returns {WritingWorkspace} WritingWorkspace instance
         */
        WritingWorkspace.create = function create(properties) {
            return new WritingWorkspace(properties);
        };
    
        /**
         * Encodes the specified WritingWorkspace message. Does not implicitly {@link WritingWorkspace.verify|verify} messages.
         * @function encode
         * @memberof WritingWorkspace
         * @static
         * @param {IWritingWorkspace} message WritingWorkspace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WritingWorkspace.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
                $root.WritingWorkspaceMetadata.encode(message.metadata, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified WritingWorkspace message, length delimited. Does not implicitly {@link WritingWorkspace.verify|verify} messages.
         * @function encodeDelimited
         * @memberof WritingWorkspace
         * @static
         * @param {IWritingWorkspace} message WritingWorkspace message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WritingWorkspace.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a WritingWorkspace message from the specified reader or buffer.
         * @function decode
         * @memberof WritingWorkspace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {WritingWorkspace} WritingWorkspace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WritingWorkspace.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WritingWorkspace();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.metadata = $root.WritingWorkspaceMetadata.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a WritingWorkspace message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof WritingWorkspace
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {WritingWorkspace} WritingWorkspace
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WritingWorkspace.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a WritingWorkspace message.
         * @function verify
         * @memberof WritingWorkspace
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WritingWorkspace.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.metadata != null && message.hasOwnProperty("metadata")) {
                var error = $root.WritingWorkspaceMetadata.verify(message.metadata);
                if (error)
                    return "metadata." + error;
            }
            return null;
        };
    
        /**
         * Creates a WritingWorkspace message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof WritingWorkspace
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {WritingWorkspace} WritingWorkspace
         */
        WritingWorkspace.fromObject = function fromObject(object) {
            if (object instanceof $root.WritingWorkspace)
                return object;
            var message = new $root.WritingWorkspace();
            if (object.name != null)
                message.name = String(object.name);
            if (object.metadata != null) {
                if (typeof object.metadata !== "object")
                    throw TypeError(".WritingWorkspace.metadata: object expected");
                message.metadata = $root.WritingWorkspaceMetadata.fromObject(object.metadata);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a WritingWorkspace message. Also converts values to other types if specified.
         * @function toObject
         * @memberof WritingWorkspace
         * @static
         * @param {WritingWorkspace} message WritingWorkspace
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WritingWorkspace.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.metadata = null;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.metadata != null && message.hasOwnProperty("metadata"))
                object.metadata = $root.WritingWorkspaceMetadata.toObject(message.metadata, options);
            return object;
        };
    
        /**
         * Converts this WritingWorkspace to JSON.
         * @function toJSON
         * @memberof WritingWorkspace
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WritingWorkspace.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return WritingWorkspace;
    })();
    
    $root.WritingWorkspaceMetadata = (function() {
    
        /**
         * Properties of a WritingWorkspaceMetadata.
         * @exports IWritingWorkspaceMetadata
         * @interface IWritingWorkspaceMetadata
         * @property {number|null} [numberOfSessions] WritingWorkspaceMetadata numberOfSessions
         */
    
        /**
         * Constructs a new WritingWorkspaceMetadata.
         * @exports WritingWorkspaceMetadata
         * @classdesc Represents a WritingWorkspaceMetadata.
         * @implements IWritingWorkspaceMetadata
         * @constructor
         * @param {IWritingWorkspaceMetadata=} [properties] Properties to set
         */
        function WritingWorkspaceMetadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * WritingWorkspaceMetadata numberOfSessions.
         * @member {number} numberOfSessions
         * @memberof WritingWorkspaceMetadata
         * @instance
         */
        WritingWorkspaceMetadata.prototype.numberOfSessions = 0;
    
        /**
         * Creates a new WritingWorkspaceMetadata instance using the specified properties.
         * @function create
         * @memberof WritingWorkspaceMetadata
         * @static
         * @param {IWritingWorkspaceMetadata=} [properties] Properties to set
         * @returns {WritingWorkspaceMetadata} WritingWorkspaceMetadata instance
         */
        WritingWorkspaceMetadata.create = function create(properties) {
            return new WritingWorkspaceMetadata(properties);
        };
    
        /**
         * Encodes the specified WritingWorkspaceMetadata message. Does not implicitly {@link WritingWorkspaceMetadata.verify|verify} messages.
         * @function encode
         * @memberof WritingWorkspaceMetadata
         * @static
         * @param {IWritingWorkspaceMetadata} message WritingWorkspaceMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WritingWorkspaceMetadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.numberOfSessions != null && Object.hasOwnProperty.call(message, "numberOfSessions"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.numberOfSessions);
            return writer;
        };
    
        /**
         * Encodes the specified WritingWorkspaceMetadata message, length delimited. Does not implicitly {@link WritingWorkspaceMetadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof WritingWorkspaceMetadata
         * @static
         * @param {IWritingWorkspaceMetadata} message WritingWorkspaceMetadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WritingWorkspaceMetadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a WritingWorkspaceMetadata message from the specified reader or buffer.
         * @function decode
         * @memberof WritingWorkspaceMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {WritingWorkspaceMetadata} WritingWorkspaceMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WritingWorkspaceMetadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WritingWorkspaceMetadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.numberOfSessions = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a WritingWorkspaceMetadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof WritingWorkspaceMetadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {WritingWorkspaceMetadata} WritingWorkspaceMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WritingWorkspaceMetadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a WritingWorkspaceMetadata message.
         * @function verify
         * @memberof WritingWorkspaceMetadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WritingWorkspaceMetadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.numberOfSessions != null && message.hasOwnProperty("numberOfSessions"))
                if (!$util.isInteger(message.numberOfSessions))
                    return "numberOfSessions: integer expected";
            return null;
        };
    
        /**
         * Creates a WritingWorkspaceMetadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof WritingWorkspaceMetadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {WritingWorkspaceMetadata} WritingWorkspaceMetadata
         */
        WritingWorkspaceMetadata.fromObject = function fromObject(object) {
            if (object instanceof $root.WritingWorkspaceMetadata)
                return object;
            var message = new $root.WritingWorkspaceMetadata();
            if (object.numberOfSessions != null)
                message.numberOfSessions = object.numberOfSessions >>> 0;
            return message;
        };
    
        /**
         * Creates a plain object from a WritingWorkspaceMetadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof WritingWorkspaceMetadata
         * @static
         * @param {WritingWorkspaceMetadata} message WritingWorkspaceMetadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WritingWorkspaceMetadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.numberOfSessions = 0;
            if (message.numberOfSessions != null && message.hasOwnProperty("numberOfSessions"))
                object.numberOfSessions = message.numberOfSessions;
            return object;
        };
    
        /**
         * Converts this WritingWorkspaceMetadata to JSON.
         * @function toJSON
         * @memberof WritingWorkspaceMetadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WritingWorkspaceMetadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return WritingWorkspaceMetadata;
    })();

    return $root;
});
