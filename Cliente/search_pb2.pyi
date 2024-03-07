from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class searchRequest(_message.Message):
    __slots__ = ("name", "ip", "port", "exchange", "key", "que")
    NAME_FIELD_NUMBER: _ClassVar[int]
    IP_FIELD_NUMBER: _ClassVar[int]
    PORT_FIELD_NUMBER: _ClassVar[int]
    EXCHANGE_FIELD_NUMBER: _ClassVar[int]
    KEY_FIELD_NUMBER: _ClassVar[int]
    QUE_FIELD_NUMBER: _ClassVar[int]
    name: str
    ip: str
    port: str
    exchange: str
    key: str
    que: str
    def __init__(self, name: _Optional[str] = ..., ip: _Optional[str] = ..., port: _Optional[str] = ..., exchange: _Optional[str] = ..., key: _Optional[str] = ..., que: _Optional[str] = ...) -> None: ...

class searchReply(_message.Message):
    __slots__ = ("message", "ip", "name")
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    IP_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    message: str
    ip: str
    name: str
    def __init__(self, message: _Optional[str] = ..., ip: _Optional[str] = ..., name: _Optional[str] = ...) -> None: ...
