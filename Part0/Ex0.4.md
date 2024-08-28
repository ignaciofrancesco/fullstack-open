```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: GET
        activate server
        server-->>browser: something
        deactivate server

        Note right of browser: Test note
```
