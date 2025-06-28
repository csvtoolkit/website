# API Reference

Complete reference for all FastCSV C library functions, structures, and configuration options.

## Core Components

| Component | Header File | Description |
|-----------|-------------|-------------|
| **Arena** | `arena.h` | Custom memory allocator |
| **CSV Parser** | `csv_parser.h` | Low-level parsing engine with RFC 4180 support |
| **CSV Reader** | `csv_reader.h` | High-level reading interface with navigation |
| **CSV Writer** | `csv_writer.h` | CSV output generation with encoding support |
| **CSV Config** | `csv_config.h` | Configuration management with encoding options |
| **CSV Utils** | `csv_utils.h` | Utility functions |

## Arena Management

The arena allocator provides efficient, memory-safe allocation with zero leaks.

### Arena Structure

```c
typedef struct {
    char *buffer;
    size_t size;
    size_t used;
    size_t alignment;
} Arena;
```

### Arena Functions

#### arena_create()

```c
ArenaResult arena_create(Arena *arena, size_t size);
```

Creates a new arena with the specified size.

**Parameters:**
- `arena` - Pointer to Arena structure to initialize
- `size` - Size of the arena buffer in bytes

**Returns:** `ArenaResult` indicating success or error

**Example:**
```c
Arena arena;
ArenaResult result = arena_create(&arena, 4096);
if (result != ARENA_OK) {
    fprintf(stderr, "Failed to create arena: %d\n", result);
    return 1;
}
```

#### arena_alloc()

```c
ArenaResult arena_alloc(Arena *arena, size_t size, void **ptr);
```

Allocates memory from the arena.

**Parameters:**
- `arena` - Pointer to Arena structure
- `size` - Size to allocate in bytes
- `ptr` - Pointer to store allocated memory address

**Returns:** `ArenaResult` indicating success or error

**Example:**
```c
void *memory;
ArenaResult result = arena_alloc(&arena, 1024, &memory);
if (result == ARENA_OK) {
    // Use allocated memory
}
```

#### arena_strdup()

```c
ArenaResult arena_strdup(Arena *arena, const char *str, char **result);
```

Duplicates a string in the arena.

**Parameters:**
- `arena` - Pointer to Arena structure
- `str` - String to duplicate
- `result` - Pointer to store duplicated string

**Returns:** `ArenaResult` indicating success or error

**Example:**
```c
char *duplicated;
ArenaResult result = arena_strdup(&arena, "Hello World", &duplicated);
if (result == ARENA_OK) {
    printf("Duplicated: %s\n", duplicated);
}
```

#### arena_reset()

```c
void arena_reset(Arena *arena);
```

Resets the arena for reuse without deallocating the buffer.

**Parameters:**
- `arena` - Pointer to Arena structure

**Example:**
```c
// Reuse arena for multiple operations
arena_reset(&arena);
```

#### arena_destroy()

```c
void arena_destroy(Arena *arena);
```

Destroys the arena and frees all allocated memory.

**Parameters:**
- `arena` - Pointer to Arena structure

**Example:**
```c
arena_destroy(&arena);
```

## CSV Configuration

The CSV configuration system manages parsing and writing options.

### CSVConfig Structure

```c
typedef struct {
    char *path;
    char delimiter;
    char enclosure;
    char escape;
    bool has_header;
    bool trim_fields;
    bool skip_empty_lines;
    bool strict_mode;
    bool preserve_quotes;
    CSVEncoding encoding;
    bool write_bom;
    long offset;
    long limit;
} CSVConfig;
```

### Configuration Functions

#### csv_config_create()

```c
CSVConfig* csv_config_create(Arena *arena);
```

Creates a new CSV configuration with default values.

**Parameters:**
- `arena` - Pointer to Arena structure for allocation

**Returns:** Pointer to CSVConfig structure or NULL on failure

**Example:**
```c
CSVConfig *config = csv_config_create(&arena);
if (!config) {
    fprintf(stderr, "Failed to create config\n");
    return 1;
}
```

#### csv_config_set_path()

```c
void csv_config_set_path(CSVConfig *config, const char *path);
```

Sets the file path for CSV operations.

**Parameters:**
- `config` - Pointer to CSVConfig structure
- `path` - File path string

**Example:**
```c
csv_config_set_path(config, "data.csv");
```

#### csv_config_set_delimiter()

```c
void csv_config_set_delimiter(CSVConfig *config, char delimiter);
```

Sets the field delimiter character.

**Parameters:**
- `config` - Pointer to CSVConfig structure
- `delimiter` - Delimiter character (default: ',')

**Example:**
```c
csv_config_set_delimiter(config, ';');  // Semicolon-separated
```

#### csv_config_set_encoding()

```c
void csv_config_set_encoding(CSVConfig *config, CSVEncoding encoding);
```

Sets the file encoding.

**Parameters:**
- `config` - Pointer to CSVConfig structure
- `encoding` - Encoding type (CSV_ENCODING_UTF8, CSV_ENCODING_UTF16LE, etc.)

**Example:**
```c
csv_config_set_encoding(config, CSV_ENCODING_UTF8);
```

## CSV Reader

The CSV reader provides high-level reading interface with navigation support.

### CSVReader Structure

```c
typedef struct {
    FILE *file;
    CSVConfig *config;
    char *buffer;
    size_t buffer_size;
    long position;
    bool has_headers;
    char **headers;
    int header_count;
} CSVReader;
```

### Reader Functions

#### csv_reader_init_with_config()

```c
CSVReader* csv_reader_init_with_config(Arena *arena, CSVConfig *config);
```

Initializes a CSV reader with configuration.

**Parameters:**
- `arena` - Pointer to Arena structure
- `config` - Pointer to CSVConfig structure

**Returns:** Pointer to CSVReader structure or NULL on failure

**Example:**
```c
CSVReader *reader = csv_reader_init_with_config(&arena, config);
if (!reader) {
    fprintf(stderr, "Failed to initialize reader\n");
    return 1;
}
```

#### csv_reader_has_next()

```c
bool csv_reader_has_next(CSVReader *reader);
```

Checks if there are more records to read.

**Parameters:**
- `reader` - Pointer to CSVReader structure

**Returns:** `true` if more records available, `false` otherwise

**Example:**
```c
while (csv_reader_has_next(reader)) {
    CSVRecord *record = csv_reader_next_record(reader);
    // Process record
}
```

#### csv_reader_next_record()

```c
CSVRecord* csv_reader_next_record(CSVReader *reader);
```

Reads the next record from the CSV file.

**Parameters:**
- `reader` - Pointer to CSVReader structure

**Returns:** Pointer to CSVRecord structure or NULL on end of file

**Example:**
```c
CSVRecord *record = csv_reader_next_record(reader);
if (record) {
    for (int i = 0; i < record->field_count; i++) {
        printf("Field %d: %s\n", i, record->fields[i]);
    }
}
```

#### csv_reader_get_headers()

```c
char** csv_reader_get_headers(CSVReader *reader, int *count);
```

Gets the header row from the CSV file.

**Parameters:**
- `reader` - Pointer to CSVReader structure
- `count` - Pointer to store header count

**Returns:** Array of header strings

**Example:**
```c
int header_count;
char **headers = csv_reader_get_headers(reader, &header_count);
for (int i = 0; i < header_count; i++) {
    printf("Header %d: %s\n", i, headers[i]);
}
```

#### csv_reader_get_position()

```c
long csv_reader_get_position(CSVReader *reader);
```

Gets the current position in the file.

**Parameters:**
- `reader` - Pointer to CSVReader structure

**Returns:** Current position (record number)

**Example:**
```c
long position = csv_reader_get_position(reader);
printf("Current position: %ld\n", position);
```

#### csv_reader_seek()

```c
int csv_reader_seek(CSVReader *reader, long position);
```

Seeks to a specific position in the file.

**Parameters:**
- `reader` - Pointer to CSVReader structure
- `position` - Target position

**Returns:** 0 on success, -1 on failure

**Example:**
```c
if (csv_reader_seek(reader, 1000) == 0) {
    CSVRecord *record = csv_reader_next_record(reader);
    // Process record at position 1000
}
```

#### csv_reader_rewind()

```c
void csv_reader_rewind(CSVReader *reader);
```

Rewinds the reader to the beginning of the file.

**Parameters:**
- `reader` - Pointer to CSVReader structure

**Example:**
```c
csv_reader_rewind(reader);
```

#### csv_reader_free()

```c
void csv_reader_free(CSVReader *reader);
```

Frees the CSV reader and associated resources.

**Parameters:**
- `reader` - Pointer to CSVReader structure

**Example:**
```c
csv_reader_free(reader);
```

## CSV Writer

The CSV writer provides high-performance CSV output generation.

### CSVWriter Structure

```c
typedef struct {
    FILE *file;
    CSVConfig *config;
    char **headers;
    int header_count;
    char *buffer;
    size_t buffer_size;
} CSVWriter;
```

### Writer Functions

#### csv_writer_init()

```c
CSVWriterResult csv_writer_init(CSVWriter **writer, CSVConfig *config, 
                                char **headers, int header_count, Arena *arena);
```

Initializes a CSV writer with configuration and headers.

**Parameters:**
- `writer` - Pointer to store CSVWriter pointer
- `config` - Pointer to CSVConfig structure
- `headers` - Array of header strings
- `header_count` - Number of headers
- `arena` - Pointer to Arena structure

**Returns:** `CSVWriterResult` indicating success or error

**Example:**
```c
CSVWriter *writer;
char *headers[] = {"Name", "Email", "Age"};
CSVWriterResult result = csv_writer_init(&writer, config, headers, 3, &arena);
if (result != CSV_WRITER_OK) {
    fprintf(stderr, "Failed to initialize writer: %d\n", result);
    return 1;
}
```

#### csv_writer_write_record()

```c
void csv_writer_write_record(CSVWriter *writer, char **fields, int field_count);
```

Writes a record to the CSV file.

**Parameters:**
- `writer` - Pointer to CSVWriter structure
- `fields` - Array of field strings
- `field_count` - Number of fields

**Example:**
```c
char *row[] = {"John Doe", "john@example.com", "30"};
csv_writer_write_record(writer, row, 3);
```

#### csv_writer_free()

```c
void csv_writer_free(CSVWriter *writer);
```

Frees the CSV writer and associated resources.

**Parameters:**
- `writer` - Pointer to CSVWriter structure

**Example:**
```c
csv_writer_free(writer);
```

## CSV Parser

The CSV parser provides low-level parsing with RFC 4180 compliance.

### CSVParseResult Structure

```c
typedef struct {
    bool success;
    const char *error;
    int error_line;
    int error_column;
    FieldArray fields;
} CSVParseResult;
```

### Parser Functions

#### csv_parse_line_inplace()

```c
CSVParseResult csv_parse_line_inplace(char *line, Arena *arena, 
                                     CSVConfig *config, int line_number);
```

Parses a CSV line in-place with detailed error information.

**Parameters:**
- `line` - Line to parse (modified in-place)
- `arena` - Pointer to Arena structure
- `config` - Pointer to CSVConfig structure
- `line_number` - Line number for error reporting

**Returns:** `CSVParseResult` with parsing results

**Example:**
```c
char line[] = "John Doe,john@example.com,30";
CSVParseResult result = csv_parse_line_inplace(line, &arena, config, 1);
if (result.success) {
    for (int i = 0; i < result.fields.count; i++) {
        printf("Field %d: %s\n", i, result.fields.fields[i]);
    }
} else {
    printf("Parse error at line %d, column %d: %s\n", 
           result.error_line, result.error_column, result.error);
}
```

## Error Codes

### ArenaResult

```c
typedef enum {
    ARENA_OK = 0,
    ARENA_ERROR_NULL_POINTER,
    ARENA_ERROR_INVALID_SIZE,
    ARENA_ERROR_OUT_OF_MEMORY,
    ARENA_ERROR_ALIGNMENT
} ArenaResult;
```

### CSVWriterResult

```c
typedef enum {
    CSV_WRITER_OK = 0,
    CSV_WRITER_ERROR_NULL_POINTER,
    CSV_WRITER_ERROR_MEMORY_ALLOCATION,
    CSV_WRITER_ERROR_FILE_OPEN,
    CSV_WRITER_ERROR_FILE_WRITE,
    CSV_WRITER_ERROR_INVALID_FIELD_COUNT,
    CSV_WRITER_ERROR_FIELD_NOT_FOUND,
    CSV_WRITER_ERROR_BUFFER_OVERFLOW,
    CSV_WRITER_ERROR_ENCODING
} CSVWriterResult;
```

### CSVEncoding

```c
typedef enum {
    CSV_ENCODING_UTF8,
    CSV_ENCODING_UTF16LE,
    CSV_ENCODING_UTF16BE,
    CSV_ENCODING_UTF32LE,
    CSV_ENCODING_UTF32BE,
    CSV_ENCODING_ASCII,
    CSV_ENCODING_LATIN1
} CSVEncoding;
```

## Configuration Examples

### Custom Delimiters

```c
CSVConfig *config = csv_config_create(&arena);

// Semicolon-separated values
csv_config_set_delimiter(config, ';');

// Tab-separated values
csv_config_set_delimiter(config, '\t');

// Pipe-separated values
csv_config_set_delimiter(config, '|');
```

### Different Encodings

```c
CSVConfig *config = csv_config_create(&arena);

// UTF-8 with BOM
csv_config_set_encoding(config, CSV_ENCODING_UTF8);
csv_config_set_write_bom(config, true);

// UTF-16 Little Endian
csv_config_set_encoding(config, CSV_ENCODING_UTF16LE);
csv_config_set_write_bom(config, true);

// ASCII (no BOM)
csv_config_set_encoding(config, CSV_ENCODING_ASCII);
csv_config_set_write_bom(config, false);
```

### Strict Mode Processing

```c
CSVConfig *config = csv_config_create(&arena);

// Enable strict mode for enhanced validation
csv_config_set_strict_mode(config, true);

// Trim whitespace from fields
csv_config_set_trim_fields(config, true);

// Skip empty lines
csv_config_set_skip_empty_lines(config, true);
```

## Performance Considerations

- Use arena-based allocation for better memory management
- Process records one by one for constant memory usage
- Set appropriate buffer sizes for your use case
- Use correct delimiters to avoid parsing ambiguity
- Enable strict mode for enhanced validation
- Use appropriate encodings for your data

## Version Information

Check the installed version of FastCSV:

```c
#include "csv_common.h"

printf("FastCSV version: %s\n", FASTCSV_VERSION);
```

Get detailed library information:

```c
#include "csv_common.h"

printf("FastCSV build date: %s\n", FASTCSV_BUILD_DATE);
printf("FastCSV git commit: %s\n", FASTCSV_GIT_COMMIT);
```