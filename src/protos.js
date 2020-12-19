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
    
    $root.Timestamp = (function() {
    
        /**
         * Properties of a Timestamp.
         * @exports ITimestamp
         * @interface ITimestamp
         * @property {number|Long|null} [seconds] Timestamp seconds
         * @property {number|null} [nanos] Timestamp nanos
         */
    
        /**
         * Constructs a new Timestamp.
         * @exports Timestamp
         * @classdesc Represents a Timestamp.
         * @implements ITimestamp
         * @constructor
         * @param {ITimestamp=} [properties] Properties to set
         */
        function Timestamp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Timestamp seconds.
         * @member {number|Long} seconds
         * @memberof Timestamp
         * @instance
         */
        Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Timestamp nanos.
         * @member {number} nanos
         * @memberof Timestamp
         * @instance
         */
        Timestamp.prototype.nanos = 0;
    
        /**
         * Creates a new Timestamp instance using the specified properties.
         * @function create
         * @memberof Timestamp
         * @static
         * @param {ITimestamp=} [properties] Properties to set
         * @returns {Timestamp} Timestamp instance
         */
        Timestamp.create = function create(properties) {
            return new Timestamp(properties);
        };
    
        /**
         * Encodes the specified Timestamp message. Does not implicitly {@link Timestamp.verify|verify} messages.
         * @function encode
         * @memberof Timestamp
         * @static
         * @param {ITimestamp} message Timestamp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Timestamp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
            if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
            return writer;
        };
    
        /**
         * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link Timestamp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Timestamp
         * @static
         * @param {ITimestamp} message Timestamp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Timestamp message from the specified reader or buffer.
         * @function decode
         * @memberof Timestamp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Timestamp} Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Timestamp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Timestamp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seconds = reader.int64();
                    break;
                case 2:
                    message.nanos = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Timestamp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Timestamp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Timestamp} Timestamp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Timestamp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Timestamp message.
         * @function verify
         * @memberof Timestamp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Timestamp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seconds != null && message.hasOwnProperty("seconds"))
                if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                    return "seconds: integer|Long expected";
            if (message.nanos != null && message.hasOwnProperty("nanos"))
                if (!$util.isInteger(message.nanos))
                    return "nanos: integer expected";
            return null;
        };
    
        /**
         * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Timestamp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Timestamp} Timestamp
         */
        Timestamp.fromObject = function fromObject(object) {
            if (object instanceof $root.Timestamp)
                return object;
            var message = new $root.Timestamp();
            if (object.seconds != null)
                if ($util.Long)
                    (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                else if (typeof object.seconds === "string")
                    message.seconds = parseInt(object.seconds, 10);
                else if (typeof object.seconds === "number")
                    message.seconds = object.seconds;
                else if (typeof object.seconds === "object")
                    message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
            if (object.nanos != null)
                message.nanos = object.nanos | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Timestamp
         * @static
         * @param {Timestamp} message Timestamp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Timestamp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.seconds = options.longs === String ? "0" : 0;
                object.nanos = 0;
            }
            if (message.seconds != null && message.hasOwnProperty("seconds"))
                if (typeof message.seconds === "number")
                    object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                else
                    object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
            if (message.nanos != null && message.hasOwnProperty("nanos"))
                object.nanos = message.nanos;
            return object;
        };
    
        /**
         * Converts this Timestamp to JSON.
         * @function toJSON
         * @memberof Timestamp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Timestamp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Timestamp;
    })();
    
    $root.Duration = (function() {
    
        /**
         * Properties of a Duration.
         * @exports IDuration
         * @interface IDuration
         * @property {number|Long|null} [seconds] Duration seconds
         * @property {number|null} [nanos] Duration nanos
         */
    
        /**
         * Constructs a new Duration.
         * @exports Duration
         * @classdesc Represents a Duration.
         * @implements IDuration
         * @constructor
         * @param {IDuration=} [properties] Properties to set
         */
        function Duration(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * Duration seconds.
         * @member {number|Long} seconds
         * @memberof Duration
         * @instance
         */
        Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * Duration nanos.
         * @member {number} nanos
         * @memberof Duration
         * @instance
         */
        Duration.prototype.nanos = 0;
    
        /**
         * Creates a new Duration instance using the specified properties.
         * @function create
         * @memberof Duration
         * @static
         * @param {IDuration=} [properties] Properties to set
         * @returns {Duration} Duration instance
         */
        Duration.create = function create(properties) {
            return new Duration(properties);
        };
    
        /**
         * Encodes the specified Duration message. Does not implicitly {@link Duration.verify|verify} messages.
         * @function encode
         * @memberof Duration
         * @static
         * @param {IDuration} message Duration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Duration.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
            if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
            return writer;
        };
    
        /**
         * Encodes the specified Duration message, length delimited. Does not implicitly {@link Duration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Duration
         * @static
         * @param {IDuration} message Duration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Duration.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a Duration message from the specified reader or buffer.
         * @function decode
         * @memberof Duration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Duration} Duration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Duration.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Duration();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.seconds = reader.int64();
                    break;
                case 2:
                    message.nanos = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a Duration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Duration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Duration} Duration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Duration.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a Duration message.
         * @function verify
         * @memberof Duration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Duration.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seconds != null && message.hasOwnProperty("seconds"))
                if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                    return "seconds: integer|Long expected";
            if (message.nanos != null && message.hasOwnProperty("nanos"))
                if (!$util.isInteger(message.nanos))
                    return "nanos: integer expected";
            return null;
        };
    
        /**
         * Creates a Duration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Duration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Duration} Duration
         */
        Duration.fromObject = function fromObject(object) {
            if (object instanceof $root.Duration)
                return object;
            var message = new $root.Duration();
            if (object.seconds != null)
                if ($util.Long)
                    (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                else if (typeof object.seconds === "string")
                    message.seconds = parseInt(object.seconds, 10);
                else if (typeof object.seconds === "number")
                    message.seconds = object.seconds;
                else if (typeof object.seconds === "object")
                    message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
            if (object.nanos != null)
                message.nanos = object.nanos | 0;
            return message;
        };
    
        /**
         * Creates a plain object from a Duration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Duration
         * @static
         * @param {Duration} message Duration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Duration.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.seconds = options.longs === String ? "0" : 0;
                object.nanos = 0;
            }
            if (message.seconds != null && message.hasOwnProperty("seconds"))
                if (typeof message.seconds === "number")
                    object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                else
                    object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
            if (message.nanos != null && message.hasOwnProperty("nanos"))
                object.nanos = message.nanos;
            return object;
        };
    
        /**
         * Converts this Duration to JSON.
         * @function toJSON
         * @memberof Duration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Duration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return Duration;
    })();
    
    $root.WritingSession = (function() {
    
        /**
         * Properties of a WritingSession.
         * @exports IWritingSession
         * @interface IWritingSession
         * @property {ITimestamp|null} [start] WritingSession start
         * @property {IDuration|null} [duration] WritingSession duration
         */
    
        /**
         * Constructs a new WritingSession.
         * @exports WritingSession
         * @classdesc Represents a WritingSession.
         * @implements IWritingSession
         * @constructor
         * @param {IWritingSession=} [properties] Properties to set
         */
        function WritingSession(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * WritingSession start.
         * @member {ITimestamp|null|undefined} start
         * @memberof WritingSession
         * @instance
         */
        WritingSession.prototype.start = null;
    
        /**
         * WritingSession duration.
         * @member {IDuration|null|undefined} duration
         * @memberof WritingSession
         * @instance
         */
        WritingSession.prototype.duration = null;
    
        /**
         * Creates a new WritingSession instance using the specified properties.
         * @function create
         * @memberof WritingSession
         * @static
         * @param {IWritingSession=} [properties] Properties to set
         * @returns {WritingSession} WritingSession instance
         */
        WritingSession.create = function create(properties) {
            return new WritingSession(properties);
        };
    
        /**
         * Encodes the specified WritingSession message. Does not implicitly {@link WritingSession.verify|verify} messages.
         * @function encode
         * @memberof WritingSession
         * @static
         * @param {IWritingSession} message WritingSession message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WritingSession.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                $root.Timestamp.encode(message.start, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                $root.Duration.encode(message.duration, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };
    
        /**
         * Encodes the specified WritingSession message, length delimited. Does not implicitly {@link WritingSession.verify|verify} messages.
         * @function encodeDelimited
         * @memberof WritingSession
         * @static
         * @param {IWritingSession} message WritingSession message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WritingSession.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a WritingSession message from the specified reader or buffer.
         * @function decode
         * @memberof WritingSession
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {WritingSession} WritingSession
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WritingSession.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WritingSession();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.start = $root.Timestamp.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.duration = $root.Duration.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a WritingSession message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof WritingSession
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {WritingSession} WritingSession
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WritingSession.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a WritingSession message.
         * @function verify
         * @memberof WritingSession
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WritingSession.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.start != null && message.hasOwnProperty("start")) {
                var error = $root.Timestamp.verify(message.start);
                if (error)
                    return "start." + error;
            }
            if (message.duration != null && message.hasOwnProperty("duration")) {
                var error = $root.Duration.verify(message.duration);
                if (error)
                    return "duration." + error;
            }
            return null;
        };
    
        /**
         * Creates a WritingSession message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof WritingSession
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {WritingSession} WritingSession
         */
        WritingSession.fromObject = function fromObject(object) {
            if (object instanceof $root.WritingSession)
                return object;
            var message = new $root.WritingSession();
            if (object.start != null) {
                if (typeof object.start !== "object")
                    throw TypeError(".WritingSession.start: object expected");
                message.start = $root.Timestamp.fromObject(object.start);
            }
            if (object.duration != null) {
                if (typeof object.duration !== "object")
                    throw TypeError(".WritingSession.duration: object expected");
                message.duration = $root.Duration.fromObject(object.duration);
            }
            return message;
        };
    
        /**
         * Creates a plain object from a WritingSession message. Also converts values to other types if specified.
         * @function toObject
         * @memberof WritingSession
         * @static
         * @param {WritingSession} message WritingSession
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WritingSession.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.start = null;
                object.duration = null;
            }
            if (message.start != null && message.hasOwnProperty("start"))
                object.start = $root.Timestamp.toObject(message.start, options);
            if (message.duration != null && message.hasOwnProperty("duration"))
                object.duration = $root.Duration.toObject(message.duration, options);
            return object;
        };
    
        /**
         * Converts this WritingSession to JSON.
         * @function toJSON
         * @memberof WritingSession
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WritingSession.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return WritingSession;
    })();
    
    $root.WritingWorkspaceMetadata = (function() {
    
        /**
         * Properties of a WritingWorkspaceMetadata.
         * @exports IWritingWorkspaceMetadata
         * @interface IWritingWorkspaceMetadata
         * @property {Array.<IWritingSession>|null} [sessionHistory] WritingWorkspaceMetadata sessionHistory
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
            this.sessionHistory = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * WritingWorkspaceMetadata sessionHistory.
         * @member {Array.<IWritingSession>} sessionHistory
         * @memberof WritingWorkspaceMetadata
         * @instance
         */
        WritingWorkspaceMetadata.prototype.sessionHistory = $util.emptyArray;
    
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
            if (message.sessionHistory != null && message.sessionHistory.length)
                for (var i = 0; i < message.sessionHistory.length; ++i)
                    $root.WritingSession.encode(message.sessionHistory[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                case 2:
                    if (!(message.sessionHistory && message.sessionHistory.length))
                        message.sessionHistory = [];
                    message.sessionHistory.push($root.WritingSession.decode(reader, reader.uint32()));
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
            if (message.sessionHistory != null && message.hasOwnProperty("sessionHistory")) {
                if (!Array.isArray(message.sessionHistory))
                    return "sessionHistory: array expected";
                for (var i = 0; i < message.sessionHistory.length; ++i) {
                    var error = $root.WritingSession.verify(message.sessionHistory[i]);
                    if (error)
                        return "sessionHistory." + error;
                }
            }
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
            if (object.sessionHistory) {
                if (!Array.isArray(object.sessionHistory))
                    throw TypeError(".WritingWorkspaceMetadata.sessionHistory: array expected");
                message.sessionHistory = [];
                for (var i = 0; i < object.sessionHistory.length; ++i) {
                    if (typeof object.sessionHistory[i] !== "object")
                        throw TypeError(".WritingWorkspaceMetadata.sessionHistory: object expected");
                    message.sessionHistory[i] = $root.WritingSession.fromObject(object.sessionHistory[i]);
                }
            }
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
            if (options.arrays || options.defaults)
                object.sessionHistory = [];
            if (message.sessionHistory && message.sessionHistory.length) {
                object.sessionHistory = [];
                for (var j = 0; j < message.sessionHistory.length; ++j)
                    object.sessionHistory[j] = $root.WritingSession.toObject(message.sessionHistory[j], options);
            }
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

    return $root;
});
