from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class downloadRequest(_message.Message):
    __slots__ = ("name", "ip", "port")
    NAME_FIELD_NUMBER: _ClassVar[int]
    IP_FIELD_NUMBER: _ClassVar[int]
    PORT_FIELD_NUMBER: _ClassVar[int]
    name: str
    ip: str
    port: str
    def __init__(self, name: _Optional[str] = ..., ip: _Optional[str] = ..., port: _Optional[str] = ...) -> None: ...

class downloadReply(_message.Message):
    __slots__ = ("message", "ip")
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    IP_FIELD_NUMBER: _ClassVar[int]
    message: str
    ip: str
    def __init__(self, message: _Optional[str] = ..., ip: _Optional[str] = ...) -> None: ...
